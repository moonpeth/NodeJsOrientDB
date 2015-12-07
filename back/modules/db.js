 //configuring the client

var orientjs = require('orientjs');

module.exports = function(){

	var server = orientjs({
	  host: 'localhost',
	  port: 2424,
	  username: 'admin',
	  password: 'admin'
	});
   
   //connect with the database 'FileSystem'
	var db = server.use({
	  name: 'FileSystem',
	  username: 'admin',
	  password: 'admin'
	});

	console.log('Using database: ' + db.name);
	
	return db;
};
