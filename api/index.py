from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.auth import get_current_user_id
from api.profiles import router as profiles_router

app = FastAPI()
app.include_router(profiles_router)

# Only needed for local dev, where the frontend (port 3000) and this API
# (port 8000) are different origins. In production both are served from the
# same Vercel domain, so this has no effect there.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/me")
def me(user_id: str = Depends(get_current_user_id)):
    return {"user_id": user_id}
