const db = require("../config/connection");

module.exports = {
  //provider
  setAvailability(req, res) {
    const sql = `INSERT INTO provider_availability (providerId, availableDate, availableStartTime, availableEndTime) VALUES (${req.user.id}, '${req.body.availableDate}', '${req.body.availableStartTime}', '${req.body.availableEndTime}')`;
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json("data inserted");
    });
  },
  //patient
  seeAvailability(req, res) {
    const sql = `SELECT * FROM provider_availability WHERE providerId = ${req.body.providerId} AND DATE(availableDate)='${req.body.availableDate}'`;
    db.query(sql, (err, data) => {
      console.log(data);

      if (err) {
        res.status(500).json(err);
      }
      if (data.length === 0) {
        return res.status(400).json("no appointments found");
      }
      res.status(200).json(data);
    });
  },

  //future development - updateAvailability (provider)
};
