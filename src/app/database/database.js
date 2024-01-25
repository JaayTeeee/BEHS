const express = require("express");
const cors = require("cors"); // Import the cors module
const Database = require("better-sqlite3");
const app = express();
app.use(cors());

const db = new Database("./database.db");
global.id = null;

app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your client's origin
    methods: ["GET", "POST"], // Add the methods you need
  })
);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//insert ID 
app.post("/api/insertID", (req, res) => {
  const walletAddress = req.body.walletAddress;

  try {
    console.log("Received address:", walletAddress);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error inserting address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define API endpoint for inserting data
app.post("/api/insertUserdata", (req, res) => {
    const { firstName, lastName, gender, dateBirth, idNumber, phoneNumber, address, city, postcode, state } = req.body;
    const walletAddress = global.id["id"];
  
    try {
      db.exec(`
        CREATE TABLE IF NOT EXISTS userData (
          userid INTEGER PRIMARY KEY AUTOINCREMENT,
          walletAddress TEXT UNIQUE,
          firstName TEXT,
          lastName TEXT,
          gender TEXT,
          dateBirth DATETIME, 
          idNumber INTEGER,
          phoneNumber INTEGER, 
          address TEXT,
          city TEXT,
          postcode INTEGER,
          state TEXT,
        )
      `);
  
      const insertStmt = db.prepare(
        "INSERT INTO userData (walletAddress, firstName, lastName, gender, dateBirth, idNumber, phoneNumber, address, city, postcode, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      );
      insertStmt.run(walletAddress, firstName, lastName, gender, dateBirth, idNumber, phoneNumber, address, city, postcode, state);
  
      console.log("Data inserted successfully:", {
        walletAddress: walletAddress,
        firstName: firstName, 
        lastName: lastName,
        gender: gender,
        dateBirth: dateBirth,
        idNumber: idNumber,
        phoneNumber: phoneNumber,
        address: address,
        city: city,
        postcode: postcode,
        state: state
      });
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

//check ID in main page
app.post("/api/checkID", (req, res) => {
  console.log(req.body);
  const walletAddress = req.body;
  
  try {
    const checkStmt = db.prepare(
      "SELECT firstName, lastName FROM userData WHERE walletAddress = ?"
    );
    const result = checkStmt.get(walletAddress);

    if (result) {
      console.log("User exists with walletAddress:", walletAddress);
      res.status(200).json({
        success: true,
        walletAddress: walletAddress,  // Corrected part
        firstName: result.firstName,   // Include firstName
        lastName: result.lastName      // Include lastName
      });
    } else {
      console.log("User not found with walletAddress:", walletAddress);
      res.status(200).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
