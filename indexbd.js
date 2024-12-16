const { query } = require("express")
const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    password:"1234",
    host:"localhost",
    port:"5432",
    datebase:"postgres"
})

module.exports = {
    query:(text,params) => pool.query(text,params)
}
