from fastapi import Depends, FastAPI

from api.auth import get_current_user_id

app = FastAPI()


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/me")
def me(user_id: str = Depends(get_current_user_id)):
    return {"user_id": user_id}
