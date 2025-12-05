'use client'
import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { CButton, CCard, CCardBody, CCardHeader, CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilXCircle, cilCamera } from '@coreui/icons'

const QRScanner = ({ onScanSuccess, onScanError }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [error, setError] = useState(null)
  const [cameras, setCameras] = useState([])
  const [selectedCamera, setSelectedCamera] = useState(null)
  const html5QrCodeRef = useRef(null)

  // Obtener cámaras disponibles
  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0) {
          setCameras(devices)
          // Preferir cámara trasera en móviles
          const backCamera = devices.find(
            (dev) =>
              dev.label.toLowerCase().includes('back') ||
              dev.label.toLowerCase().includes('trasera') ||
              dev.label.toLowerCase().includes('rear'),
          )
          setSelectedCamera(backCamera ? backCamera.id : devices[0].id)
        }
      })
      .catch((err) => {
        console.error('Error obteniendo cámaras:', err)
        setError('No se pudieron detectar cámaras')
      })

    return () => {
      stopScanning()
    }
  }, [])

  const lastScannedCodeRef = useRef(null)
  const lastScanTimeRef = useRef(0)

  const startScanning = async () => {
    if (!selectedCamera) {
      setError('No hay cámara seleccionada')
      return
    }

    setIsScanning(true)
    setError(null)
    setScanResult(null)
    lastScannedCodeRef.current = null

    try {
      html5QrCodeRef.current = new Html5Qrcode('qr-reader')

      await html5QrCodeRef.current.start(
        selectedCamera,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText, decodedResult) => {
          const now = Date.now()
          // Evitar escaneos duplicados en un corto periodo (e.g., 2 segundos)
          if (decodedText === lastScannedCodeRef.current && now - lastScanTimeRef.current < 2000) {
            return
          }

          lastScannedCodeRef.current = decodedText
          lastScanTimeRef.current = now

          // Escaneo exitoso
          console.log('QR Escaneado:', decodedText)
          setScanResult({ success: true, data: decodedText })

          // Detener escaneo inmediatamente
          stopScanning()

          if (onScanSuccess) {
            onScanSuccess(decodedText)
          }
        },
        (errorMessage) => {
          // Error de escaneo (se ejecuta constantemente, no mostrar)
        },
      )
    } catch (err) {
      console.error('Error al iniciar scanner:', err)
      setError(`Error al iniciar cámara: ${err.message}`)
      setIsScanning(false)
    }
  }

  const stopScanning = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop()
        }
        html5QrCodeRef.current.clear()
      } catch (err) {
        console.error('Error al detener scanner:', err)
      }
    }
    setIsScanning(false)
  }

  return (
    <CCard>
      <CCardHeader className="bg-primary text-white">
        <h5 className="mb-0">
          <CIcon icon={cilCamera} className="me-2" />
          Escanear QR del Carnet
        </h5>
      </CCardHeader>
      <CCardBody>
        {/* Selector de cámara */}
        {cameras.length > 1 && (
          <div className="mb-3">
            <label className="form-label">Seleccionar Cámara:</label>
            <select
              className="form-select"
              value={selectedCamera || ''}
              onChange={(e) => setSelectedCamera(e.target.value)}
              disabled={isScanning}
            >
              {cameras.map((camera) => (
                <option key={camera.id} value={camera.id}>
                  {camera.label || `Cámara ${camera.id}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Área de escaneo */}
        <div
          id="qr-reader"
          style={{
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
            display: isScanning ? 'block' : 'none',
          }}
        />

        {/* Botones de control */}
        <div className="text-center mt-3">
          {!isScanning ? (
            <CButton color="success" size="lg" onClick={startScanning}>
              <CIcon icon={cilCamera} className="me-2" />
              Iniciar Escaneo
            </CButton>
          ) : (
            <CButton color="danger" size="lg" onClick={stopScanning}>
              Detener Escaneo
            </CButton>
          )}
        </div>

        {/* Resultado del escaneo */}
        {scanResult && (
          <CAlert color="success" className="mt-3">
            <CIcon icon={cilCheckCircle} className="me-2" />
            <strong>¡QR Escaneado!</strong> {scanResult.data}
          </CAlert>
        )}

        {/* Errores */}
        {error && (
          <CAlert color="danger" className="mt-3">
            <CIcon icon={cilXCircle} className="me-2" />
            {error}
          </CAlert>
        )}
      </CCardBody>
    </CCard>
  )
}

export default QRScanner
