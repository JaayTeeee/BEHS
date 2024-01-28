const express = require("express");
const cors = require("cors"); // Import the cors module
const bodyParser = require("body-parser");
const Database = require("better-sqlite3");
const app = express();
const db = new Database("./database.db");
global.id = null;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your client's origin
    methods: ["GET", "POST"], // Add the methods you need
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Define API endpoint for inserting data
app.post("/api/insertUserdata", (req, res) => {
  const {
    walletAddress,
    firstName,
    lastName,
    gender,
    idNumber,
    phoneNumber,
    address,
    city,
    postcode,
    state,
  } = req.body;
  const dateOfBirth = new Date(req.body.dateBirth);
  const formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0];
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS userData (
        userid INTEGER PRIMARY KEY AUTOINCREMENT,
        walletAddress TEXT UNIQUE,
        firstName TEXT,
        lastName TEXT,
        gender TEXT,
        dateBirth TEXT, 
        idNumber INTEGER,
        phoneNumber INTEGER, 
        address TEXT,
        city TEXT,
        postcode INTEGER,
        state TEXT,
        userType TEXT
      )
    `);

    const insertStmt = db.prepare(
      "INSERT INTO userData (walletAddress, firstName, lastName, gender, dateBirth, idNumber, phoneNumber, address, city, postcode, state, userType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    insertStmt.run(
      walletAddress,
      firstName,
      lastName,
      gender,
      formattedDateOfBirth,
      idNumber,
      phoneNumber,
      address,
      city,
      postcode,
      state,
      "user"
    );

    console.log("Data inserted successfully:", {
      walletAddress: walletAddress,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dateBirth: formattedDateOfBirth,
      idNumber: idNumber,
      phoneNumber: phoneNumber,
      address: address,
      city: city,
      postcode: postcode,
      state: state,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//check ID in main page
app.post("/api/checkID", (req, res) => {
  const walletAddress = req.body.walletAddress;

  try {
    const checkStmt = db.prepare(
      "SELECT firstName, lastName, userType FROM userData WHERE walletAddress = ?"
    );
    const result = checkStmt.get(walletAddress);

    // Ensure that result is not null before accessing properties
    if (result) {
      console.log("User exists with walletAddress:", walletAddress);
      res.status(200).json({
        success: true,
        walletAddress: walletAddress,
        firstName: result.firstName,
        lastName: result.lastName,
        userType: result.userType,
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

app.post("/api/checkUserData", (req, res) => {
  const walletAddress = req.body.walletAddress;

  try {
    const checkStmt = db.prepare(
      "SELECT firstName, lastName, userType, gender, dateBirth FROM userData WHERE walletAddress = ?"
    );
    const result = checkStmt.get(walletAddress);

    // Ensure that result is not null before accessing properties
    if (result) {
      console.log("User exists with walletAddress:", walletAddress);
      res.status(200).json({
        success: true,
        walletAddress: walletAddress,
        firstName: result.firstName,
        lastName: result.lastName,
        gender: result.gender,
        dateBirth: result.dateBirth,
        userType: result.userType,
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

// Define API endpoint for inserting medical record data
app.post("/api/insertMedicalRecord", (req, res) => {
  const {
    userAddress,
    firstName,
    lastName,
    gender,
    dateBirth,
    idNumber,
    diagnosis,
    attachment,
    hospitalAddress,
  } = req.body;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Note: January is 0, so we add 1 to get the correct month
  const day = currentDate.getDate();

  // Format the date as needed
  const recordDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS MedicalRecordData (
        recordID INTEGER PRIMARY KEY AUTOINCREMENT,
        recordDate TEXT,
        userAddress TEXT UNIQUE,
        firstName TEXT,
        lastName TEXT,
        gender TEXT,
        dateBirth TEXT, 
        idNumber TEXT,
        diagnosis TEXT,
        attachment BLOB,
        hospitalAddress TEXT
      )
    `);

    const insertStmt = db.prepare(
      "INSERT INTO MedicalRecordData (userAddress, recordDate, firstName, lastName, gender, dateBirth, idNumber, diagnosis, attachment, hospitalAddress) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)"
    );

    console.log("Values:", {
      userAddress,
      firstName,
      lastName,
      gender,
      dateBirth,
      diagnosis,
      attachment,
      hospitalAddress,
    });

    insertStmt.run(
      userAddress,
      recordDate,
      firstName,
      lastName,
      gender,
      dateBirth,
      idNumber,
      diagnosis,
      attachment,
      hospitalAddress
    );
    console.log("Data inserted successfully:", {
      userAddress: userAddress,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dateBirth: dateBirth,
      diagnosis: diagnosis,
      attachment: attachment,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define API endpoint for checking medical record data
app.post("/api/checkMedicalRecord", (req, res) => {
  const walletAddress = req.body.userAddress;
  try {
    const checkStmt = db.prepare(
      "SELECT * FROM medicalRecordData WHERE userAddress = ?"
    );
    const result = checkStmt.get(walletAddress);

    // Ensure that result is not null before accessing properties
    if (result) {
      console.log("User exists with walletAddress:", walletAddress);
      res.status(200).json({
        success: true,
        userAddress: walletAddress,
        firstName: result.firstName,
        lastName: result.lastName,
        userType: result.userType,
        recordDate: result.recordDate,
        recordID: result.recordID,
        hospitalAddress: result.hospitalAddress,
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


// Define API endpoint for checking item for search
app.post("/api/checkItem", (req, res) => {
  const query = req.body.query;
  try {
    const checkStmt = db.prepare(
      "SELECT * FROM medicalRecordData WHERE " +
      "idNumber LIKE ? OR " +
      "userAddress LIKE ?"
    );
    const result = checkStmt.all(
      `${query}`,
      `${query}`
    );

    // Ensure that result is not empty before responding
    if (result.length > 0) {
      console.log("Records found matching query:", query);
      res.status(200).json({ success: true, records: result });
    } else {
      console.log("No records found matching query:", query);
      res.status(200).json({ success: false, message: "No records found" });
    }
  } catch (error) {
    console.error("Error searching records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
