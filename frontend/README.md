# Frontend - Road Sign Classification

React + Vite frontend for the Road Sign Classification project.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Or with yarn
yarn install
```

### Running the Development Server

```bash
npm run dev

# Or with yarn
yarn dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/          # React components
│   │   ├── ImageUpload.jsx       # Upload component (RSCI-4,16)
│   │   ├── ImagePreview.jsx      # Preview component (RSCI-8)
│   │   ├── ClassificationResult.jsx  # Results display (RSCI-12,13)
│   │   └── ErrorDisplay.jsx       # Error handling (RSCI-9,14)
│   ├── api/
│   │   └── classificationAPI.js  # API client (RSCI-10)
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── package.json
└── vite.config.js          # Vite configuration
```

## 🔧 Configuration

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

## 📝 Development Notes

- Uses Vite for fast development and building
- API calls are configured to proxy to backend on port 8000
- Currently using placeholder/stubbed API responses
- Real API integration will be completed in RSCI-10

## 🧪 Testing

TODO: Add testing setup (Jest, React Testing Library)

