# from xmlrpc import client
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import os
# import re
# import pytesseract
# from PIL import Image
# import requests # <--- ADDED for calling your Node backend
# import json     # <--- ADDED for parsing structured AI actions

# from openai import OpenAI
# from huggingface_hub import InferenceClient

# from dotenv import load_dotenv
# load_dotenv()

# app = Flask(__name__)
# CORS(app, supports_credentials=True)

# UPLOAD_FOLDER = "uploads"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# NODE_BACKEND_URL = "http://localhost:8000/api/internal/ai-query"

# # -----------------------------
# # AI Extraction Function
# # -----------------------------
# def extract_data(text):
#     data = {
#         "billReferenceNo": None,
#         "vendorDescription": None,
#         "amount": None,
#         "gstRate": None
#     }

#     lines = [l.strip() for l in text.split("\n") if l.strip()]
#     if lines:
#         data["vendorDescription"] = lines[0]

#     bill_match = re.search(r"Invoice\s*No\W+([A-Z0-9\/\-]+)", text, re.IGNORECASE)
#     if bill_match:
#         data["billReferenceNo"] = bill_match.group(1)

#     gst_match = re.search(r"(5|12|18|28)\s*(?:\.00)?\s*%", text)
#     if gst_match:
#         data["gstRate"] = int(gst_match.group(1))

#     flat_text = " ".join(text.split())
    
#     amount_match = re.findall(r"[\d,]+\.\d{2}", text)
#     if amount_match:
#         data["amount"] = float(amount_match[-1].replace(",", ""))
#         return data

# # -----------------------------
# # Home Route
# # -----------------------------
# @app.route("/")
# def home():
#     return "OCR Service Running"

# # -----------------------------
# # Upload Route
# # -----------------------------
# @app.route("/upload", methods=["POST"])
# def upload_file():
#     if "image" not in request.files:
#         return jsonify({"error": "No image uploaded"}), 400

#     file = request.files["image"]
#     if file.filename == "":
#         return jsonify({"error": "No file selected"}), 400

#     filepath = os.path.join(UPLOAD_FOLDER, file.filename)
#     file.save(filepath)

#     image = Image.open(filepath)
#     extracted_text = pytesseract.image_to_string(image)
#     structured_data = extract_data(extracted_text)

#     return jsonify({
#         "rawText": extracted_text,
#         "data": structured_data
#     })

# # -----------------------------
# # AI Chat Bot Route with DB Access & Prediction Support
# # -----------------------------
# client = InferenceClient()

# SYSTEM_PROMPT = """You are Altis AI, a smart financial assistant inside a business ERP.
# Your primary focus is helping users manage and predict expenses, invoices, stock, GST, taxes, and accounting.

# You have access to the user's database tables: invoices, expenses, bills, inventory.
# When a user asks a question, decide if you need live database information or metrics to answer it accurately.

# You MUST respond strictly in one of these two JSON formats. Do not include any markdown backticks, conversational introductions, or text before/after the JSON string.

# 1. If you NEED database information or records to answer or make financial predictions (Use "all" if the query requires checking multiple areas like Net Profit, Cash Flow, or complete overviews):
# {"action": "fetch_data", "collection": "invoices|expenses|bills|inventory|all", "status": "Paid|Pending|Overdue|Low Stock|null"}

# 2. If you HAVE the data or do not need a database lookup to reply:
# {"action": "final_answer", "text": "WRITE YOUR DETAILED RESPONSE HERE. Read the Database Data Context provided, use its fields to count totals, list names, calculate profit/loss metrics, or project future trends, and construct a conversational response paragraph inside this string parameter value."}

# GUIDELINES FOR NON-FINANCIAL QUERIES:
# If a query is completely unrelated to business, answer directly using "final_answer" but briefly pivot back to your financial capabilities.
# """


# # app.py ke andar /chat route ko completely isse replace karein:

# @app.route("/chat", methods=["POST"])
# def chat():
#     # Explicitly check and inject local regex module to prevent any async reload NameErrors
#     import re as runtime_re
#     import json as runtime_json
    
#     data = request.get_json() or {}
#     question = data.get("question")
#     user_id = data.get("userId", "YOUR_TEST_USER_ID")

#     if not question:
#         return jsonify({"error": "Missing 'question' in request body"}), 400

