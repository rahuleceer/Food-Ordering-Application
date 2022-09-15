const { connection, connect } = require('mongoose');

//const { DATABASE } = process.env;

 connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on('connected', () => {
  _('Connected to database');
});

connection.on('error', (error) => {
  _e('Error connecting to database: ' + error);
});


