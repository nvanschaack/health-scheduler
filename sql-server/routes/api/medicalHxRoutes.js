const router = require('express').Router();
const {getMedicalHx, addMedicalHx} = require('../../controllers/medicalHxControllers')
const {authMiddleware} = require('../../utils/auth');

//need to be logged in in order for provider to get medical hx or add medical hx. 
//prior to getting to the next function, we need to make sure the token exists (authMiddleware)
// /api/medicalHx
router.route('/').post(authMiddleware, addMedicalHx);

// /api/medicalHx/:patientId
router.route('/:patientId').get(authMiddleware, getMedicalHx);

module.exports = router;