LOAD DATA INFILE '../migration_data/events.csv'
INTO TABLE `event`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(`title`, `description`, `startTime`, `endTime`, `maxGuestCount`, `eventStatus`, `locationID`, `hostID`, `guestCount`) ;

