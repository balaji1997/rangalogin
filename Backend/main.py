from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.route import router
import os
import uvicorn
app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("REACT_APP_URL")],  # Use an environment variable or specify directly
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your router
app.include_router(router, prefix="/api")

@app.get("/")
def root():
    return {"message": "API is running"}

if __name__ == "__main__":
    
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
