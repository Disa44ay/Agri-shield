// verifies Firebase ID token and attaches req.firebaseUser { email, uid, name }
const admin = require("firebase-admin");
const { fail } = require("../helpers/responseHelper");
const fs = require("fs");
const path = require("path");

let initialized = false;

function initFirebaseFromEnv() {
  if (initialized) return;

  const saPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  const saString = process.env.FIREBASE_SERVICE_ACCOUNT;

  let serviceAccount = null;

  if (saPath && fs.existsSync(path.resolve(saPath))) {
    serviceAccount = require(path.resolve(saPath));
  } else if (saString) {
    try {
      serviceAccount = JSON.parse(saString);
    } catch (err) {
      console.warn("FIREBASE_SERVICE_ACCOUNT env not valid JSON");
    }
  }

  if (!serviceAccount) {
    console.warn(
      "Firebase service account not provided. initFirebase skipped."
    );
    initialized = false;
    return;
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  initialized = true;
  console.log("Firebase initialized");
}

/*
  Updated Logic:
  - If Firebase not initialized → allow request to continue
  - If no Authorization header → allow request to continue
  - If token exists → verify normally
*/
async function verifyFirebaseToken(req, res, next) {
  try {
    // If Firebase is not initialized, don't block requests
    if (!initialized) {
      req.firebaseUser = null;
      return next();
    }

    const header = req.headers.authorization || "";
    const token = header.split(" ")[1];

    // No token → allow request (development mode)
    if (!token) {
      req.firebaseUser = null;
      return next();
    }

    // Verify token normally
    const decoded = await admin.auth().verifyIdToken(token);

    req.firebaseUser = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || (decoded.email ? decoded.email.split("@")[0] : ""),
    };

    return next();
  } catch (err) {
    console.error("Firebase verify error:", err?.message || err);
    // Token invalid → allow request but without firebaseUser
    req.firebaseUser = null;
    return next();
  }
}

module.exports = { initFirebaseFromEnv, verifyFirebaseToken, admin };
