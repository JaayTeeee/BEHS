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
        idNumber INTEGER UNIQUE,
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
  try {
    const query = req.body.query; // Access the query parameter from req.body directly
    const idNumberCheckStmt = db.prepare(
      "SELECT firstName, lastName, userType, gender, dateBirth, idNumber, walletAddress FROM userData WHERE idNumber = ? AND userType = ?"
    );

    const idNumberResult = idNumberCheckStmt.get(query, "user");
    // Check if any records are found based on idNumber
    if (idNumberResult) {
      console.log("Records found matching idNumber query:", query);
      res.status(200).json({ success: true, records: [idNumberResult] }); // Wrap idNumberResult in an array
    } else {
      // If no records found based on idNumber, search by userAddress
      const userAddressCheckStmt = db.prepare(
        "SELECT firstName, lastName, userType, gender, dateBirth, idNumber, walletAddress FROM userData WHERE walletAddress = ? AND userType = ?"
      );

      const userAddressResult = userAddressCheckStmt.get(query, "user");

      if (userAddressResult) {
        console.log("Records found matching userAddress query:", query);
        console.log(userAddressResult);
        res.status(200).json({ success: true, records: [userAddressResult] }); // Wrap userAddressResult in an array
      } else {
        console.log("No records found matching query:", query);
        res.status(200).json({ success: false, message: "No records found" });
      }
    }
  } catch (error) {
    console.error("Error searching records:", error);
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
      "INSERT INTO MedicalRecordData (userAddress, recordDate, firstName, lastName, gender, dateBirth, idNumber, diagnosis, attachment, hospitalAddress) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?)"
    );

    console.log("Values:", {
      userAddress,
      firstName,
      lastName,
      gender,
      dateBirth,
      idNumber,
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

app.post("/api/checkItem", (req, res) => {
  const query = req.body.query;
  try {
    const idNumberCheckStmt = db.prepare(
      "SELECT * FROM medicalRecordData WHERE idNumber = ?"
    );

    const idNumberResult = idNumberCheckStmt.get(query);

    // Check if any records are found based on idNumber
    if (idNumberResult) {
      console.log("Records found matching idNumber query:", query);
      res.status(200).json({ success: true, records: [idNumberResult] }); // Wrap idNumberResult in an array
    } else {
      // If no records found based on idNumber, search by userAddress
      const userAddressCheckStmt = db.prepare(
        "SELECT * FROM medicalRecordData WHERE userAddress = ?"
      );

      const userAddressResult = userAddressCheckStmt.get(query);

      if (userAddressResult) {
        console.log("Records found matching userAddress query:", query);
        res.status(200).json({ success: true, records: [userAddressResult] }); // Wrap userAddressResult in an array
      } else {
        console.log("No records found matching query:", query);
        res.status(200).json({ success: false, message: "No records found" });
      }
    }
  } catch (error) {
    console.error("Error searching records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/requestPermission", (req, res) => {
  const { requestAddress, requestDate, requiredAddress, permissionStatus } =
    req.body;
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS PermissionData (
        permissionID INTEGER PRIMARY KEY AUTOINCREMENT,
        requestAddress TEXT,
        requestDate TEXT,
        requiredAddress TEXT ,
        permissionStatus NUMBER
      )
    `);

    const insertStmt = db.prepare(
      "INSERT INTO PermissionData (requestAddress, requestDate, requiredAddress, permissionStatus) VALUES (?,?, ?, ?)"
    );

    console.log("Values:", {
      requestAddress,
      requestDate,
      requiredAddress,
      permissionStatus,
    });

    insertStmt.run(
      requestAddress,
      requestDate,
      requiredAddress,
      permissionStatus
    );
    console.log("Data inserted successfully:", {
      requestAddress: requestAddress,
      requestDate: requestDate,
      requiredAddress: requiredAddress,
      permissionStatus: permissionStatus,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/checkPermission", (req, res) => {
  const query = req.body.query;
  try {
    const selectStmt = db.prepare(`
      SELECT ud.firstName, ud.lastName, pd.permissionID
      FROM PermissionData pd
      INNER JOIN userData ud ON pd.requestAddress = ud.walletAddress
      WHERE pd.requiredAddress = ? AND pd.permissionStatus = 0
    `);

    const results = selectStmt.all(query); // Use all() to fetch all matching records

    if (results && results.length > 0) {
      console.log("Records found matching requiredAddress query:", query);
      res.status(200).json({ success: true, records: results });
    } else {
      console.log("No records found matching query:", query);
      res.status(200).json({ success: false, message: "No records found" });
    }
  } catch (error) {
    console.error("Error searching records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/grantPermission", (req, res) => {
  const requiredAddress = req.body.requiredAddress;
  const permissionID = req.body.permissionID;
  try {
    const updateStmt = db.prepare(
      "UPDATE PermissionData SET permissionStatus = 1 WHERE requiredAddress = ? AND permissionID = ?"
    );

    updateStmt.run(requiredAddress, permissionID);
    console.log("Data updated successfully:", {
      requiredAddress,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/rejectPermission", (req, res) => {
  const requiredAddress = req.body.requiredAddress;
  const permissionID = req.body.permissionID;
  try {
    const updateStmt = db.prepare(
      "UPDATE PermissionData SET permissionStatus = -1 WHERE requiredAddress = ? AND permissionID = ?"
    );

    updateStmt.run(requiredAddress, permissionID);
    console.log("Data updated successfully:", {
      requiredAddress,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//require = user, request = hospital
app.post("/api/showPermission", (req, res) => {
  const query = req.body.query;
  try {
    const selectStmtRequest = db.prepare(`
      SELECT ud.firstName, ud.lastName, pd.permissionStatus, pd.requestDate, pd.permissionID, pd.requestAddress
      FROM PermissionData pd
      INNER JOIN userData ud ON pd.requiredAddress = ud.walletAddress
      WHERE pd.requiredAddress = ?
    `);

    const resultRequest = selectStmtRequest.all(query); // Use all method instead of get

    if (resultRequest && resultRequest.length > 0) { // Check if resultRequest is not empty
      console.log("Records found matching requiredAddress query:", query);
      // Store the permission data in an object
      const responseData = {
        success: true,
        records: resultRequest, // Store all relevant records
      };

      // Proceed to retrieve hospital name for each record
      for (const record of resultRequest) {
        const selectStmtHospital = db.prepare(`
          SELECT ud.firstName, ud.lastName
          FROM PermissionData pd
          INNER JOIN userData ud ON pd.requestAddress = ud.walletAddress
          WHERE pd.requestAddress = ?
        `);

        const resultHospital = selectStmtHospital.get(record.requestAddress);

        if (resultHospital) {
          console.log("Hospital name found for requestAddress:", record.requestAddress);
          record.hospitalName = resultHospital;
        } else {
          console.log("No hospital name found for requestAddress:", record.requestAddress);
          record.hospitalName = { firstName: "Unknown", lastName: "Unknown" };
        }
      }

      // Send the response with all the data
      res.status(200).json(responseData);
    } else {
      console.log("No records found matching query:", query);
      res.status(200).json({ success: false, message: "No records found" });
    }
  } catch (error) {
    console.error("Error searching records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


