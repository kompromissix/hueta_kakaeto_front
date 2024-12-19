const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sequelize = require('./database');
const User = require('./User');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Синхронизация модели с базой данных
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    });

// Регистрация пользователя
app.post('/api/register', async (req, res) => {
    const { name_user, age_user, mail_user, nick_user, number, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { name_user } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name_user, age_user, mail_user, nick_user, number, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Аутентификация пользователя
app.post('/api/login', async (req, res) => {
    const { name_user, password } = req.body;
    try {
        const user = await User.findOne({ where: { name_user } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/users', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Получаем токен из заголовка
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.id).select('-password'); // Не возвращаем пароль
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

app.get('/users', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            console.log('User not found:', decoded.id);
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
});
// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});