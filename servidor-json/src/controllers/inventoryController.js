const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, '../db/database.json');

// Leer la base de datos
const readDatabase = () => {
    const data = fs.readFileSync(databasePath);
    return JSON.parse(data);
};

// Guardar la base de datos
const saveDatabase = (data) => {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
};

// Obtener todos los items de inventario
const getInventoryItems = (req, res) => {
    const inventory = readDatabase().inventory || [];
    res.json(inventory);
};

// Agregar un nuevo item de inventario
const addInventoryItem = (req, res) => {
    const inventory = readDatabase().inventory || [];
    const newItem = req.body;
    inventory.push(newItem);
    saveDatabase({ inventory });
    res.status(201).json(newItem);
};

// Actualizar un item de inventario
const updateInventoryItem = (req, res) => {
    const inventory = readDatabase().inventory || [];
    const { id } = req.params;
    const index = inventory.findIndex(item => item.id === parseInt(id));

    if (index !== -1) {
        inventory[index] = { ...inventory[index], ...req.body };
        saveDatabase({ inventory });
        res.json(inventory[index]);
    } else {
        res.status(404).json({ message: 'Item no encontrado' });
    }
};

// Eliminar un item de inventario
const deleteInventoryItem = (req, res) => {
    const inventory = readDatabase().inventory || [];
    const { id } = req.params;
    const index = inventory.findIndex(item => item.id === parseInt(id));

    if (index !== -1) {
        const deletedItem = inventory.splice(index, 1);
        saveDatabase({ inventory });
        res.json(deletedItem);
    } else {
        res.status(404).json({ message: 'Item no encontrado' });
    }
};

module.exports = {
    getInventoryItems,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
};