#     try:
#         # Step 1: Initial query to DeepSeek
#         completion = client.chat.completions.create(
#             model="deepseek-ai/DeepSeek-V4-Pro:novita", 
#             messages=[
#                 {"role": "system", "content": SYSTEM_PROMPT},
#                 {"role": "user", "content": question}
#             ],
#             max_tokens=300
#         )

#         ai_raw_output = completion.choices[0].message.content.strip()
        
#         print("--- DEEPSEEK FIRST OUTPUT ---")
#         print(ai_raw_output)
#         print("-----------------------------")

#         # Use the local runtime_re instance to guarantee it is defined
#         json_match = runtime_re.search(r"\{.*\}", ai_raw_output, runtime_re.DOTALL)
        
#         ai_command = {}
#         if json_match:
#             try:
#                 ai_command = runtime_json.loads(json_match.group(0))
#             except Exception:
#                 ai_command = {"action": "final_answer", "text": ai_raw_output}
#         else:
#             ai_command = {"action": "final_answer", "text": ai_raw_output}

#         # Step 2: Database Fetch Condition
#         if ai_command.get("action") == "fetch_data":
#             collection = ai_command.get("collection")
#             status = ai_command.get("status")

#             db_data = {}
#             collections_to_fetch = ['invoices', 'expenses', 'bills'] if collection == 'all' else [collection]

#             for col in collections_to_fetch:
#                 try:
#                     node_response = requests.post(NODE_BACKEND_URL, json={
#                         "collection": col,
#                         "status": status if status != "null" else None,
#                         "userId": user_id
#                     }, timeout=5)
                    
#                     if node_response.status_code == 200:
#                         db_data[col] = node_response.json().get('data', [])
#                 except Exception as e:
#                     print(f"Error fetching from Node for {col}: {str(e)}")

#             # Step 3: Clear data compilation pass downstream to DeepSeek
#             final_completion = client.chat.completions.create(
#                 model="deepseek-ai/DeepSeek-V4-Pro:novita",
#                 messages=[
#                     {"role": "system", "content": "You are Altis AI. Analyze the provided database context data and answer the user's question directly in a conversational, human-friendly way with calculations or predictions. Do NOT respond in JSON format now."},
#                     {"role": "user", "content": f"User Question: {question}\n\nDatabase Context Data:\n{runtime_json.dumps(db_data)}"}
#                 ],
#                 max_tokens=500
#             )

#             final_text_output = final_completion.choices[0].message.content.strip()
#             return jsonify({"answer": final_text_output})

#         else:
#             return jsonify({"answer": ai_command.get("text", ai_raw_output)})

#     except Exception as e:
#         print(f"Global catch error: {str(e)}")
#         return jsonify({"error": f"AI Engine Processing Anomaly: {str(e)}"}), 500

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5001, debug=True)








from xmlrpc import client
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re
import json
import requests
import pytesseract
from PIL import Image
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Pointing directly to your Express Node server port 8000
NODE_BACKEND_URL = "http://localhost:8000/api/internal/ai-query"

client = InferenceClient()

SYSTEM_PROMPT = """You are Altis AI, a smart financial assistant inside a business ERP.
Your primary focus is helping users manage and predict expenses, invoices, stock, GST, taxes, and accounting.

You have access to the user's database tables: invoices, expenses, bills, inventory.
When a user asks a question, decide if you need live database information or metrics to answer it accurately.

You MUST respond strictly in one of these two JSON formats. Do not include any markdown backticks, conversational introductions, or text before/after the JSON string.

1. If you NEED database information or records to answer or make financial predictions (Use "all" if the query requires checking multiple areas like Net Profit, Cash Flow, or complete overviews):
{"action": "fetch_data", "collection": "invoices|expenses|bills|inventory|all", "status": "Paid|Pending|Overdue|Low Stock|null"}

2. If you HAVE the data or do not need a database lookup to reply:
{"action": "final_answer", "text": "WRITE YOUR DETAILED RESPONSE HERE. Read the Database Data Context provided, use its fields to count totals, list names, calculate profit/loss metrics, or project future trends, and construct a conversational response paragraph inside this string parameter value."}

GUIDELINES FOR NON-FINANCIAL QUERIES:
If a query is completely unrelated to business, answer directly using "final_answer" but briefly pivot back to your financial capabilities.
"""

