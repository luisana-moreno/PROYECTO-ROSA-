import fs from 'fs';
import path from 'path';

const dbPath = path.join(__dirname, '../db/database.json');

// Read the database
const readDatabase = () => {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
};

// Write to the database
const writeDatabase = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Get all users
export const getUsers = (req, res) => {
    const users = readDatabase().users || [];
    res.json(users);
};

// Add a new user
export const addUser = (req, res) => {
    const users = readDatabase().users || [];
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    writeDatabase({ users });
    res.status(201).json(newUser);
};

// Update an existing user
export const updateUser = (req, res) => {
    const users = readDatabase().users || [];
    const { id } = req.params;
    const index = users.findIndex(user => user.id === parseInt(id));

    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };
        writeDatabase({ users });
        res.json(users[index]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Delete a user
export const deleteUser = (req, res) => {
    const users = readDatabase().users || [];
    const { id } = req.params;
    const index = users.findIndex(user => user.id === parseInt(id));

    if (index !== -1) {
        users.splice(index, 1);
        writeDatabase({ users });
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};