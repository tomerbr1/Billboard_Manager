start mongod.exe --dbpath db
timeout /t 1
start mongo.exe AdsDatabase --eval "db.dropDatabase()"
timeout /t 2
start node db/mongodb.js
timeout /t 2
start node server.js
timeout /t 3



start chrome \localhost:8080\