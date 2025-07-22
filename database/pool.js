


require("dotenv").config();
const {Pool} = require("pg");


module.exports = new Pool({
    host : process.env.HOST,
    user : process.env.USER,
    database : process.env.DATABASE,
    password : process.env.PASSWORD,
    port : 48941,
    ssl: {
    rejectUnauthorized: false
  }
});
