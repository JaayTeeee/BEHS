-- SQLite
CREATE TABLE IF NOT EXISTS medicalRecordData (
    medicalRecordID INTEGER PRIMARY KEY AUTOINCREMENT,
    walletAddress TEXT
    firstName TEXT,
    lastName TEXT,
    availableSpots INTEGER,
    deadline TEXT
);

INSERT INTO researchData (projectName, currentSpots, availableSpots, deadline) 
VALUES (
    'An introductory research regarding human skeletal compartments and the physical movement',
    4,
    9,
    '2024-8-31'
    
);



