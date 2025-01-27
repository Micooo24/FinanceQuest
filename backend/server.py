from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users, characters

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # React frontend origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Origins allowed
    allow_credentials=True,  # Allow cookies/credentials
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Register the routers
app.include_router(users.router, prefix="/users")
app.include_router(characters.router, prefix="/characters")
