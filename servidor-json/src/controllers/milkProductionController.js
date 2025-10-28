const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, '../db/database.json');

// Leer la base de datos
const readDatabase = () => {
    const data = fs.readFileSync(databasePath);
    return JSON.parse(data);
};

// Guardar en la base de datos
const writeDatabase = (data) => {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
};

// Obtener registros de producción de leche
const getMilkRecords = (req, res) => {
    const milkRecords = readDatabase().milkRecords || [];
    res.json(milkRecords);
};

// Agregar un nuevo registro de producción de leche
const addMilkRecord = (req, res) => {
    const newRecord = req.body;
    const database = readDatabase();
    database.milkRecords = database.milkRecords || [];
    database.milkRecords.push(newRecord);
    writeDatabase(database);
    res.status(201).json(newRecord);
};

// Actualizar un registro de producción de leche
const updateMilkRecord = (req, res) => {
    const { id } = req.params;
    const updatedRecord = req.body;
    const database = readDatabase();
    const index = database.milkRecords.findIndex(record => record.id === parseInt(id));

    if (index !== -1) {
        database.milkRecords[index] = { ...database.milkRecords[index], ...updatedRecord };
        writeDatabase(database);
        res.json(database.milkRecords[index]);
    } else {
        res.status(404).json({ message: 'Registro no encontrado' });
    }
};

// Eliminar un registro de producción de leche
const deleteMilkRecord = (req, res) => {
    const { id } = req.params;
    const database = readDatabase();
    const index = database.milkRecords.findIndex(record => record.id === parseInt(id));

    if (index !== -1) {
        const deletedRecord = database.milkRecords.splice(index, 1);
        writeDatabase(database);
        res.json(deletedRecord);
    } else {
        res.status(404).json({ message: 'Registro no encontrado' });
    }
};

module.exports = {
    getMilkRecords,
    addMilkRecord,
    updateMilkRecord,
    deleteMilkRecord,
};