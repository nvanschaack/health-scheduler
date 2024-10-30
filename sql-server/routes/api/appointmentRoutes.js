const router = require('express').Router();
const {addAppt, seeAllApptsByProvider, seeOneApptProvider, seeAllApptsByPatient, seeOneApptPatient} = require('../../controllers/appointmentControllers');
const {authMiddleware} = require('../../utils/auth');

//need to be logged in in order to do/see anything to do with appointment data

// /api/appointment
router.route('/').post(authMiddleware, addAppt);

// /api/appointment/seeAllApptsByProvider
router.route('/seeAllApptsByProvider').get(authMiddleware,seeAllApptsByProvider);

// /api/appointment/seeOneApptProvider
router.route('/seeOneApptProvider').get(authMiddleware, seeOneApptProvider);

// /api/appointment/seeAllApptsByPatient
router.route('/seeAllApptsByPatient').get(authMiddleware, seeAllApptsByPatient);

// /api/appointment/seeOneApptPatient
router.route('/seeOneApptPatient').get(authMiddleware, seeOneApptPatient);

module.exports = router;