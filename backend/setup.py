from setuptools import setup, find_packages

setup(
    name="devblog",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "fastapi==0.95.0",
        "uvicorn==0.21.1",
        "sqlalchemy==2.0.27",
        "pydantic==1.10.7",
        "python-dotenv==1.0.1",
        "alembic==1.13.1",
        "python-jose==3.3.0",
        "passlib==1.7.4",
        "python-multipart==0.0.9",
        "bcrypt==4.1.2",
        "email-validator==2.1.0.post1"
    ],
) 