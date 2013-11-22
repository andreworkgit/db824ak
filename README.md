# myproject
### DOBKS

https://help.github.com/articles/generating-ssh-keys
https://help.github.com/articles/set-up-git#password-caching
http://git-scm.com/book/pt-br/Git-Essencial-Trabalhando-com-Remotos
http://stackoverflow.com/questions/9343189/did-you-run-git-update-server-info-error-on-a-github-repository
http://www.suggeelson.com/themes/supr/

windows resizer
https://chrome.google.com/webstore/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh

casa
node.exe ../../node_modules/sails/bin/sails lift

mongo
start server
mongod --dbpath C:/mongodb/data/db

write script in mongo
mongo 127.0.0.1/sails-dobanks C:/nodejs/node_modules/sails/bin/projetos/dobanks/scripts/mongodb
mongo 127.0.0.1/sails-dobanks C:/nodejs/projetos/dobanks/scripts/mongodb/place_updateAndInsert.js

db.place.find().forEach(printjson)

UPDATE COMUM PARA TODOS
db.user.update({provider:"google"},{ $inc: {transportation: 1}},{multi:true});
db.user.update(<where>,{ $inc: <set>},{multi:<all>});

UPDATE SE NAO TIVER CRIA (http://docs.mongodb.org/manual/reference/operator/update/push/#up._S_push)
db.user.update({provider:"google"},{ $push: {vehicles: { $each:  [1,2]} } },{multi:true,upsert:true});

REMOVE CAMPOS DE UM COLLECTION 
db.user.update({provider:"google"},{ $unset : {vehicles: ""}},{multi:true});

wget
wget -c -r -P C:/fileswget http://www.
wget -p -k -r -P C:/fileswget http://www.sug
linux
wget -c -r -P /mnt/projetos_vbox/ http://www.

%windir%\system32\cmd.exe /K mongo.exe

note temp:
remove user all
