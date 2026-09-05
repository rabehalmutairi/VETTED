import re

_EMAIL_RE = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+")
_PHONE_RE = re.compile(r"(?:\+?\d[\d\-\s()]{6,}\d)")
_HANDLE_RE = re.compile(r"@[A-Za-z0-9_]{2,}")
_SOCIAL_DOMAIN_RE = re.compile(
    r"(wa\.me|t\.me|instagram\.com|twitter\.com|x\.com|snapchat\.com|"
    r"tiktok\.com|facebook\.com|linkedin\.com)",
    re.IGNORECASE,
)


def contains_contact_info(text: str) -> bool:
    return bool(
        _EMAIL_RE.search(text)
        or _PHONE_RE.search(text)
        or _HANDLE_RE.search(text)
        or _SOCIAL_DOMAIN_RE.search(text)
    )
