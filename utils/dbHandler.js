const db = require("../config/dbConnection");
db.connect((err) => {
  if (err) throw err;
});

function runQuery(query, params) {
  return new Promise((resolve, reject) => {
    try {
      db.query(query, params, (error, results) => {
        if (error) reject(err);
        let user = results[0];
        resolve(user);
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { runQuery };
