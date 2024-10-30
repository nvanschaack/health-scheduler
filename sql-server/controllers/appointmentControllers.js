const db = require('../config/connection');

module.exports = {
    addAppt(req,res){
        const sql = `INSERT INTO appointments (providerId, patientId, date) VALUES (${req.body.providerId}, ${req.user.id}, '${req.body.date}')`

        db.query(sql, (err, data)=> {
            if (err) {
                res.status(500).json(err)
            }
            res.status(200).json('data inserted')
        })
    },
    //provider
    seeAllApptsByProvider(req, res){
        const sql = `SELECT * FROM appointments WHERE providerId = ${req.user.id}`
        db.query(sql, (err, data)=> {
            if (err) {
                res.status(500).json(err)
            }
            if (data.length === 0) {
                res.status(400).json('no appointments found')
            }
            res.status(200).json(data)
        })
    },
    //provider
    seeOneApptProvider(req, res){
        const sql = `SELECT user.firstName AS patient_firstName, user.lastName AS patient_lastName, user.age AS patient_age, appointments.date AS appointmentDate, appointments.status AS appointmentStatus FROM appointments LEFT JOIN user ON appointments.patientId = user.id WHERE appointments.id = ${req.body.appointmentId}`
        db.query(sql, (err, data)=> {
            if (err) {
                res.status(500).json(err)
            }
            if (data.length === 0) {
                res.status(400).json('no appointments found')
            }
            res.status(200).json(data)
        })
    },
    //patient
    seeAllApptsByPatient(req, res){
        const sql = `SELECT * FROM appointments WHERE patientId = ${req.user.id}`
        db.query(sql, (err, data)=> {
            if (err) {
                res.status(500).json(err)
            }
            if (data.length === 0) {
                res.status(400).json('no appointments found')
            }
            res.status(200).json(data)
        })
    },
    //patient (to see a specific appt)
    seeOneApptPatient(req,res){
        const sql = `SELECT user.firstName AS provider_firstName, user.lastName AS provider_lastName, appointments.date AS appointmentDate, appointments.status AS appointmentStatus FROM appointments LEFT JOIN user ON appointments.providerId = user.id WHERE appointments.id = ${req.body.appointmentId}`
        db.query(sql, (err, data)=> {
            if (err) {
                res.status(500).json(err)
            }
            if (data.length === 0) {
                res.status(400).json('no appointments found')
            }
            res.status(200).json(data)
        })
    }
    
    //future development - seeApptsByDay (provider)
    //future development - update an appt to completed or cancelled
}