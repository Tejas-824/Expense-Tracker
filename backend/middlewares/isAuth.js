const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    console.log("Received token:", token); 
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    console.log("Decoded token:", decoded);  

    req.user = decoded.id; 
    next(); 
  } catch (err) {
    console.error("JWT Error:", err.message); 
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = isAuthenticated;
