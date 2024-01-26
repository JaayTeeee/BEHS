-- SQLite
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
    'ABt7ZBcL6UpRoTDMvKGECKsRfMiMqpMSMqjpgmw6CuZJ', 
    'Hospital', 
    'ABC',  
    '',  
    NULL,  
    '',    
    12344567878, 
    'Jalan Ampang', 
    'Kuala Lumpur', 
    58200, 
    'Kuala Lumpur', 
    'hospital'
);



