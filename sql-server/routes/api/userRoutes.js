const router = require('express').Router();
const {addAPatient, addAProvider, login, findOneUser, deleteAUser, seeAllByRole} = require('../../controllers/userControllers');
const {authMiddleware} = require('../../utils/auth');

//need authMiddleware for finding and deleting user? 
// /api/user
router.route('/').get(authMiddleware, findOneUser).delete(authMiddleware, deleteAUser);

// /api/user/addPatient
router.route('/addPatient').post(addAPatient);

// /api/user/addProvider
router.route('/addProvider').post(addAProvider);

// /api/user/login
router.route('/login').post(login);

//using req.query
// /api/user?role=
router.route('').get(seeAllByRole);

module.exports = router;