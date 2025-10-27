import React, { useState, useEffect } from 'react';
import { helpFetch } from 'src/helpper/helpFetch'
const { get } = helpFetch()
import {
    CCard,
    CCardHeader,
    CCardBody,
    CRow,
    CCol,
    CFormSelect,
    CFormInput,
    CButton,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CPagination,
    CPaginationItem,
} from '@coreui/react';

const Asisten = () => {
    const [week, setWeek] = useState('21 abr - 27 abr 2025');
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [detailVisible, setDetailVisible] = useState(false);
    const [filters, setFilters] = useState({
        name: '',
        position: '',
    });
    const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
    const [currentPage, setCurrentPage] = useState(1)
    const [employeesPerPage] = useState(10)

    // Cargar empleados reales desde la API
    useEffect(() => {
        get('employee').then(data => {
            if (data) {
                // Inicializa asistencia y horas trabajadas si no existen
                setEmployees(data.map(emp => ({
                    ...emp,
                    name: `${emp.firts_name || ''} ${emp.Firts_Las_Name || ''}`.trim(),
                    position: emp.Position || '',
                    attendance: {},
                    hoursWorked: 0,
                })));
            }
        });
    }, []);

    const handleAttendanceChange = (employeeId, day, value) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((emp) =>
                emp.id === employeeId
                    ? { ...emp, attendance: { ...emp.attendance, [day]: value } }
                    : emp
            )
        );
    };

    const handleHoursWorkedChange = (employeeId, hours) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((emp) =>
                emp.id === employeeId ? { ...emp, hoursWorked: hours } : emp
            )
        );
    };

    const filteredEmployees = employees.filter((emp) => {
        const matchesName = filters.name
            ? emp.name.toLowerCase().includes(filters.name.toLowerCase())
            : true;
        const matchesPosition = filters.position
            ? emp.position.toLowerCase().includes(filters.position.toLowerCase())
            : true;
        return matchesName && matchesPosition;
    });

    // Get current employees for pagination
    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <CCard>
            <CCardHeader>
                <h4 className="typography-color-title mb-0">Control de Asistencias</h4>
                <CRow className="mt-3">
                    <CCol md={6}>
                        <CFormInput
                            placeholder="Buscar por nombre"
                            value={filters.name}
                            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                        />
                    </CCol>
                    <CCol md={6}>
                        <CFormSelect
                            value={filters.position}
                            onChange={(e) => setFilters({ ...filters, position: e.target.value })}
                        >
                            <option value="">Filtrar por cargo</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Gerente de lacteos">Gerente de lacteos</option>
                            <option value="Veterinario">Veterinario</option>
                            <option value="Gerente de transporte">Gerente de transporte</option>
                            <option value="Gerente de Potreros">Gerente de Potreros</option>
                            <option value="Gerente de Mantenimiento">Gerente de Mantenimiento</option>
                            <option value="Trabajador de campo">Trabajador de campo</option>
                        </CFormSelect>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CTable hover responsive className="shadow-sm">
                    <CTableHead className="table-header-custom">
                        <CTableRow>
                            <CTableHeaderCell className='text-green'>N°</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Empleado</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Cargo</CTableHeaderCell>
                            {days.map((day) => (
                                <CTableHeaderCell className='text-green' key={day}>{day}</CTableHeaderCell>
                            ))}
                            <CTableHeaderCell className='text-green'>Horas Trabajadas</CTableHeaderCell>
                            <CTableHeaderCell className='text-green'>Acciones</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {currentEmployees.map((emp, index) => (
                            <CTableRow key={emp.id}>
                                <CTableDataCell>{indexOfFirstEmployee + index + 1}</CTableDataCell>
                                <CTableDataCell>
                                    {emp.name}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {emp.position}
                                </CTableDataCell>
                                {days.map((day) => (
                                    <CTableDataCell key={day}>
                                        <CFormSelect
                                            value={emp.attendance[day] || ''}
                                            onChange={(e) =>
                                                handleAttendanceChange(emp.id, day, e.target.value)
                                            }
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="Presente">Presente</option>
                                            <option value="Ausente">Ausente</option>
                                            <option value="Reposo">Reposo</option>
                                        </CFormSelect>
                                    </CTableDataCell>
                                ))}
                                <CTableDataCell>
                                    <CFormInput
                                        type="number"
                                        placeholder="Horas"
                                        value={emp.hoursWorked}
                                        onChange={(e) =>
                                            handleHoursWorkedChange(emp.id, e.target.value)
                                        }
                                    />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CButton
                                        size="sm"
                                        color="info"
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedEmployee(emp);
                                            setDetailVisible(true);
                                        }}
                                        className='button-no-hover-green text-white'>
                                        Ver Detalle
                                    </CButton>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
                <CPagination align="center" aria-label="Page navigation example">
                    {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, i) => (
                        <CPaginationItem
                            key={i + 1}
                            active={i + 1 === currentPage}
                            onClick={() => paginate(i + 1)}
                        >
                            {i + 1}
                        </CPaginationItem>
                    ))}
                </CPagination>
            </CCardBody>

            {/* Modal para detalle del empleado */}
            <CModal alignment="center" scrollable visible={detailVisible} onClose={() => setDetailVisible(false)} className="modern-modal">
                <CModalHeader className='modern-modal-header'>
                    <CModalTitle className='modern-modal-title'>Detalle del Empleado</CModalTitle>
                </CModalHeader>
                <CModalBody className="modern-modal-body">
                    {selectedEmployee ? (
                        <>
                            <h5>Nombre: {selectedEmployee.name}</h5>
                            <h6>Cargo: {selectedEmployee.position}</h6>
                            <h6>Horas Trabajadas: {selectedEmployee.hoursWorked}</h6>
                            <h6>Estado de la Semana:</h6>
                            <ul>
                                {days.map((day) => (
                                    <li key={day}>
                                        {day}: {selectedEmployee.attendance[day] || 'Sin registro'}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>No hay detalles disponibles.</p>
                    )}
                </CModalBody>
                <CModalFooter className="modern-modal-footer">
                    <CButton className="button-no-hover-green text-white" onClick={() => setDetailVisible(false)}>
                        Cerrar
                    </CButton>
                </CModalFooter>
            </CModal>
        </CCard>
    );
};

export default Asisten;
