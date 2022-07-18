const dotenv = require('dotenv')
dotenv.config({path: "./.env"})
const pg = require('pg').Pool
const db = new pg({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

exports.db = db;