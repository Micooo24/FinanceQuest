import firebase_admin
from firebase_admin import credentials

# Update the path to the correct location of your serviceAccountKey.json file
cred = credentials.Certificate("C:/Users/ACER/Downloads/SIA2-system/gamedev/backend/firebase_backend/serviceAccountKey.json")
firebase_admin.initialize_app(cred)