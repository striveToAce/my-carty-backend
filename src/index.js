const express = require('express');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/cart', cartRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => res.send('myCarty API is running!'));

app.listen(4000, () => console.log('Server running on http://localhost:4000'));