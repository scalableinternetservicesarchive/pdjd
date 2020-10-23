LOAD DATA INFILE '../migration_data/locations.csv'
INTO TABLE `location`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(`buildingID`, `room`);