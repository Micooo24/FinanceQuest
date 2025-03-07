import firebase_admin
from firebase_admin import credentials

# Update the path to the correct location of your serviceAccountKey.json file

#UPDATE NYO TONG PATH NA TO SA LOCATION NG SERVICE ACCOUNT KEY NYO
cred = credentials.Certificate("D:/AWESOME BLOSSOM/Acads/3rdYear/2nd Sem/FinancialQuest/FinanceQuest/backend/firebase_backend/serviceAccountKey.json")
firebase_admin.initialize_app(cred)