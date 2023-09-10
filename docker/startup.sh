#!/bin/bash
/usr/bin/mysql_install_db --user=mysql --ldata=/var/lib/mysql
/usr/bin/screen -dmS session bash
/usr/bin/screen -S session -p 0 -X stuff "/usr/libexec/mysqld --user mysql"
updatedb

cd /app/venue
# /usr/bin/screen -d -m java -jar target/tea-1.0-SNAPSHOT-jar-with-dependencies.jar
java -jar target/tea-1.0-SNAPSHOT-jar-with-dependencies.jar
