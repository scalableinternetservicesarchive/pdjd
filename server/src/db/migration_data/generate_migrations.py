#! /bin/python3

import json
import csv
from random import shuffle, seed
import random
from faker.providers.person.en import Provider
import sys
from datetime import datetime, timedelta

first_names = list(set(Provider.first_names))

seed(4321)
shuffle(first_names)


def generate_users(num):
    with open("users.csv", 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(["email", "userType", "password",
                         "name", "bio", "phoneNumber"])
        writer.writerow(["jbruin@ucla.edu", "ADMIN", "password",
                         "Joe Bruin", "Joe Bruin's bio", "123456789"])
        for i in range(num - 1):
            name = first_names[i]
            email = name.lower() + "@ucla.edu"
            bio = name + "'s bio"
            writer.writerow(
                [email, "USER", "password", name, bio, "123456789"])


def generate_events(num_events, num_users):
    events = {}
    with open("events.csv", 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(["title", "description", "startTime", "endTime",
                         "maxGuestCount", "eventStatus", "locationID", "hostID", "guestCount"])
        writer.writerow(["CS188", "Scalable Internet Services", "2020-10-19 08:00:00",
                         "2020-10-19 10:00:00", 100, "OPEN", 1, 1, 3])
        time = datetime.now()
        events[1] = ["CS188", "Scalable Internet Services", "2020-10-19 08:00:00",
                     "2020-10-19 10:00:00", 100, "OPEN", 1, 1, 3]

        for i in range(2, num_events + 1):
            title = "Event#" + str(i)
            description = "Event#" + str(i) + "'s description"
            time_str = time.strftime("%Y-%m-%d %H:00:00")
            time = time + timedelta(hours=1)
            time_str2 = time.strftime("%Y-%m-%d %H:00:00")
            maxGuestCount = random.randint(5, 20)
            locationID = random.randint(1, 400)
            hostID = random.randint(1, num_users)
            events[i] = [title, description, time_str, time_str2,
                         maxGuestCount, "OPEN", locationID, hostID, 1]
            writer.writerow(
                [title, description, time_str, time_str2, maxGuestCount, "OPEN", locationID, hostID, 1])

    return events


def generate_requests(num, num_users, events):
    request_count = 0
    with open("requests.csv", 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(["eventID", "hostID", "guestID"])

        for i in range(1, len(events)+1):
            hostID = events[i][7]
            for j in range(1, random.randint(1, 50)):
                if j == hostID:
                    continue
                writer.writerow([i, hostID, j])
                request_count += 1
                if request_count == num:
                    break
            if request_count == num:
                break


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(
            "USAGE: generate_migrations.py [Number of users] [Number of events] [Number of requests]")
        exit(1)
    if sys.argv[3] > sys.argv[1]:
        print("3 > 1")
        exit(2)
    num_users = int(sys.argv[1])
    num_events = int(sys.argv[2])
    num_requests = int(sys.argv[3])
    generate_users(num_users)
    events = generate_events(num_events, num_users)
    print(events[1])
    generate_requests(num_requests, num_users, events)
