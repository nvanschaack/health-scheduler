const router = require('express').Router();
const {seeAvailability, setAvailability, seeAllAvailability} = require('../../controllers/availabilityControllers');
const { authMiddleware } = require('../../utils/auth')

// for provider to set availability and for patient to see providers availability
// /api/availability/set
router.route('/set').post(authMiddleware, setAvailability);

// /api/availability/see
router.route('/see').post(seeAvailability);

// /api/availability/all
router.route('/all').get(authMiddleware, seeAllAvailability)

module.exports = router;