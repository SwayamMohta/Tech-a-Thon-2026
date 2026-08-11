from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import init_db
from routes import admin, match, schemes

app = FastAPI(title="Krishi Match backend")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://localhost(:\d+)?",
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(match.router)
app.include_router(schemes.router)
app.include_router(admin.router)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/health")
def health() -> dict:
    return {"ok": True}
