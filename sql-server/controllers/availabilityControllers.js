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
    const sql = `SELECT * FROM provider_availability WHERE providerId = ${req.body.providerId} AND DATE(availableDate)='${req.body.availableDate}' AND isAvailable = true`;
    db.query(sql, (err, data) => {
      console.log(data);

      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(data);
    });
  },
  //provider- see ALL of their availability (current day and in the future)
  seeAllAvailability(req, res) {
    const sql = `SELECT DATE_FORMAT(availableDate, '%Y-%m-%d') AS date, availableStartTime, availableEndTime, id, isAvailable, providerId FROM provider_availability WHERE providerId = ${req.user.id} AND availableDate >= CURDATE() ORDER BY availableDate, TIME(availableStartTime)`;
    db.query(sql, (err, data) => {
      console.log(data);
      
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(data);
    });
  },
  //future development - updateAvailability (provider)
};
