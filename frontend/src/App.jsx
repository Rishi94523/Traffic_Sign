import React from 'react'
import ImageUpload from './components/ImageUpload'
import ImagePreview from './components/ImagePreview'
import ClassificationResult from './components/ClassificationResult'
import ErrorDisplay from './components/ErrorDisplay'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'

function App() {
  const [uploadedImage, setUploadedImage] = React.useState(null)
  const [classificationResult, setClassificationResult] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState('READY')

  const handleImageUpload = (image) => {
    setUploadedImage(image)
    setError(null)
    setClassificationResult(null)
    setStatus('IMAGE LOADED')
  }

  const handleClassification = (result) => {
    setClassificationResult(result)
    setError(null)
    setStatus('CLASSIFIED')
  }

  const handleError = (errorMessage) => {
    setError(errorMessage)
    setClassificationResult(null)
    setStatus('ERROR')
  }

  const handleReset = () => {
    setUploadedImage(null)
    setClassificationResult(null)
    setError(null)
    setStatus('READY')
  }

  return (
    <div className="brutal-app">
      {/* HEADER SECTION */}
      <header className="brutal-header">
        <div className="brutal-container">
          <h1 className="brutal-title">
            ROAD-SIGN IMAGE CLASSIFICATION INTERFACE
          </h1>
          <p className="brutal-subtitle">
            UPLOAD A ROAD SIGN IMAGE TO CLASSIFY ITS TYPE
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="brutal-main">
        {/* UPLOAD SECTION */}
        <section className="brutal-section">
          <div className="brutal-card">
            {/* Upload Header */}
            <div className="brutal-card-header">
              <h2 className="brutal-card-title">IMAGE UPLOAD</h2>
              <div className="brutal-status-badge" id="statusIndicator">
                {status}
              </div>
            </div>

            {/* Upload Area */}
            <ImageUpload 
              onUpload={handleImageUpload}
              onError={handleError}
              loading={loading}
              setLoading={setLoading}
            />

            {/* Validation Messages */}
            {error && <ErrorDisplay error={error} />}

            {/* Image Preview */}
            {uploadedImage && (
              <ImagePreview 
                image={uploadedImage}
                onClassify={handleClassification}
                onError={handleError}
                loading={loading}
                setLoading={setLoading}
                onReset={handleReset}
              />
            )}
          </div>
        </section>

        {/* CLASSIFICATION RESULTS PANEL */}
        {classificationResult && (
          <section className="brutal-section">
            <ClassificationResult result={classificationResult} />
          </section>
        )}

        {/* SYSTEM STATUS */}
        <section className="brutal-section">
          <div className="brutal-status-card">
            <h3 className="brutal-status-title">SYSTEM STATUS</h3>
            <div className="brutal-status-grid">
              <div className="brutal-status-item">
                <div className="brutal-status-label">MODEL STATUS</div>
                <div className="brutal-status-value">ONLINE</div>
              </div>
              <div className="brutal-status-item">
                <div className="brutal-status-label">CLASSES</div>
                <div className="brutal-status-value">15 ROAD SIGN TYPES</div>
              </div>
              <div className="brutal-status-item">
                <div className="brutal-status-label">VERSION</div>
                <div className="brutal-status-value">V1.0</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER SECTION */}
      <footer className="brutal-footer">
        <div className="brutal-container">
          <div className="brutal-footer-content">
            <div className="brutal-footer-text">
              DEVELOPED BY RISHI, PREETHAM, RAIHAN, RHRISHI
            </div>
            <div className="brutal-footer-version">VERSION 1.0</div>
          </div>
          <div className="brutal-footer-security">
            ALL COMMUNICATION SECURED VIA HTTPS (TLS 1.2+)
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
