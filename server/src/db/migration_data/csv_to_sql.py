#! /bin/python3

import csv
import sys
import glob
import os


def generate_sql(filename, tablename):
    with open(filename, "r") as csv_file:
        reader = csv.reader(csv_file)
        cols = next(reader)
        collist = ', '.join(map(lambda x: "`" + x + "`", cols))
        sql = f"INSERT INTO `{tablename}` ({collist}) VALUES\n"
        for row in reader:
            vals = ', '.join(map(lambda x: '"' + x + '"', row))
            sql += f"({vals}),\n"
        return sql[:-2] + ";"


def convert_sql():
    csvs = glob.glob('*.csv')
    path = os.path.join(os.getcwd(), 'sql')
    try:
        os.mkdir(path)
    except FileExistsError:
        pass
    for csv_file in csvs:
        tablename = csv_file.split(".")[0]
        sql = generate_sql(csv_file, tablename)
        filename = f"{path}/{tablename}.sql"
        with open(filename, "w") as f:
            f.write(sql)


if __name__ == "__main__":
  convert_sql()