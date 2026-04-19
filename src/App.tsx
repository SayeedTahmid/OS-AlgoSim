import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CPUScheduling from './pages/CPUScheduling';
import MemoryManagement from './pages/MemoryManagement';
import Deadlock from './pages/Deadlock';
import PerformanceAnalyzer from './pages/PerformanceAnalyzer';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cpu-scheduling" element={<CPUScheduling />} />
        <Route path="/memory-management" element={<MemoryManagement />} />
        <Route path="/deadlock" element={<Deadlock />} />
        <Route path="/performance-analyzer" element={<PerformanceAnalyzer />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
