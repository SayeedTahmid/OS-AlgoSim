import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import CPUScheduling from './pages/CPUScheduling.tsx';
import MemoryManagement from './pages/MemoryManagement.tsx';
import Deadlock from './pages/Deadlock.tsx';
import PerformanceAnalyzer from './pages/PerformanceAnalyzer.tsx';
import About from './pages/About.tsx';

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
