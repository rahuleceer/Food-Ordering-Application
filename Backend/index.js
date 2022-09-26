global.__ = console.log;
global._ = (parameter) => {
  console.log(parameter);
};
global._e = (parameter) => {
  console.log(parameter);
};

//# -- CODE START -- #

//` Setting up the environment variables
const dotenv = require('dotenv');
dotenv.config({
  path: './.env',
});
//` Database Configuration
require('./database');
const app = require('./app.js');

const { PORT } = process.env;

app.listen(PORT, () => {
  _(`Server is running on port ${PORT}`);
});
