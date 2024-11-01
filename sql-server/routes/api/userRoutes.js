const router = require('express').Router();
const {addAPatient, addAProvider, login, findOneUser, deleteAUser, seeAllByRole} = require('../../controllers/userControllers');
const {authMiddleware} = require('../../utils/auth');

//need authMiddleware for finding and deleting user? 
// /api/user
router.route('/').get(authMiddleware, findOneUser);

// /api/user/addPatient
router.route('/addPatient').post(addAPatient);

// /api/user/addProvider
router.route('/addProvider').post(authMiddleware, addAProvider);

// /api/user/login
router.route('/login').post(login);

//using req.query
// /api/user/role?role=
router.route('/role').get(authMiddleware, seeAllByRole);

//PUT PARAMETER ROUTES AT END SO AS TO NOT EFFECT OTHER ROUTES:
// /api/user/:userId
router.route('/:userId').delete(authMiddleware, deleteAUser);


module.exports = router;