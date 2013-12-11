# myproject
### DOBKS

https://help.github.com/articles/generating-ssh-keys
https://help.github.com/articles/set-up-git#password-caching
http://git-scm.com/book/pt-br/Git-Essencial-Trabalhando-com-Remotos
http://stackoverflow.com/questions/9343189/did-you-run-git-update-server-info-error-on-a-github-repository
http://www.suggeelson.com/themes/supr/
http://www.script-tutorials.com/demos/129/index.html
https://npmjs.org/package/waterline
http://underscorejs.org/#keys

windows resizer
https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh

GEra short url
https://github.com/dylang/shortid

Start sails
casa
node.exe ../../node_modules/sails/bin/sails lift
node.exe ../../sails lift

mongo
start server
mongod --dbpath C:/mongodb/data/db

write script in mongo
mongo 127.0.0.1/sails-dobanks C:/nodejs/node_modules/sails/bin/projetos/dobanks/scripts/mongodb/db.place.INS.UP.js
mongo 127.0.0.1/sails-dobanks C:/nodejs/node_modules/sails/bin/projetos/dobanks/scripts/mongodb/db.user.CRUD.js
mongo 127.0.0.1/sails-dobanks C:/nodejs/node_modules/sails/bin/projetos/dobanks/scripts/mongodb/db.weapons.CRUD.js

mongo 127.0.0.1/sails-dobanks C:/nodejs/projetos/dobanks/scripts/mongodb/db.vehicle.INS.UP.js
mongo 127.0.0.1/sails-dobanks C:/nodejs/projetos/dobanks/scripts/mongodb/db.place.INS.UP.js
mongo 127.0.0.1/sails-dobanks C:/nodejs/projetos/dobanks/scripts/mongodb/db.user.CRUD.js
mongo 127.0.0.1/sails-dobanks C:/nodejs/projetos/dobanks/scripts/mongodb/db.weapons.CRUD.js

db.place.find().forEach(printjson)

UPDATE COMUM PARA TODOS
db.user.update({provider:"google"},{ $inc: {transportation: 1}},{multi:true});
db.user.update(<where>,{ $inc: <set>},{multi:<all>});

UPDATE SE NAO TIVER CRIA (http://docs.mongodb.org/manual/reference/operator/update/push/#up._S_push)
db.user.update({provider:"google"},{ $push: {vehicles: { $each:  [1,2]} } },{multi:true,upsert:true});

REMOVE CAMPOS DE UM COLLECTION 
db.user.update({provider:"google"},{ $unset : {vehicles: ""}},{multi:true});

MANY TO MANY
http://blog.markstarkman.com/blog/2011/09/15/mongodb-many-to-many-relationship-data-modeling/

SQL-to-Mongo
http://rickosborne.org/download/SQL-to-MongoDB.pdf

MAP REDUCE TWO TABLES
http://blog.knoldus.com/2013/02/03/joins-now-possible-in-mongodb/
http://stackoverflow.com/questions/17860382/how-can-i-group-an-array-of-json-objects-by-month

performace node
http://zgadzaj.com/benchmarking-nodejs-basic-performance-tests-against-apache-php

wget
wget -c -r -P C:/fileswget http://www.
wget -p -k -r -P C:/fileswget http://www.sug
linux
wget -c -r -P /mnt/projetos_vbox/ http://www.

%windir%\system32\cmd.exe /K mongo.exe

note temp:
remove user all

db.runCommand({ mapreduce: "vehicle", map: function() { emit(1,{recs: 1}); },reduce: function(key,values){ var ret = {recs:0}; for(var i=0; i < values.length;i++){ ret.recs += values[i].recs; } return ret; }, out:'r1' });

db.runCommand({ mapreduce: "vehicle", map: function() { emit({ ref: this.ref}, {vlalu: this.mkmperhour, recs: 1}); },reduce: function(key,values){ var ret = {refsum:0,msum:0,recs:0}; for(var i=0; i < values.length;i++){ ret.msum += values[i].vlalu; ret.recs += values[i].recs; ret.refsum += values[i].ref; } return ret; }, out:'r1' });