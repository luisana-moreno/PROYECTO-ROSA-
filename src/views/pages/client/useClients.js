import { useState, useEffect } from 'react'
import { clientService } from 'src/api/clientService'
import { toast } from 'react-toastify'

export const useClients = () => {
  const [visibleClient, setVisibleClient] = useState(false)
  const [editVisibleClient, setEditVisibleClient] = useState(false)
  const [deleteVisibleClient, setDeleteVisibleClient] = useState(false)
  const [currentClient, setCurrentClient] = useState(null)
  const [deleteConfirmationClient, setDeleteConfirmationClient] = useState('')
  const [clients, setClients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [addClientForm, setAddClientForm] = useState({
    client_type: '', // 'Person' o 'Company'
    company_name: '',
    firts_name: '',
    Firts_Las_Name: '',
    Document_Number: '',
    Rif: '',
    Phone: '',
    Address: '',
    email: '',
  })

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const naturalClients = await clientService.getNaturalClients()
        const companyClients = await clientService.getCompanyClients()

        const allClients = [
          ...naturalClients.map((client) => ({ ...client, client_type: 'Person' })),
          ...companyClients.map((client) => ({ ...client, client_type: 'Company' })),
        ]
        setClients(allClients)
      } catch (error) {
        toast.error('Error al obtener clientes: ' + error.message)
      }
    }
    fetchClients()
  }, [])

  const filteredClients = clients.filter((client) => {
    const matchesSearchTerm = searchTerm
      ? (client.client_type === 'Person' &&
          (client.ttr_nombrecl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.ttr_apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.ttr_documecl?.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        (client.client_type === 'Company' &&
          (client.ttr_nomcompa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.ttr_documecl?.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        client.ttr_telefono?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.ttr_direccio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.ttr_correocl?.toLowerCase().includes(searchTerm.toLowerCase())
      : true

    return matchesSearchTerm
  })

  const handleAddClient = async () => {
    try {
      let clientDataToSend = {}
      if (addClientForm.client_type === 'Person') {
        clientDataToSend = {
          nombreCompania: null,
          nombreCliente: addClientForm.firts_name,
          apellidoCliente: addClientForm.Firts_Las_Name,
          documentoCliente: addClientForm.Document_Number,
          telefono: addClientForm.Phone,
          direccion: addClientForm.Address,
          correo: addClientForm.email,
        }
      } else if (addClientForm.client_type === 'Company') {
        clientDataToSend = {
          nombreCompania: addClientForm.company_name,
          nombreCliente: null,
          apellidoCliente: null,
          documentoCliente: addClientForm.Rif, // Usar Rif como documento para empresas
          telefono: addClientForm.Phone,
          direccion: addClientForm.Address,
          correo: addClientForm.email,
        }
      }

      const newClient = await clientService.createClient(clientDataToSend)
      if (newClient) {
        setClients((prevClients) => [
          ...prevClients,
          { ...newClient, client_type: addClientForm.client_type },
        ])
        setAddClientForm({
          client_type: '',
          company_name: '',
          firts_name: '',
          Firts_Las_Name: '',
          Document_Number: '',
          Rif: '',
          Phone: '',
          Address: '',
          email: '',
        })
        setVisibleClient(false)
        toast.success('Cliente agregado exitosamente!')
      }
    } catch (error) {
      toast.error('Error al agregar cliente: ' + error.message)
    }
  }

  const handleEditClient = async () => {
    if (!currentClient || !currentClient.ttr_idclient) {
      toast.error('No hay cliente seleccionado para editar.')
      return
    }
    try {
      let clientDataToSend = {}
      if (currentClient.client_type === 'Person') {
        clientDataToSend = {
          nombreCompania: null,
          nombreCliente: currentClient.firts_name,
          apellidoCliente: currentClient.Firts_Las_Name,
          documentoCliente: currentClient.Document_Number,
          telefono: currentClient.Phone,
          direccion: currentClient.Address,
          correo: currentClient.email,
        }
      } else if (currentClient.client_type === 'Company') {
        clientDataToSend = {
          nombreCompania: currentClient.company_name,
          nombreCliente: null,
          apellidoCliente: null,
          documentoCliente: currentClient.Rif, // Usar Rif como documento para empresas
          telefono: currentClient.Phone,
          direccion: currentClient.Address,
          correo: currentClient.email,
        }
      }

      const updated = await clientService.updateClient(currentClient.ttr_idclient, clientDataToSend)
      if (updated) {
        setClients((prevClients) =>
          prevClients.map((c) =>
            c.ttr_idclient === updated.ttr_idclient
              ? { ...updated, client_type: currentClient.client_type }
              : c,
          ),
        )
        setEditVisibleClient(false)
        toast.success('Cliente actualizado exitosamente!')
      }
    } catch (error) {
      toast.error('Error al actualizar cliente: ' + error.message)
    }
  }

  const handleDeleteClient = async () => {
    if (!currentClient || !currentClient.ttr_idclient) {
      toast.error('No hay cliente seleccionado para eliminar.')
      return
    }
    if (deleteConfirmationClient === 'confirmar') {
      try {
        await clientService.deleteClient(currentClient.ttr_idclient)
        setClients(clients.filter((c) => c.ttr_idclient !== currentClient.ttr_idclient))
        setDeleteVisibleClient(false)
        toast.success('Cliente eliminado exitosamente!')
      } catch (error) {
        toast.error('Error al eliminar cliente: ' + error.message)
      }
    } else {
      toast.error('Confirmación de eliminación fallida. Escriba "confirmar".')
    }
  }

  return {
    visibleClient,
    setVisibleClient,
    editVisibleClient,
    setEditVisibleClient,
    deleteVisibleClient,
    setDeleteVisibleClient,
    currentClient,
    setCurrentClient,
    deleteConfirmationClient,
    setDeleteConfirmationClient,
    clients,
    addClientForm,
    setAddClientForm,
    handleAddClient,
    handleEditClient,
    handleDeleteClient,
    searchTerm,
    setSearchTerm,
    filteredClients,
  }
}
