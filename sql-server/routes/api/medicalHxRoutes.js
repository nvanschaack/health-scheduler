const router = require('express').Router();
const {getMedicalHx, addMedicalHx} = require('../../controllers/medicalHxControllers')
const {authMiddleware} = require('../../utils/auth');

//need to be logged in in order for provider to get medical hx or add medical hx. 
//This doesn't necessarily mean were going to use req.user does it? or maybe on the front end we will?
// /api/medicalHx
router.route('/').get(authMiddleware, getMedicalHx).post(authMiddleware, addMedicalHx);

module.exports = router;