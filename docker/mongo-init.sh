mongo -- "$MONGO_INITDB_DATABASE" <<EOF
  var user = '$MONGO_INITDB_USER';
  var pass = '$MONGO_INITDB_PASS';
  if(user !== '') db.createUser({user: user, pwd: pass, roles: ["readWrite"]});
EOF