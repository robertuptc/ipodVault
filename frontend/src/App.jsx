import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';

// Context
import AppContent from './context/AppContent';
import AppProviders from './context/AppProviders';

function App() {
  return (
    <AppProviders>
        <Router>
          <AppContent />
        </Router>
    </AppProviders>
  )
}

export default App
