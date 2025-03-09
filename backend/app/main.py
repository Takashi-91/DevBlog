from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .config.database import engine

app = FastAPI(
    title="DevBlog API",
    description="Backend API for DevBlog application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    try:
        # Test database connection
        with engine.connect() as connection:
            connection.execute("SELECT 1")
        return {
            "status": "ok",
            "message": "API is running",
            "database": "connected"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database connection failed: {str(e)}"
        ) 