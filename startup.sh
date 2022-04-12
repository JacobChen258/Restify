#!/bin/bash

npm install
npm install --prefix ./frontend
virtualenv -p `which python3.10` venv
source venv/bin/activate
pip install -r requirements.txt
<<<<<<< HEAD
npm install --prefix ./frontend
=======
# cd frontend
# ./startup.sh
>>>>>>> de435915b4a58670c5d7534b9c1f17a309f2d56f
