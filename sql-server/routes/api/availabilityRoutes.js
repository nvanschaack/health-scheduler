const router = require('express').Router();
const {seeAvailability, setAvailability} = require('../../controllers/availabilityControllers');
const { authMiddleware } = require('../../utils/auth')

// for provider to set availability and for patient to see providers availability
// /api/availability
router.route('/').post(authMiddleware, setAvailability).get(authMiddleware, seeAvailability);

module.exports = router;