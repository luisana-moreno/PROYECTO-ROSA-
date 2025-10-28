const express = require('express');
const bodyParser = require('body-parser');
const cattleRoutes = require('./routes/cattleRoutes');
const employeesRoutes = require('./routes/employeesRoutes');
const clientRoutes = require('./routes/clientRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const pasturesRoutes = require('./routes/pasturesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const milkProductionRoutes = require('./routes/milkProductionRoutes');
const vaccinationRoutes = require('./routes/vaccinationRoutes');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

app.use('/api/cattle', cattleRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/pastures', pasturesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/milk-production', milkProductionRoutes);
app.use('/api/vaccination', vaccinationRoutes);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});