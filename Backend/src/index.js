const express = require('express');
const cookieParser = require('cookie-parser');
const controllers = require('./controllers/index.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.post('/register', controllers.registerGuest);
app.get('/guests', controllers.getGuests);
app.post('/wishes', controllers.addWish);
app.get('/wishes', controllers.getWishes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});