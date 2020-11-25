LOAD DATA INFILE '../migration_data/requests.csv'
INTO TABLE `request`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(`eventID`, `hostID`, `guestID`);
