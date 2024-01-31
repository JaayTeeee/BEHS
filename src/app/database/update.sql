-- SQLite

DROP TABLE researchData

CREATE TABLE IF NOT EXISTS researchData (
    researchID INTEGER PRIMARY KEY AUTOINCREMENT,
    researchDate TEXT,
    projectName TEXT,
    userJoined TEXT,
    slotsAvailable INTEGER,
    lastParticipateDate TEXT,
    details TEXT
);


INSERT INTO researchData (researchDate, projectName, userJoined, slotsAvailable, lastParticipateDate, details) 
VALUES (
    '1/31/2024', 
    'Research Regarding the human skeletal function and traumatic experience',
    '3wr9XMLD8BLcQGH4XLx3GgVfzxwFS2JJhWYpbFioqyx6',
    2,
    '2/2/2024',
    'This research will conduct a clinical placement regarding the human skeletal function and traumatic experience. 
    To participate in this research, the criteria is as below:

    - Aged range from 18 to 60 years old.
    - Has traumatic experience.
    - Willing to commit up to 1 months (only weekends)
    '

);


INSERT INTO researchData (researchDate, projectName, userJoined, slotsAvailable, lastParticipateDate, details) 
VALUES (
    '1/31/2024', 
    'Research regarding vaccination and the human endocrine system',
    '',
    5,
    '2/4/2024',
    'This research will conduct a clinical placement regarding vaccination and the human endocrine system. 
    To participate in this research, the criteria is as below:

    - Aged range from 18 to 60 years old.
    - Has vaccination experience.
    - Willing to commit up to 1 months (only weekends)
    '

);