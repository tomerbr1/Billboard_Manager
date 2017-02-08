REM @echo *** NPM INSTALL / PLEASE MAKE SURE NPM INSTALL FINISHED SUCCESSFULLY ***
REM start cmd /k npm install

REM timeout 25

REM @echo *** Start mongo db server ***
REM start cmd /k mongod.exe --dbpath db

REM timeout 5

REM @echo *** Create mongo db table ***
REM start cmd /k mongo.exe AdsDatabase --eval "db.dropDatabase()"


REM timeout 2
REM start cmd /k node db/mongodb.js

REM @echo *** Start node server ***
REM start cmd /k node server.js

REM timeout 5
REM start chrome.exe "http://localhost:8080"

REM @PAUSE





start mongod.exe
timeout /t 1
start mongo.exe
timeout /t 2
REM start node db/mongodb.js
REM /t 2
start node server.js
timeout /t 3



start chrome \localhost:8080\