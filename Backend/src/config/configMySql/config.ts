import mysql from "mysql2";

const CONFIG = {
  host: "localhost",
  user: "root",
  password: "",
  database: "proyectopersonal",
  waitForConnections: true,
  queueLimit: 0,
};

export const pool = mysql.createConnection(CONFIG)

  
