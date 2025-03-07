from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users, characters,stats, blogReviews
import firebase_backend.firebaseconfig
from Admin import UserdataTable
from routes.trackers import router as trackers_router
from routes.minibudget import router as minibudget_router
from routes.minibudget_ai import router as minibudget_ai_router
from routes import ai_analysis
from routes import miniInvesting  
from routes.miniInvest_ai import router as miniInvest_ai_router


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
app.include_router(minibudget_router, prefix="/minibudget")
app.include_router(minibudget_ai_router, prefix="/minibudget_ai")
app.include_router(ai_analysis.router, prefix="/ai")
app.include_router(miniInvesting.router, prefix="/miniInvesting") 
app.include_router(miniInvest_ai_router, prefix="/miniInvesting_ai")
 