import React from 'react'
import ImageUpload from './components/ImageUpload'
import ImagePreview from './components/ImagePreview'
import ClassificationResult from './components/ClassificationResult'
import ErrorDisplay from './components/ErrorDisplay'
import './App.css'

function App() {
  const [uploadedImage, setUploadedImage] = React.useState(null)
  const [classificationResult, setClassificationResult] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const handleImageUpload = (image) => {
    setUploadedImage(image)
    setError(null)
    setClassificationResult(null)
  }

  const handleClassification = (result) => {
    setClassificationResult(result)
    setError(null)
  }

  const handleError = (errorMessage) => {
    setError(errorMessage)
    setClassificationResult(null)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Road Sign Classification</h1>
        <p>Upload a road sign image to classify it</p>
      </header>

      <main className="App-main">
        <ImageUpload 
          onUpload={handleImageUpload}
          onError={handleError}
          loading={loading}
          setLoading={setLoading}
        />

        {error && <ErrorDisplay error={error} />}

        {uploadedImage && (
          <ImagePreview 
            image={uploadedImage}
            onClassify={handleClassification}
            onError={handleError}
            loading={loading}
            setLoading={setLoading}
          />
        )}

        {classificationResult && (
          <ClassificationResult result={classificationResult} />
        )}
      </main>
    </div>
  )
}

export default App

