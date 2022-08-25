const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
    host: "localhost", // HOST NAME
    user: "root", // USER NAME
    database : 'letgo',
    password: "", // DATABASE PASSWORD
    multipleStatements : true,
    port:3306,
    
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });


//   const cb = function(err, results, fields) {
//     conn.release();
//     if(err)
//     {
//         reject(err);
//         return;
//     }
//     resolve(results);
// }

module.exports = db_connection;