const fs = require('fs');
const path = require('path');
const databasePath = path.join(__dirname, '../db/database.json');

// Leer la base de datos
const readDatabase = () => {
    const data = fs.readFileSync(databasePath);
    return JSON.parse(data);
};

// Guardar la base de datos
const writeDatabase = (data) => {
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
};

// Obtener todos los empleados
const getEmployees = (req, res) => {
    const employees = readDatabase().employees;
    res.json(employees);
};

// Agregar un nuevo empleado
const addEmployee = (req, res) => {
    const newEmployee = req.body;
    const database = readDatabase();
    database.employees.push(newEmployee);
    writeDatabase(database);
    res.status(201).json(newEmployee);
};

// Actualizar un empleado existente
const updateEmployee = (req, res) => {
    const { id } = req.params;
    const updatedEmployee = req.body;
    const database = readDatabase();
    const index = database.employees.findIndex(emp => emp.id === parseInt(id));

    if (index !== -1) {
        database.employees[index] = { ...database.employees[index], ...updatedEmployee };
        writeDatabase(database);
        res.json(database.employees[index]);
    } else {
        res.status(404).json({ message: 'Empleado no encontrado' });
    }
};

// Eliminar un empleado
const deleteEmployee = (req, res) => {
    const { id } = req.params;
    const database = readDatabase();
    const index = database.employees.findIndex(emp => emp.id === parseInt(id));

    if (index !== -1) {
        const deletedEmployee = database.employees.splice(index, 1);
        writeDatabase(database);
        res.json(deletedEmployee);
    } else {
        res.status(404).json({ message: 'Empleado no encontrado' });
    }
};

module.exports = {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
};