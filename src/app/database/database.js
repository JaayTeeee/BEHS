const express = require("express");
const cors = require("cors"); // Import the cors module
const Database = require("better-sqlite3");

const db = new Database("./database.db");

// Define API endpoint for inserting data
app.post("/api/insertUserdata", (req, res) => {
    const { firstName, lastName, gender, dateBirth, idNumber, phoneNumber, address, city, postcode, state } = req.body;
    const walletAddress = global.id["id"];
  
    try {
      db.exec(`
        CREATE TABLE IF NOT EXISTS userData (
          userid INTEGER PRIMARY KEY,
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

  