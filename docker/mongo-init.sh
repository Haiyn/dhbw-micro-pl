mongo -- "$MONGO_INITDB_DATABASE" <<EOF
  var user = '$MONGO_INITDB_USERNAME';
  var pass = '$MONGO_INITDB_PASSWORD';
  if(user !== '') db.createUser({user: user, pwd: pass, roles: ["readWrite"]});
EOF