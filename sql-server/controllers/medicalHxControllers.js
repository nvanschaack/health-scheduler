const db = require("../config/connection");

module.exports = {
  //for the provider
  getMedicalHx(req, res) {
    // console.log(req.params.patientId);

    const sql = `SELECT user.firstName AS patient_firstName, user.lastName AS patient_lastName, user.age AS patient_age, medical_hx.diagnosis, DATE_FORMAT(medical_hx.dateOfDiagnosis, '%Y-%m-%d') AS date, medical_hx.tx, medical_hx.courseOfTx, medical_hx.patientId FROM medical_hx LEFT JOIN user ON medical_hx.patientId = user.id WHERE medical_hx.patientId = ${req.params.patientId}`;

    db.query(sql, (err, data) => {
      // console.log(data);

      if (err) {
        return res.status(500).json(err);
      }
      if (data.length === 0) {
        return res.status(400).json("patient id not found");
      }

      //were sending data in json here b/c "select" returns data
      res.status(200).json(data);
    });
  },
  //a form the provider will fill out to update medical hx
  //booleans are not passed as strings in sql statement
  addMedicalHx(req, res) {
    console.log(req.body);
    
    const sql = `INSERT INTO medical_hx (diagnosis, dateOfDiagnosis, tx, courseOfTx, patientId) VALUES ('${req.body.diagnosis}', '${req.body.dateOfDiagnosis}', '${req.body.tx}', '${req.body.courseOfTx}', ${req.body.patientId})`;

    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      //we dont need to send "data" in json b/c "insert into" doesnt return actual data
      res.status(200).json(data);
    });
  },

  //future development - updateMedicalHx
};
