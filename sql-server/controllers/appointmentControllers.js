const db = require("../config/connection");

module.exports = {
  //patient booking appt
  bookAppt(req, res) {
    const sql = `INSERT INTO appointments (providerId, patientId, provider_availability_id) VALUES (${req.body.providerId}, ${req.user.id}, '${req.body.provider_availability_id}')`;

    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      //THEN WE HAVE TO UPDATE THE AVAILABILITY TABLE
      const sql2 = `UPDATE provider_availability SET isAvailable = FALSE WHERE id = ${req.body.provider_availability_id}`;
      db.query(sql2, (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.status(200).json("appointment booked");
      });
    });
  },
  //provider - only showing BOOKED, CANCELLED OR COMPLETED appts
  seeAllApptsByProvider(req, res) {
    const sql = `SELECT * FROM appointments WHERE providerId = ${req.user.id}`;
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length === 0) {
        return res.status(400).json("no appointments found");
      }
      res.status(200).json(data);
    });
  },
 
  //provider
  seeOneApptProvider(req, res) {
    const sql = `SELECT user.firstName AS patient_firstName, user.lastName AS patient_lastName, user.age AS patient_age, appointments.status AS appointmentStatus, provider_availability.availableDate AS date, provider_availability.availableStartTime AS start, provider_availability.availableEndTime AS end FROM appointments LEFT JOIN user ON appointments.patientId = user.id RIGHT JOIN provider_availability ON appointments.provider_availability_id = provider_availability.id WHERE appointments.id = ${req.body.appointmentId}`;
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length === 0) {
        return res.status(400).json("no appointments found");
      }
      res.status(200).json(data);
    });
  },
  //patient
  seeAllApptsByPatient(req, res) {
    const sql = `SELECT appointments.id, DATE_FORMAT(provider_availability.availableDate, '%Y-%m-%d') AS date, CONCAT(user.firstName,' ', user.lastName) AS providerName, appointments.status FROM appointments LEFT JOIN user ON appointments.providerId = user.id RIGHT JOIN provider_availability ON appointments.provider_availability_id = provider_availability.id WHERE patientId = ${req.user.id}`;
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length === 0) {
        return res.status(400).json("no appointments found");
      }
      res.status(200).json(data);
    });
  },
  //patient (to see a specific appt)
  seeOneApptPatient(req, res) {
    const sql = `SELECT DATE_FORMAT(provider_availability.availableDate, '%Y-%m-%d') AS date, provider_availability.availableStartTime AS time, CONCAT(user.firstName,' ', user.lastName) AS providerName, appointments.status FROM appointments LEFT JOIN user ON appointments.providerId = user.id RIGHT JOIN provider_availability ON appointments.provider_availability_id = provider_availability.id WHERE appointments.id = ${req.body.appointmentId}`;
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length === 0) {
        return res.status(400).json("no appointments found");
      }
      res.status(200).json(data);
    });
  },
  seeDayOfAppts(req, res) {
    const date = new Date(); // 2024-11-01
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    
    const sql = `SELECT CONCAT(user.firstName,' ', user.lastName) AS patientName, provider_availability.availableStartTime AS time, appointments.id FROM appointments LEFT JOIN provider_availability ON appointments.provider_availability_id = provider_availability.id LEFT JOIN user ON appointments.patientId = user.id WHERE appointments.providerId = ${req.user.id} AND DATE(provider_availability.availableDate) = '${formattedDate}'`;

    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length === 0) {
        return res.status(400).json("no appointments found");
      }
      res.status(200).json(data);
    });
  },
  //future development - seeApptsByDay (provider)
  //future development - update an appt to completed or cancelled
};
