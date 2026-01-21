import React, { useState, useRef } from 'react'
import { CButton, CSpinner, CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCamera, cilTrash, cilCheckCircle, cilWarning } from '@coreui/icons'
import PropTypes from 'prop-types'

const ImageUpload = ({
  currentImageUrl,
  onUpload,
  onDelete,
  maxSize = 5, // MB
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'],
}) => {
  const [preview, setPreview] = useState(currentImageUrl)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validar tipo de archivo
    if (!acceptedFormats.includes(file.type)) {
      setError('Solo se permiten imágenes JPG, PNG o WEBP')
      return
    }

    // Validar tamaño
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSize) {
      setError(`La imagen no debe superar ${maxSize}MB`)
      return
    }

    setError(null)
    setUploading(true)

    try {
      // Crear preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)

      // Subir archivo
      await onUpload(file)
    } catch (err) {
      setError(err.message || 'Error al subir la imagen')
      setPreview(currentImageUrl) // Revertir preview
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('¿Está seguro de eliminar la foto?')) return

    setUploading(true)
    setError(null)

    try {
      await onDelete()
      setPreview(null)
    } catch (err) {
      setError(err.message || 'Error al eliminar la imagen')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="image-upload-container">
      <div className="text-center mb-3">
        <div
          className="image-preview-wrapper mx-auto"
          style={{
            width: '200px',
            height: '200px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            position: 'relative',
          }}
        >
          {uploading && (
            <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75">
              <CSpinner color="primary" />
            </div>
          )}
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={() => setPreview(null)}
            />
          ) : (
            <div className="text-muted">
              <CIcon icon={cilCamera} size="3xl" />
              <div className="mt-2 small">Sin foto</div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <CAlert color="danger" className="d-flex align-items-center mb-3">
          <CIcon icon={cilWarning} className="me-2" />
          {error}
        </CAlert>
      )}

      <div className="d-flex gap-2 justify-content-center">
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        <CButton color="primary" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
          <CIcon icon={cilCamera} className="me-2" />
          {preview ? 'Cambiar Foto' : 'Subir Foto'}
        </CButton>

        {preview && (
          <CButton color="danger" onClick={handleDelete} disabled={uploading}>
            <CIcon icon={cilTrash} className="me-2" />
            Eliminar
          </CButton>
        )}
      </div>

      <div className="text-center mt-2">
        <small className="text-muted">Formatos: JPG, PNG, WEBP | Máximo: {maxSize}MB</small>
      </div>
    </div>
  )
}

ImageUpload.propTypes = {
  currentImageUrl: PropTypes.string,
  onUpload: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  maxSize: PropTypes.number,
  acceptedFormats: PropTypes.arrayOf(PropTypes.string),
}

export default ImageUpload
