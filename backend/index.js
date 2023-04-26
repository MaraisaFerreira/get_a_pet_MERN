require('dotenv').config();

const express = require('express');
const cors = require('cors');

/* routes */
const userRoutes = require('./routes/UserRoutes');
const petRoutes = require('./routes/PetRouter');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/users', userRoutes);
app.use('/pets', petRoutes);

app.listen(5000, () => console.log('Server running on 5000 port...'));
