const db = require('../utils/config');
const User = require('../models/User');
const Wish = require('../models/Wish');
const crypto = require('crypto');

const registerGuest = (firstName, lastName, phone) => {
  return new Promise((resolve, reject) => {
    const user = new User(firstName, lastName, phone);
    db.get('SELECT id FROM users WHERE phone = ?', [phone], (err, row) => {
      if (err) {
        reject(err);
      } else if (row) {
        reject(new Error('Guest with this phone already exists'));
      } else {
        db.run(
          'INSERT INTO users (firstName, lastName, phone) VALUES (?, ?, ?)',
          [user.firstName, user.lastName, user.phone],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.lastID);
            }
          }
        );
      }
    });
  });
};

const generateToken = (userId) => {
  return new Promise((resolve, reject) => {
    const token = crypto.randomBytes(16).toString('hex');
    db.run('INSERT INTO tokens (userId, token) VALUES (?, ?)', [userId, token], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT userId FROM tokens WHERE token = ?', [token], (err, row) => {
      if (err) {
        reject(err);
      } else if (!row) {
        reject(new Error('Invalid or expired token'));
      } else {
        resolve(row.userId);
      }
    });
  });
};

const getGuests = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT firstName, lastName FROM users', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const addWish = (userId, text) => {
  return new Promise((resolve, reject) => {
    const wish = new Wish(userId, text);
    db.run(
      'INSERT INTO wishes (userId, text) VALUES (?, ?)',
      [wish.userId, wish.text],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

const getWishes = () => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT u.firstName, u.lastName, w.text FROM wishes w JOIN users u ON w.userId = u.id',
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

module.exports = { registerGuest, generateToken, verifyToken, getGuests, addWish, getWishes };