AI FEATURES IN MY PROJECTS 
1-->> OCR TECHNOLOGY -->> WHICH IS ALLOWS USER TO UPLOAD A IMAGE OF A INVOICE AND IT WILL SCAN AND EXTRACTS THE ONLY DATA WHICH IS STORABLE IN YOUR MONGODB AND MATCHES WITH YOUR SCHEMA 
HOW I MAKE THIS FEATURE -->> I USED THIS METHOD FROM MADE THIS FROM SCRATCH LIKE INSTALLING PYTHON AND THEN INTEGRATE IN MY MERN PROJECTS
STEPS I FOLLOW-->>> 

**Create Separate AI Service
project/
│
├── frontend/
├── backend/
│
└── ai-service/


ai-service/
│
├── uploads/
├── app.py
├── requirements.txt
└── venv/


**Create Python Virtual Environment
Open terminal:
first type  and enter->>
cd ai-service
python3 -m venv venv
then type and enter ->>
source venv/bin/activate

Install Required Packages
pip install flask
pip install pytesseract
pip install pillow

Flask handles the website and the upload button.

Pillow opens and processes the uploaded image.

PyTesseract reads the text out of that image



**Install Tesseract OCR on 
interminal type ->
brew install tesseract
then check ->
tesseract --version




**First Python Server

from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "OCR Service Running"

if __name__ == "__main__":
    app.run(debug=True)

Save above code in app.py
run by typing in terminal-->> python3 app.py 
open this url -->> http://127.0.0.1:5000


**Install One More Package
Type in terminal->>pip install flask-cors. -->> This package is used to estabilish the relation bw react and python 




**First Upload API
Now replace app.py with:

from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return "OCR Service Running"

@app.route("/upload", methods=["POST"])
def upload_file():

    if "image" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["image"]

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    return jsonify({
        "message": "File uploaded successfully",
        "path": filepath
    })

if __name__ == "__main__":
    app.run(debug=True)


**Test Using Postman

Create request:
POST
http://127.0.0.1:5000/upload

Body → form-data

Key:

image

Type:

File

Choose any invoice/bill image.

Click Send.




**Smart Data Extraction
for that we have to import regex by writing -->> import re
and then after we write the diff diff extract function what we want to extraact from the raw data 
we can take help to write that extraction functions 



**Now Linking this feature with the MERN project 
for that we can take help ai but for my project what i do i will write here -->>
First the server of python ai feature change from this -->> http://localhost:5000/upload. -->> to http://localhost:5001/upload bcs at 5000 already backend is running 
second i make a compenent.jsx   for the ai feature which is i want to show on expenses section  for this use gpt/gemini 
third use this component in the expenses code 
fourth in my project i use Addtransection file  how i use ->> 
                                                            The final link in the chain is modifying your existing AddTransaction component (found inside your ../Components/AddTransaction file) so that it listens for the prefilledData prop.







2-->>AI ASSISTANT CHAT BOT 
I USE HUGGING FACE FOR THE LLM MODEL 
SO FIRST INSTAL HUGGINFACE IN YOUR PYTHON FILE USING TERMINAL 
AN THEN ADD IN APP.PY FILE BY WRITING THESE TWO LINES 
-->>from huggingface_hub import InferenceClient
-->>client = InferenceClient()-->> THIS WILL CONNECT YOU TO THE LLM MODEL FOR CHATTING 

NEXT I CONNECT IT WITH MERN PROJECT WITH SIMPLE TWO STEP 
FIRST MAKE A SEPRATE COMPONENTS 
SECOND ADD THIS COMPONENTS IN THE DASBOARD FILE IN THE RESPECTED CURRENT VIEW 


LAST STEP TO CONNECT IT WITH MY DATABASE 
I USE A SIMPLE APPROACHE-->>If users are going to ask questions like "What was my total expense last month?" or "Show me the transactions over $500", you should use Function Calling.
How it works: You define "tools" (JavaScript functions that fetch data from MongoDB). When a user asks a question, the AI determines which function to run and what parameters to pass it. Your Node.js backend runs the query, gets the data, and hands it back to the AI to format into a nice response.

FOR THIS I MADE AN ANOTHER FILE IN BACKEND FOLDER IN ROUTES FOLDER FILE  NAMED AIROUTE WHICH CONTAIND QUIRIES TO MONGODB TO GET DATA

AND THEN MAKING SOME CHANGES IN MY APP.PY FILE 
WHICH ARE -->>
                import requests # <--- ADDED for calling your Node backend
                import json     # <--- ADDED for parsing structured AI actions
                NODE_BACKEND_URL = "http://localhost:8000/api/internal/ai-query"


AND THEN MAKING SOME CHANGES IN MY BACKEND FILE TO ACTIVE THE API OF AIROUTE TO GET RESPONSE OF QUERIES
WHICH ARE -->>
            const aiDataRoute = require('./Routes/AiDataRote');
            app.use(express.json()); 
            app.use(aiDataRoute);

            Without app.use(express.json()), Express treats incoming JSON request blocks as a raw stream rather than translating them automatically into a clean, searchable JavaScript object inside req.body.





