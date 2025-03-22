const services = require('../services/index.js');

const registerGuest = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const userId = await services.registerGuest(firstName, lastName, phone);
    res.status(201).json({ id: userId, message: 'Guest registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getGuests = async (req, res) => {
  try {
    const guests = await services.getGuests();
    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addWish = async (req, res) => {
  try {
    const { userId, text } = req.body;
    await services.addWish(userId, text);
    res.status(201).json({ message: 'Wish added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getWishes = async (req, res) => {
  try {
    const wishes = await services.getWishes();
    res.status(200).json(wishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerGuest, getGuests, addWish, getWishes };