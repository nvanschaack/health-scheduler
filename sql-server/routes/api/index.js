const router = require('express').Router();
const userRoutes = require('./userRoutes');
const medicalHxRoutes = require('./medicalHxRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const availabilityRoutes = require('./availabilityRoutes');

// /api/ -->
router.use('/user', userRoutes);
router.use('/medicalHx', medicalHxRoutes);
router.use('/appointment', appointmentRoutes);
router.use('/availability', availabilityRoutes);

module.exports = router;