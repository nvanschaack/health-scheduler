const router = require("express").Router();
const {
  bookAppt,
  seeAllApptsByProvider,
  seeOneApptProvider,
  seeAllApptsByPatient,
  seeOneApptPatient,
  seeDayOfAppts,
} = require("../../controllers/appointmentControllers");
const { authMiddleware } = require("../../utils/auth");

//need to be logged in in order to do/see anything to do with appointment data

// /api/appointment/patient
router.route("/patient").post(authMiddleware, bookAppt);

// /api/appointment/seeAllApptsByProvider
router
  .route("/seeAllApptsByProvider")
  .get(authMiddleware, seeAllApptsByProvider);

// /api/appointment/seeOneApptProvider
router.route("/seeOneApptProvider").post(authMiddleware, seeOneApptProvider);

// /api/appointment/dayOfAppts
router.route("/dayOfAppts").get(authMiddleware, seeDayOfAppts);

// /api/appointment/seeAllApptsByPatient
router.route("/seeAllApptsByPatient").get(authMiddleware, seeAllApptsByPatient);

// /api/appointment/seeOneApptPatient
router.route("/seeOneApptPatient").post(authMiddleware, seeOneApptPatient);

module.exports = router;
