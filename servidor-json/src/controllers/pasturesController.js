const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/database.json');

// Leer la base de datos
const readDatabase = () => {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
};

// Guardar en la base de datos
const saveDatabase = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Obtener todos los potreros
const getPastures = (req, res) => {
    const pastures = readDatabase().pastures || [];
    res.json(pastures);
};

// Agregar un potrero
const addPasture = (req, res) => {
    const pastures = readDatabase().pastures || [];
    const newPasture = { id: pastures.length + 1, ...req.body };
    pastures.push(newPasture);
    saveDatabase({ pastures });
    res.status(201).json(newPasture);
};

// Actualizar un potrero
const updatePasture = (req, res) => {
    const pastures = readDatabase().pastures || [];
    const index = pastures.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        pastures[index] = { ...pastures[index], ...req.body };
        saveDatabase({ pastures });
        res.json(pastures[index]);
    } else {
        res.status(404).json({ message: 'Potrero no encontrado' });
    }
};

// Eliminar un potrero
const deletePasture = (req, res) => {
    let pastures = readDatabase().pastures || [];
    pastures = pastures.filter(p => p.id !== parseInt(req.params.id));
    saveDatabase({ pastures });
    res.status(204).send();
};

module.exports = {
    getPastures,
    addPasture,
    updatePasture,
    deletePasture,
};