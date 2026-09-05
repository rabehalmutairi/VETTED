import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, field_validator
from sqlalchemy import insert, select

from api.auth import get_current_user_id
from api.curated_lists import FIELDS, SKILLS, UNIVERSITIES
from api.db import get_engine, profiles
from api.validation import contains_contact_info

router = APIRouter()


class ProfileCreate(BaseModel):
    display_name: str = Field(min_length=1, max_length=100)
    university: str
    field: str
    graduation_year: int = Field(ge=2015, le=2035)
    skills: list[str] = Field(default_factory=list, max_length=20)
    bio: str = Field(default="", max_length=280)

    @field_validator("university")
    @classmethod
    def validate_university(cls, v: str) -> str:
        if v not in UNIVERSITIES:
            raise ValueError("Unknown university")
        return v

    @field_validator("field")
    @classmethod
    def validate_field(cls, v: str) -> str:
        if v not in FIELDS:
            raise ValueError("Unknown field")
        return v

    @field_validator("skills")
    @classmethod
    def validate_skills(cls, v: list[str]) -> list[str]:
        invalid = [s for s in v if s not in SKILLS]
        if invalid:
            raise ValueError(f"Unknown skills: {', '.join(invalid)}")
        return v

    @field_validator("bio")
    @classmethod
    def validate_bio(cls, v: str) -> str:
        if contains_contact_info(v):
            raise ValueError(
                "Bio cannot contain contact information such as emails, "
                "phone numbers, or social handles."
            )
        return v


class ProfileOut(BaseModel):
    id: uuid.UUID
    display_name: str
    university: str
    field: str
    graduation_year: int
    skills: list[str]
    bio: str
    created_at: datetime


@router.get("/api/profiles/me", response_model=ProfileOut)
def get_my_profile(user_id: str = Depends(get_current_user_id)):
    engine = get_engine()
    with engine.connect() as conn:
        row = conn.execute(
            select(profiles).where(profiles.c.id == uuid.UUID(user_id))
        ).mappings().first()

    if row is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return dict(row)


@router.post("/api/profiles", response_model=ProfileOut, status_code=201)
def create_profile(body: ProfileCreate, user_id: str = Depends(get_current_user_id)):
    user_uuid = uuid.UUID(user_id)
    engine = get_engine()
    with engine.begin() as conn:
        existing = conn.execute(
            select(profiles.c.id).where(profiles.c.id == user_uuid)
        ).first()
        if existing is not None:
            raise HTTPException(status_code=409, detail="Profile already exists")

        row = conn.execute(
            insert(profiles)
            .values(id=user_uuid, **body.model_dump())
            .returning(profiles)
        ).mappings().first()

    return dict(row)
