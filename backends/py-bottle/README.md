# book-wishlist

- virtualenv -p `which python3` env
- \. env/bin/activate
- pip install bottle
- pip install pymongo
- python main.py

### OR if env already installed -

- \. env/bin/activate

### to install mongodb in docker image - 
- docker pull mongo
- docker run -it -p 27017:27017 --hostname mongodb --name mongodb -d mongo
- docker exec -it mongodb bash
- mongod --bind_ip_all

### To Start backend API, do one of:

- python main.py in_memory
- python main.py mongo


