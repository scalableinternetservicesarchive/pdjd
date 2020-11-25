LOAD DATA INFILE '../migration_data/users.csv'
INTO TABLE `user`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(`email`, `userType`, `password`, `name`, `bio`, `phoneNumber`);

