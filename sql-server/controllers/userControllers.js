const db = require("../config/connection");
const bcrypt = require("bcrypt");
const auth = require("../utils/auth");

module.exports = {
  //when the user registers their account
  async addAPatient(req, res) {
    const hashedPw = await bcrypt.hash(req.body.password, 10);

    const sql = `INSERT INTO user (firstName, lastName, age, username, password) VALUES ('${req.body.firstName}','${req.body.lastName}','${req.body.age}','${req.body.username}','${hashedPw}')`;

    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json("patient created, please login now");
    });
  },
  //admin adds a provider to the system
  async addAProvider(req, res) {
    const hashedPw = await bcrypt.hash(req.body.password, 10);

    const sql = `INSERT INTO user (role, firstName, lastName, age, username, password) VALUES ('${req.body.role}','${req.body.firstName}','${req.body.lastName}','${req.body.age}','${req.body.username}','${hashedPw}')`;

    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json("provider created");
    });
  },
  login(req, res) {
    const sql = `SELECT * FROM user WHERE username = '${req.body.username}'`;
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length === 0) {
        return res.status(400).json("username is not in the database");
      }
      //returns an array called data with an object in it. the object holds all of the users info.
      // console.log("data:", data);

      const user = data[0];

      const checkClientPw = bcrypt.compare(req.body.password, user.password);

      if (!checkClientPw) {
        return res
          .status(400)
          .json("password does not match password in database");
      }
      const token = auth.signToken(user);

      res.status(200).json({ token });
    });
  },
  // find the user thats logged in
  findOneUser(req, res) {
    const sql = `SELECT * FROM user WHERE id = ${req.user.id}`;

    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length === 0) {
        return res.status(400).json("user not found");
      }

      res.status(200).json(data);
    });
  },
  deleteAUser(req, res) {
    const sql = `DELETE FROM user WHERE id = ${req.params.userId}`;
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (data.length === 0) {
        return res.status(400).json("user not found");
      }

      res.status(200).json("user deleted");
    });
  },
  //this fxn can return 3 different pieces of data using req.query
  // /api/user?role=all
  seeAllByRole(req, res) {
    let sql;
    if (req.query.role === "patient") {
      sql = `SELECT * FROM user WHERE role = '${req.query.role}'`;
    } else if (req.query.role === "provider") {
      sql = `SELECT * FROM user WHERE role = '${req.query.role}'`;
    } else {
      sql = `SELECT * FROM user`;
    }

    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(data);
    });
  },

  //future development - editProfile
};
