const db = require('../config/connection');

module.exports = {
    getMedicalHx(req,res){
        const sql = `SELECT * FROM medical_hx WHERE patientId = ${req.body.patientId}`;

        db.query(sql, (err, data)=> {
            if (err) {
                res.status(500).json(err)
            }
            if (data.length === 0) {
                res.status(400).json('patient id not found')
            }
            res.status(200).json(data)
        })
    },
    addMedicalHx(req,res){
        const sql = `INSERT INTO medical_hx (diagnosis, dateOfDiagnosis, tx, courseOfTx, patientId) VALUES ('${req.body.diagnosis}', '${req.body.dateOfDiagnosis}', '${req.body.tx}', '${req.body.courseOfTx}', '${req.body.patientId}')`;

        db.query(sql, (err, data)=> {
            if (err) {
                res.status(500).json(err)
            }
            res.status(200).json(data)
        })
    }

    //future development - updateMedicalHx
}