from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users, characters,stats, blogReviews
import firebase_backend.firebaseconfig
from Admin import UserdataTable
from routes.trackers import router as trackers_router

app = FastAPI()


origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,  
    allow_methods=["*"],  
    allow_headers=["*"],  
)


app.include_router(users.router, prefix="/users")
app.include_router(characters.router, prefix="/characters")
app.include_router(stats.router, prefix="/stats")
app.include_router(UserdataTable.router, prefix="/admin")
app.include_router(trackers_router, prefix="/monthly_tracker", tags=["Monthly Tracker"])
app.include_router(blogReviews.router, prefix="/blogReview")
 