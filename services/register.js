const db = require("../utils/dbHandler");
let data;

function getUserInfo(email) {
  db.runQuery("SELECT * FROM users WHERE email = ?", email, (result) => {
    data = result;
  });
  return data;
}
function insertUser(username, email, password) {
  db.runQuery(
    "INSERT INTO users(name, email, password) VALUES(?, ?, ?)",
    [username, email, password],
    (result) => {
      data = result;
    }
  );
  return data;
}

module.exports = { getUserInfo, insertUser };
