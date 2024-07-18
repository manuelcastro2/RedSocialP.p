import mysql from "mysql2";

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "proyectopersonal",
  waitForConnections: true,
  queueLimit: 0,
});

connection.on("error", (err) => {
  console.error("failed connection", err);
});

export const getMySqlConnection = async () => {
  try {
    console.log("Connection to MySQL");
    return await connection.promise();
  } catch (error) {
    console.error("Error the connection MySQL:", error);
  }
};

