#!/bin/bash

npm install
virtualenv -p `which python3.10` venv
source venv/bin/activate
pip install -r requirements.txt
npm install --prefix ./frontend