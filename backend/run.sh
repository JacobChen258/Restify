#!/bin/bash

./backend/manage.py makemigrations
./backend/manage.py migrate
./backend/manage.py runserver