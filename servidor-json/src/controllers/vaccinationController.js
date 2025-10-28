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

// Obtener registros de vacunación
const getVaccinationRecords = (req, res) => {
    const data = readDatabase();
    res.json(data.vaccinationRecords);
};

// Agregar un nuevo registro de vacunación
const addVaccinationRecord = (req, res) => {
    const data = readDatabase();
    const newRecord = req.body;
    data.vaccinationRecords.push(newRecord);
    writeDatabase(data);
    res.status(201).json(newRecord);
};

// Actualizar un registro de vacunación
const updateVaccinationRecord = (req, res) => {
    const data = readDatabase();
    const { id } = req.params;
    const index = data.vaccinationRecords.findIndex(record => record.id === parseInt(id));
    
    if (index !== -1) {
        data.vaccinationRecords[index] = { ...data.vaccinationRecords[index], ...req.body };
        writeDatabase(data);
        res.json(data.vaccinationRecords[index]);
    } else {
        res.status(404).json({ message: 'Registro no encontrado' });
    }
};

// Eliminar un registro de vacunación
const deleteVaccinationRecord = (req, res) => {
    const data = readDatabase();
    const { id } = req.params;
    const index = data.vaccinationRecords.findIndex(record => record.id === parseInt(id));
    
    if (index !== -1) {
        const deletedRecord = data.vaccinationRecords.splice(index, 1);
        writeDatabase(data);
        res.json(deletedRecord);
    } else {
        res.status(404).json({ message: 'Registro no encontrado' });
    }
};

module.exports = {
    getVaccinationRecords,
    addVaccinationRecord,
    updateVaccinationRecord,
    deleteVaccinationRecord,
};