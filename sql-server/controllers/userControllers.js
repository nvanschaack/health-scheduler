const db = require('../config/connection');
const bcrypt = require('bcrypt');

module.exports = {
    //addAPatient
    //when we add a patient we dont want to make their password for them though???
    async addAPatient(req, res) {
        //need to hash password
        const sql = `INSERT INTO user (role, firstName, lastName, age, username, password) VALUES ('${req.body.role}','${req.body.firstName}','${req.body.lastName}','${req.body.age}','${req.body.password}',)`;

        db.query(sql, (err, data) => {
            if (err) {
                return res.status(500).json(err)
            }
            res.json('patient created')
        })
    },
    //addAProvider
    async addAProvider(req, res) {
        const sql = `INSERT INTO user (role, firstName, lastName, age, username, password) VALUES ('${req.body.role}','${req.body.firstName}','${req.body.lastName}','${req.body.age}','${req.body.password}',)`;

        db.query(sql, (err, data) => {
            if (err) {
                return res.status(500).json(err)
            }
            res.json('provider created')
        })
    },
    //login
    async login(req,res) {
        const sql = `SELECT * FROM user WHERE username = '${req.body.username}'`
        db.query(sql, (err, data)=>{
            
        })
        
    }
    //deleteAUser
    //seeAllPatients
    //seeAllProviders
    //seeAllUsers

    //future development - editProfile
}