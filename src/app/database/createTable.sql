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

DROP TABLE PermissionData;

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
    '2024-01-30',
    'JIYI',
    'NG',
    'female',
    '2024-01-25',
    '1234567890',
    'test',
    '',
    'ABt7ZBcL6UpRoTDMvKGECKsRfMiMqpMSMqjpgmw6CuZJ'
);

UPDATE PermissionData SET permissionStatus = 0 WHERE requiredAddress = 'FKBZ4PQzvqx7mw5pj8nN9HLcjZ1fknjQwf6YuGGxF7ty' AND permissionID = 6;

CREATE TABLE IF NOT EXISTS PermissionData (
        permissionID INTEGER PRIMARY KEY AUTOINCREMENT,
        recordID INTEGER,
        requestAddress TEXT,
        requestDate TEXT,
        requiredAddress TEXT ,
        permissionStatus NUMBER
      );

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
);

INSERT INTO userData (walletAddress, firstName, lastName, gender, dateBirth, idNumber, phoneNumber, address, city, postcode, state, userType) 
VALUES (
    'JBTjhb9akhL1NHfieMytHD1tXisiFVv4iUT8hxB24jR9', 
    'Hospital', 
    'UowoU',  
    '',  
    NULL,  
    123234623,    
    64578236453, 
    'Jalan Ampang', 
    'Kuala Lumpur', 
    58200, 
    'Kuala Lumpur', 
    'hospital'
);


CREATE TABLE IF NOT EXISTS researchData (
    researchID INTEGER PRIMARY KEY AUTOINCREMENT,
    researchDate TEXT,
    projectName TEXT,
    userJoined TEXT,
    slotsAvailable INTEGER,
    lastParticipateDate TEXT,
    details TEXT
);

