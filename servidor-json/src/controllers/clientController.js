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

// Obtener todos los clientes
const getClients = (req, res) => {
    const clients = readDatabase().clients || [];
    res.json(clients);
};

// Agregar un nuevo cliente
const addClient = (req, res) => {
    const clients = readDatabase().clients || [];
    const newClient = req.body;
    clients.push(newClient);
    writeDatabase({ clients });
    res.status(201).json(newClient);
};

// Actualizar un cliente existente
const updateClient = (req, res) => {
    const clients = readDatabase().clients || [];
    const { id } = req.params;
    const index = clients.findIndex(client => client.id === id);

    if (index !== -1) {
        clients[index] = { ...clients[index], ...req.body };
        writeDatabase({ clients });
        res.json(clients[index]);
    } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
    }
};

// Eliminar un cliente
const deleteClient = (req, res) => {
    const clients = readDatabase().clients || [];
    const { id } = req.params;
    const newClients = clients.filter(client => client.id !== id);

    if (clients.length !== newClients.length) {
        writeDatabase({ clients: newClients });
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
    }
};

module.exports = {
    getClients,
    addClient,
    updateClient,
    deleteClient,
};