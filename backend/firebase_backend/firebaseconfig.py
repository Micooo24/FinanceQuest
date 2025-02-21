import firebase_admin
from firebase_admin import credentials

# Update the path to the correct location of your serviceAccountKey.json file
cred = credentials.Certificate("C:/Users/ACER/Downloads/SIA2-system/checkpoint 3 main/gamedev/backend/firebase_backend/serviceAccountkey.json")
firebase_admin.initialize_app(cred)