const express = require('express');
const router = express.Router();
const guestController = require('../controllers/index');
const checkAuth = require('../middlewares/auth');

// Регистрация гостя
router.post('/register', guestController.register);

// Логин гостя
router.post('/login', guestController.login);

// Выход (логаут)
router.post('/logout', guestController.logout);

// Получение списка гостей
router.get('/guests', guestController.getGuests);

// Добавление пожелания (только для авторизованных)
router.post('/wishes', checkAuth, guestController.addWish);

// Получение списка пожеланий
router.get('/wishes', guestController.getWishes);

module.exports = router;