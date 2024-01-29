-- SQLite

INSERT INTO userData (walletAddress, firstName, lastName, gender, dateBirth, idNumber, phoneNumber, address, city, postcode, state, userType) 
VALUES (
    'FsaZvMVpwsutWSsKUyM2i5NjaiJcifJykjXQVftNZMdh', 
    'Hospital', 
    'ABC',  
    '',  
    NULL,  
    1232345645,    
    12344567878, 
    'Jalan AMPANG', 
    'Kuala Lumpur', 
    58200, 
    'Kuala Lumpur', 
    'hospital'
);

DELETE FROM userData 
WHERE walletAddress = "FsaZvMVpwsutWSsKUyM2i5NjaiJcifJykjXQVftNZMdh"