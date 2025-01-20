from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from azure.cosmos import CosmosClient, exceptions

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
# Get values from environment variables
COSMOS_ENDPOINT = os.getenv("COSMOS_ENDPOINT")
COSMOS_KEY = os.getenv("COSMOS_KEY")
DATABASE_NAME = os.getenv("DATABASE_NAME")
CONTAINER_NAME = os.getenv("CONTAINER_NAME")

router = APIRouter()

# Initialize Cosmos client and container
client = CosmosClient(COSMOS_ENDPOINT, COSMOS_KEY)
database = client.get_database_client(DATABASE_NAME)
container = database.get_container_client(CONTAINER_NAME)

class LoginRequest(BaseModel):
    email: str
    password: str

class ForgetPasswordRequest(BaseModel):
    email: str






# Load environment variables from .env file
load_dotenv()
# Get values from environment variables
COSMOS_ENDPOINT = os.getenv("COSMOS_ENDPOINT")
COSMOS_KEY = os.getenv("COSMOS_KEY")
DATABASE_NAME = os.getenv("DATABASE_NAME")
CONTAINER_NAME = os.getenv("CONTAINER_NAME")

router = APIRouter()

# Initialize Cosmos client and container
client = CosmosClient(COSMOS_ENDPOINT, COSMOS_KEY)
database = client.get_database_client(DATABASE_NAME)
container = database.get_container_client(CONTAINER_NAME)

class LoginRequest(BaseModel):
    email: str
    password: str

class ForgetPasswordRequest(BaseModel):
    email: str

class SignUpRequest(BaseModel):
    email: str
    username: str
    password: str

@router.post("/signup")
def sign_up(request: SignUpRequest):
    try:
        # Query Cosmos DB to check if the email already exists
        query = f"SELECT * FROM {CONTAINER_NAME} c WHERE c.email = @email"
        parameters = [{"name": "@email", "value": request.email}]
        items = list(container.query_items(query=query, parameters=parameters, enable_cross_partition_query=True))
        
        if items:
            raise HTTPException(status_code=400, detail="Email already registered")

        # Create new user object
        new_user = {
            "id": request.email,  # Using email as the unique identifier
            "email": request.email,
            "username": request.username,
            "password": request.password,
        }

        # Insert the new user into Cosmos DB
        container.create_item(body=new_user)
        
        return {"message": "User created successfully", "user": {"email": new_user["email"], "username": new_user["username"]}}

    except exceptions.CosmosHttpResponseError as e:
        raise HTTPException(status_code=500, detail=f"Cosmos DB error: {e.message}")    


@router.post("/login")
def login(request: LoginRequest):
    try:
        # Query Cosmos DB for user credentials
        query = f"SELECT * FROM {CONTAINER_NAME} c WHERE c.email = @email"
        parameters = [{"name": "@email", "value": request.email}]
        items = list(container.query_items(query=query, parameters=parameters, enable_cross_partition_query=True))
        
        if not items:
            raise HTTPException(status_code=404, detail="User not found")
        
        user = items[0]  # Assume unique emails
        if user.get("password") == request.password:
            return {"message": "Login successful", "user": {"email": user["email"], "name": user.get("name", "Unknown")}}
        
        raise HTTPException(status_code=401, detail="Invalid credentials")
    except exceptions.CosmosHttpResponseError as e:
        raise HTTPException(status_code=500, detail=f"Cosmos DB error: {e.message}")

@router.post("/forgetpassword")
def forget_password(request: ForgetPasswordRequest):
    try:
        # Query Cosmos DB for user email
        query = f"SELECT * FROM {CONTAINER_NAME} c WHERE c.email = @email"
        parameters = [{"name": "@email", "value": request.email}]
        items = list(container.query_items(query=query, parameters=parameters, enable_cross_partition_query=True))
        
        if not items:
            raise HTTPException(status_code=404, detail="Email not found")
        
        # Simulate sending a password reset link (actual implementation depends on your email service)
        return {"message": "Password reset link sent to the registered email"}
    except exceptions.CosmosHttpResponseError as e:
        raise HTTPException(status_code=500, detail=f"Cosmos DB error: {e.message}")
    




