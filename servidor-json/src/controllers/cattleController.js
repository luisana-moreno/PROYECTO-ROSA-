const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, '../db/database.json');

// Read the database
const readDatabase = () => {
    const data = fs.readFileSync(databasePath);
    return JSON.parse(data);
};

// Write to the database
const writeDatabase = (data) => {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
};

// Get all cattle
const getCattle = (req, res) => {
    const cattle = readDatabase().cattle || [];
    res.json(cattle);
};

// Add new cattle
const addCattle = (req, res) => {
    const cattle = readDatabase().cattle || [];
    const newCattle = { id: cattle.length + 1, ...req.body };
    cattle.push(newCattle);
    writeDatabase({ ...readDatabase(), cattle });
    res.status(201).json(newCattle);
};

// Update cattle
const updateCattle = (req, res) => {
    const cattle = readDatabase().cattle || [];
    const index = cattle.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
        cattle[index] = { ...cattle[index], ...req.body };
        writeDatabase({ ...readDatabase(), cattle });
        res.json(cattle[index]);
    } else {
        res.status(404).json({ message: 'Cattle not found' });
    }
};

// Delete cattle
const deleteCattle = (req, res) => {
    let cattle = readDatabase().cattle || [];
    const index = cattle.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
        cattle.splice(index, 1);
        writeDatabase({ ...readDatabase(), cattle });
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Cattle not found' });
    }
};

module.exports = {
    getCattle,
    addCattle,
    updateCattle,
    deleteCattle,
};