========================================================================
                     ALTIS AI - AUTHENTICATION SYSTEM
                     Documentation & Architecture Guide
========================================================================
Created: May 2026
Purpose: An foolproof blueprint explaining exactly how the frontend (React + Tailwind) 
         and backend (Node.js + Express + MongoDB) handle traditional and 
         Google OAuth2 Login flows.

------------------------------------------------------------------------
1. TERMINAL COMMANDS (Step-by-Step Setup)
------------------------------------------------------------------------

### BACKEND SETUP
Navigate to your backend project folder in your terminal and run these commands:

1. Install essential core packages:
   $ npm install express mongoose cors cookie-parser bcrypt

2. Install Google Authentication & Environment Configuration packages:
   $ npm install google-auth-library dotenv

3. Start your backend server:
   $ node backend.js


### FRONTEND SETUP
Navigate to your frontend project folder in your terminal and run these commands:

1. Install Axios for making API calls to your backend:
   $ npm install axios

2. Start your frontend development server:
   $ npm run dev


------------------------------------------------------------------------
2. THE SECRET CONFIGURATION (.env File)
------------------------------------------------------------------------
Create a file named exactly `.env` in the root of your BACKEND folder.
It securely stores variables so they are not hardcoded publicly into the code.

PORT=8000
GOOGLE_CLIENT_ID=your_actual_client_id_from_google_console
GOOGLE_CLIENT_SECRET=your_actual_client_secret_from_google_console
FRONTEND_URL=http://localhost:5173


------------------------------------------------------------------------
3. UNDERSTANDING THE EXPORTS & IMPORTS (Who does what?)
------------------------------------------------------------------------

### BACKEND PACKAGES (backend.js)
* require('dotenv').config()
  -> Work: Reads your .env file at the very start so the server can access 
     keys via process.env.VARIABLE_NAME.
* express
  -> Work: The web server framework. It handles incoming requests (GET/POST) 
     and sends back responses.
* mongoose
  -> Work: Connects your Node.js code to your MongoDB database and defines 
     how your user data is structured (Schema).
* cors (Cross-Origin Resource Sharing)
  -> Work: A security guard. By default, browsers block websites on port 5173 
     from talking to servers on port 8000. CORS explicitly permits this conversation.
* cookie-parser
  -> Work: Allows your backend server to read cookies sent by the user's browser, 
     and easily write new cookies onto the user's browser.
* bcrypt
  -> Work: A password hashing library. It securely scrambles passwords before 
     saving them into the database so that text passwords are never stored exposed.
* OAuth2Client (from google-auth-library)
  -> Work: Google's official utility package. It securely manages token exchanges 
     and decodes profile information directly from Google's servers.


### FRONTEND PACKAGES (Auth.jsx)
* useState (from 'react')
  -> Work: Manages temporary data on the screen (like text typed into input inputs, 
     or tracking whether the active tab is 'login' or 'register').
* axios
  -> Work: The delivery agent. It packages your form inputs and shoots them 
     to your backend endpoints (/api/login, /api/register) over HTTP.


------------------------------------------------------------------------
4. DATABASE MODEL MODIFICATION
------------------------------------------------------------------------
To let Google users log in, we updated your MongoDB userSchema:
1. password: Changed { required: false }. This is CRITICAL because users 
   who click "Sign In with Google" do not have a traditional local password.
2. googleId: Added as an optional string field to uniquely record Google's internal 
   identification tag for that specific user profile.


------------------------------------------------------------------------
5. API WORKFLOWS & LOGICAL TRAFFIC (How data travels)
------------------------------------------------------------------------

### A. TRADITIONAL REGISTRATION FLOW
1. User fills out Name, Email, Password, and clicks "Create Account".
2. Frontend runs validation rules (e.g., checks if the password is at least 8 
   characters, has an uppercase, lowercase, number, and special character).
3. Frontend uses axios.post to pass data to /api/register.
4. Backend grabs the payload, searches MongoDB for an existing email match.
   - If user exists: Returns a "User already exists!" error status.
   - If user is new: Scrambles the password using bcrypt.hash(), creates a 
     new database document, and saves it.

### B. TRADITIONAL LOGIN FLOW
1. User enters Email + Password, hits "Login".
2. Frontend posts credentials via Axios to /api/login.
3. Backend fetches the user profile by email. If not found, blocks entry.
4. Backend compares the input password against the stored scrambled hash using bcrypt.compare().
5. If valid, backend drops a cookie named userSession containing the user's raw database ID (user._id) into the browser.

### C. GOOGLE OAUTH2 FLOW (The Modern Glassy Button Setup)
This is a 2-step loop that bypasses AJAX/Axios entirely:

[STEP 1: The Request]
1. User clicks your stylized glass "Sign in with Google" button.
2. The frontend bypasses axios and changes the whole browser location directly:
   window.location.href = 'http://localhost:8000/api/auth/google';
3. Backend receives this call, uses googleClient.generateAuthUrl(), and triggers 
   a direct redirect sending the user straight to Google's official profile selection window.

[STEP 2: The Callback Handshake]
4. The user selects their Google Account. Google verifies them securely on their servers.
5. Google bounces the user's browser back to your backend callback URL:
   http://localhost:8000/api/auth/google/callback?code=XXXXXX
6. Your backend takes that short-lived verification code, sends it back to Google's servers 
   behind the scenes, and exchanges it for the user's actual profile details (Email, Name, ID).
7. Backend searches your MongoDB User records for that email:
   - If the user is new: Backend registers a new profile instantly with their Google Name and Email.
   - If the user already exists: Backend safely updates or confirms their profile.
8. Backend assigns the exact same login cookie (userSession) with the user's Database ID.
9. Finally, the backend redirects the browser windows seamlessly back onto your frontend dashboard:
   res.redirect('http://localhost:5173');

========================================================================