# -----------------------------
# AI Extraction Function (OCR)
# -----------------------------
def extract_data(text):
    data = {
        "billReferenceNo": None,
        "vendorDescription": None,
        "amount": None,
        "gstRate": None
    }

    lines = [l.strip() for l in text.split("\n") if l.strip()]
    if lines:
        data["vendorDescription"] = lines[0]

    bill_match = re.search(r"Invoice\s*No\W+([A-Z0-9\/\-]+)", text, re.IGNORECASE)
    if bill_match:
        data["billReferenceNo"] = bill_match.group(1)

    gst_match = re.search(r"(5|12|18|28)\s*(?:\.00)?\s*%", text)
    if gst_match:
        data["gstRate"] = int(gst_match.group(1))

    amount_match = re.findall(r"[\d,]+\.\d{2}", text)
    if amount_match:
        data["amount"] = float(amount_match[-1].replace(",", ""))
    return data

# -----------------------------
# Home Route
# -----------------------------
@app.route("/")
def home():
    return "OCR Service Running"

# -----------------------------
# Upload Route
# -----------------------------
@app.route("/upload", methods=["POST"])
def upload_file():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    image = Image.open(filepath)
    extracted_text = pytesseract.image_to_string(image)
    structured_data = extract_data(extracted_text)

    return jsonify({
        "rawText": extracted_text,
        "data": structured_data
    })

# -----------------------------
# Secure AI Chat Bot Route
# -----------------------------
@app.route("/chat", methods=["POST"])
def chat():
    # Forced local namespace resolution to prevent runtime scoping NameErrors
    import re as local_re
    import json as local_json
    import requests as local_requests

    data = request.get_json() or {}
    question = data.get("question")
    user_id = data.get("userId", "YOUR_TEST_USER_ID")

    if not question:
        return jsonify({"error": "Missing 'question' in request body"}), 400

    try:
        # Step 1: Query DeepSeek for systemic routing intention
        completion = client.chat.completions.create(
            model="deepseek-ai/DeepSeek-V4-Pro:novita", 
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": question}
            ],
            max_tokens=300
        )

        ai_raw_output = completion.choices[0].message.content.strip()
        
        print("--- DEEPSEEK FIRST OUTPUT ---")
        print(ai_raw_output)
        print("-----------------------------")

        # Extract structured block securely using regex matches
        json_match = local_re.search(r"\{.*\}", ai_raw_output, local_re.DOTALL)
        
        ai_command = {}
        if json_match:
            try:
                ai_command = local_json.loads(json_match.group(0))
            except Exception:
                ai_command = {"action": "final_answer", "text": ai_raw_output}
        else:
            ai_command = {"action": "final_answer", "text": ai_raw_output}

        # Step 2: Database evaluation router
        if ai_command.get("action") == "fetch_data":
            collection = ai_command.get("collection")
            status = ai_command.get("status")

            db_data = {}
            collections_to_fetch = ['invoices', 'expenses', 'bills'] if collection == 'all' else [collection]

            for col in collections_to_fetch:
                try:
                    node_response = local_requests.post(NODE_BACKEND_URL, json={
                        "collection": col,
                        "status": status if status != "null" else None,
                        "userId": user_id
                    }, timeout=5)
                    
                    if node_response.status_code == 200:
                        db_data[col] = node_response.json().get('data', [])
                except Exception as e:
                    print(f"Error fetching from Node for {col}: {str(e)}")

            # Step 3: Text synthesis pass for math calculations and predictions
            final_completion = client.chat.completions.create(
                model="deepseek-ai/DeepSeek-V4-Pro:novita",
                messages=[
                    {"role": "system", "content": "You are Altis AI. Analyze the provided database context data and answer the user's question directly in a conversational, human-friendly way with calculations or predictions. Do NOT respond in JSON format now."},
                    {"role": "user", "content": f"User Question: {question}\n\nDatabase Context Data:\n{local_json.dumps(db_data)}"}
                ],
                max_tokens=500
            )

            final_text_output = final_completion.choices[0].message.content.strip()
            return jsonify({"answer": final_text_output})

        else:
            return jsonify({"answer": ai_command.get("text", ai_raw_output)})

    except Exception as e:
        print(f"Global catch error: {str(e)}")
        return jsonify({"error": f"AI Engine Processing Anomaly: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)