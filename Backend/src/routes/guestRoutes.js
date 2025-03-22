const express = require('express');
const router = express.Router();
const guestController = require('../controllers/index');
const checkAuth = require('../middlewares/auth');

router.post('/register', guestController.registerGuest);
router.get('/guests', guestController.getGuests);
router.post('/wishes', checkAuth, guestController.addWish);
router.get('/wishes', guestController.getWishes);

module.exports = router;