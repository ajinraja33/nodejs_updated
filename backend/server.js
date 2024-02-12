// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use(cors());
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "ajin@1998",
//   database: "signup",
// });

// app.post("./signup", (req, res) => {
//   const sql = "INSERT INTO login('name','email','password') VALUES(?)";
//   const values = [req.body.name, req.body.email, req.body.password];
//   db.query(sql, [values], (err, data) => {
//     if (err) {
//       return res.json("Error");
//     }
//     return res.json("data");
//   });
// });

// app.get("/hello/:name", (req, res) => {
//   const { name } = req.params;
//   res.send(`Hello, ${name}!`);
// });
// const port =  3306;
// app.listen(8081, () => {
//   console.log("Listening");
// });
const express = require("express");
const mysql = require("mysql2");

const app = express();
// const pool = require("./lib/dbpool");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "b4rgscxioaqxkxysnpns-mysql.services.clever-cloud.com",
  user: "upgzk3sziqdyphp3",
  password: "m0iyfEhKkkgavnXfe6NN",
  database: "b4rgscxioaqxkxysnpns",
});

// MySQL connection configuration
const connection = mysql.createConnection({
  host: "b4rgscxioaqxkxysnpns-mysql.services.clever-cloud.com",
  user: "upgzk3sziqdyphp3",
  password: "m0iyfEhKkkgavnXfe6NN",
  database: "b4rgscxioaqxkxysnpns",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Middleware to parse JSON bodies
app.use(express.json());
var cors = require("cors");
app.use(
  cors({
    origin: [
      "https://frontend-updated-deploy.onrender.com/",
      "https://frontend-updated-deploy.onrender.com/",
    ],
  })
);
// Route to handle POST requests
// const pool = require("./db");

app.get("/users/:email", (req, res) => {
  const email = req.params.email;
  pool.query(
    "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL,email VARCHAR(255) UNIQUE NOT NULL,password VARCHAR(255) NOT NULL)"
  );
  pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
      } else if (results.length === 0) {
        res.status(404).json({ error: "Data not found" });
      } else {
        res.json(results[0]);
      }
    }
  );
});

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  connection.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("Error inserting data: ", err);
      res.status(500).send("Error inserting data into database");
      return;
    }
    console.log("Data inserted successfully");
    res.status(201).send("Data inserted successfully");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(PORT);
});
