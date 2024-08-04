import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "proyectopersonal",
  waitForConnections: true,
  queueLimit: 0,
  port:3306,
  connectionLimit:10,
})

export default pool