const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Добавляем CORS
const guestRoutes = require('./routes/guestRoutes');
const errorHandler = require('./middlewares/errorHandler');
const db = require('./utils/config'); // eslint-disable-line no-unused-vars

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:8080', credentials: true })); // Разрешаем запросы с фронтенда
app.use('/api', guestRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});