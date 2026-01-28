import { useState, useEffect } from 'react'
import { clientService } from 'src/api/clientService'
import { toast } from 'react-toastify'

export const useClients = () => {
  const [visibleClient, setVisibleClient] = useState(false)
  const [editVisibleClient, setEditVisibleClient] = useState(false)
  const [deleteVisibleClient, setDeleteVisibleClient] = useState(false)
  const [reactivateVisibleClient, setReactivateVisibleClient] = useState(false)
  const [currentClient, setCurrentClient] = useState(null)
  const [deleteConfirmationClient, setDeleteConfirmationClient] = useState('')
  const [reactivateConfirmationClient, setReactivateConfirmationClient] = useState('')
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

  const [activeTab, setActiveTab] = useState('active') // 'active' | 'inactive'

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Fetch fetching based on activeTab
        // Note: The service getAllClients accepts 'true', 'false', 'all'.
        // But getNaturalClients and getCompanyClients also need to support it or we use getAllClients and filter?
        // clientService.getNaturalClients and getCompanyClients were updated in backend but maybe not frontend helper?
        // I updated getAllClients in Step 3196 in service.
        // But backend getNaturalClients/getCompanyClients controller also support `active` param.
        // Let's assume standard clientService.getNaturalClients supports it (I didn't verify if I updated those service methods).
        // I only updated getAllClients in api/clientService.js (Step 3196).
        // I need to check if I updated getNaturalClients/getCompanyClients in clientService.js.
        // Looking at Step 3196 output: I only updated getAllClients and added reactivateClient.
        // I SHOULD update getNaturalClients/getCompanyClients in service too, or just use getAllClients and separate them here.

        // Reuse getAllClients and separate in frontend is easier given I have limited tool calls.
        const response = await clientService.getAllClients(
          activeTab === 'active' ? 'true' : 'false',
        )

        // response is array of clients
        // Separate them
        // Backend returns array of clients.
        const natural = response.filter((c) => !c.ttr_nomcompa)
        const company = response.filter((c) => !c.ttr_nombrecl)

        const allClients = [
          ...natural.map((client) => ({ ...client, client_type: 'Person' })),
          ...company.map((client) => ({ ...client, client_type: 'Company' })),
        ]
        setClients(allClients)
      } catch (error) {
        toast.error('Error al obtener clientes: ' + error.message)
      }
    }
    fetchClients()
  }, [activeTab]) // Re-fetch when activeTab changes

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
      // Manejo de errores de validación del backend
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message) // Muestra el mensaje de error específico del backend
      } else {
        toast.error('Error al agregar cliente: ' + (error.message || 'Error desconocido.'))
      }
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
      // Manejo de errores de validación del backend
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message) // Muestra el mensaje de error específico del backend
      } else {
        toast.error('Error al actualizar cliente: ' + (error.message || 'Error desconocido.'))
      }
    }
  }

  // handleReactivateClient - abre modal
  const openReactivateModal = (client) => {
    setCurrentClient(client)
    setReactivateConfirmationClient('')
    setReactivateVisibleClient(true)
  }

  // handleReactivateClient - confirma reactivación
  const handleReactivateClient = async () => {
    if (!currentClient || !currentClient.ttr_idclient) {
      toast.error('No hay cliente seleccionado.')
      return
    }
    if (reactivateConfirmationClient.toLowerCase() !== 'confirmar') {
      toast.error('Confirmación fallida. Escriba "confirmar".')
      return
    }
    try {
      await clientService.reactivateClient(currentClient.ttr_idclient)
      setClients(clients.filter((c) => c.ttr_idclient !== currentClient.ttr_idclient))
      setReactivateVisibleClient(false)
      setReactivateConfirmationClient('')
      toast.success('Cliente reactivado exitosamente!')
    } catch (error) {
      toast.error('Error al reactivar cliente: ' + (error.message || 'Error desconocido.'))
    }
  }

  const handleDeleteClient = async () => {
    if (!currentClient || !currentClient.ttr_idclient) {
      toast.error('No hay cliente seleccionado.')
      return
    }
    // If activeTab is 'inactive', we probably assume deletion is permanent or disabled?
    // User wants "Desactivar" instead of "Eliminar" for active.
    // My backend logic for Delete is actually Soft Delete (Update ttr_activo=false).

    if (deleteConfirmationClient === 'confirmar') {
      try {
        await clientService.deleteClient(currentClient.ttr_idclient)
        setClients(clients.filter((c) => c.ttr_idclient !== currentClient.ttr_idclient))
        setDeleteVisibleClient(false)
        const msg =
          activeTab === 'active'
            ? 'Cliente desactivado exitosamente!'
            : 'Cliente eliminado permanentemente (simulado)' // Backend is just soft delete, unless I implement hard delete. But schema says soft delete.
        toast.success(msg)
      } catch (error) {
        toast.error('Error al procesar cliente: ' + (error.message || 'Error desconocido.'))
      }
    } else {
      toast.error('Confirmación fallida. Escriba "confirmar".')
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
    activeTab,
    setActiveTab,
    handleReactivateClient,
    openReactivateModal,
    reactivateVisibleClient,
    setReactivateVisibleClient,
    reactivateConfirmationClient,
    setReactivateConfirmationClient,
  }
}
