import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MenuBar from './components/MenuBar.jsx'

createRoot(document.getElementById('root')).render(
    <div>
        <App />
    </div>
)
