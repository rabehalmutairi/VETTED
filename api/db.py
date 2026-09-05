import os

from dotenv import load_dotenv
from sqlalchemy import (
    CheckConstraint,
    Column,
    Date,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    MetaData,
    String,
    Table,
    Text,
    create_engine,
    func,
    text,
)
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.pool import NullPool

load_dotenv()

metadata = MetaData()

opportunities = Table(
    "opportunities",
    metadata,
    Column("id", UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")),
    Column("slug", String, nullable=False, unique=True),
    Column("title", String, nullable=False),
    Column("organizer", String, nullable=False),
    Column("type", String, nullable=False),
    Column("tags", ARRAY(Text), nullable=False, server_default=text("'{}'")),
    Column("deadline", Date, nullable=False),
    Column("apply_url", Text, nullable=False),
    Column("description", Text, nullable=False),
    Column("last_verified_at", Date, nullable=False),
    Column("created_at", DateTime(timezone=True), nullable=False, server_default=func.now()),
)

Index("ix_opportunities_tags", opportunities.c.tags, postgresql_using="gin")

# Stub for Supabase's own auth.users table: not managed by our migrations,
# just needed so SQLAlchemy can resolve the foreign key below.
auth_users = Table(
    "users",
    metadata,
    Column("id", UUID(as_uuid=True), primary_key=True),
    schema="auth",
)

profiles = Table(
    "profiles",
    metadata,
    Column(
        "id",
        UUID(as_uuid=True),
        ForeignKey("auth.users.id", ondelete="CASCADE"),
        primary_key=True,
    ),
    Column("display_name", String, nullable=False),
    Column("university", String, nullable=False),
    Column("field", String, nullable=False),
    Column("graduation_year", Integer, nullable=False),
    Column("skills", ARRAY(Text), nullable=False, server_default=text("'{}'")),
    Column("bio", Text, nullable=False, server_default=""),
    Column("created_at", DateTime(timezone=True), nullable=False, server_default=func.now()),
    CheckConstraint(
        "graduation_year BETWEEN 2015 AND 2035", name="ck_profiles_graduation_year_range"
    ),
    CheckConstraint("char_length(bio) <= 280", name="ck_profiles_bio_length"),
)

Index("ix_profiles_skills", profiles.c.skills, postgresql_using="gin")


def get_database_url() -> str:
    url = os.environ["DATABASE_URL"]
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+psycopg://", 1)
    return url


def get_engine():
    return create_engine(get_database_url(), poolclass=NullPool)
