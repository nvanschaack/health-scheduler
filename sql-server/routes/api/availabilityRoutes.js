const router = require('express').Router();
const {seeAvailability, setAvailability} = require('../../controllers/availabilityControllers');
const { authMiddleware } = require('../../utils/auth')

// for provider to set availability and for patient to see providers availability
// /api/availability/set
router.route('/set').post(authMiddleware, setAvailability);

// /api/availability/see
router.route('/see').post(authMiddleware, seeAvailability);

module.exports = router;