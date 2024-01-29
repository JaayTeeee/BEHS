-- SQLite
CREATE TABLE IF NOT EXISTS medicalRecordData (
    recordID INTEGER PRIMARY KEY AUTOINCREMENT,
    recordDate TEXT,
    userAddress TEXT,
    firstName TEXT,
    lastName TEXT,
    gender TEXT,
    dateBirth TEXT, 
    idNumber TEXT,
    diagnosis TEXT,
    attachment BLOB,
    hospitalAddress TEXT
);

DROP TABLE medicalRecordData;

CREATE TABLE IF NOT EXISTS researchData (
    recordID INTEGER PRIMARY KEY AUTOINCREMENT,
    projectName TEXT
    currentSpots TEXT,
    lastName TEXT,
    availableSpots INTEGER,
    deadline TEXT
);

INSERT INTO medicalRecordData (userAddress, recordDate, firstName, lastName, gender, dateBirth, idNumber, diagnosis, attachment, hospitalAddress) 
VALUES (
    'FKBZ4PQzvqx7mw5pj8nN9HLcjZ1fknjQwf6YuGGxF7ty',
    '2024-01-27',
    'weihi',
    'ching',
    'female',
    '2024-01-25',
    '1234567890',
    'test',
    '',
    'ABt7ZBcL6UpRoTDMvKGECKsRfMiMqpMSMqjpgmw6CuZJ'
);


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
);

INSERT INTO userData (walletAddress, firstName, lastName, gender, dateBirth, idNumber, phoneNumber, address, city, postcode, state, userType) 
VALUES (
    'CJjZcCKPCzwdN8MSUBMritQBaPRZoMZ72nzYFt2KE98w', 
    'Hospital', 
    'ABC',  
    '',  
    NULL,  
    1232345645,    
    12344567878, 
    'Jalan Ampang', 
    'Kuala Lumpur', 
    58200, 
    'Kuala Lumpur', 
    'hospital'
);