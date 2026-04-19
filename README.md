# Interactive OS Algorithm Simulator & Performance Analyzer

A modern, interactive web application for simulating and analyzing Operating System algorithms. Designed for students, faculty, and anyone learning OS concepts.

## 🎯 Features

### CPU Scheduling Simulator
- **6 Algorithms**: FCFS, SJF (Non-Preemptive & Preemptive), Priority (Non-Preemptive & Preemptive), Round Robin
- **Visual Gantt Charts**: See process execution timeline
- **Detailed Metrics**: Waiting Time, Turnaround Time, Response Time, Completion Time
- **Interactive Input**: Add/edit processes with custom timing
- **Sample Data**: Quick start with pre-configured examples

### Memory Management Simulator
- **Memory Allocation**: First Fit and Best Fit algorithms
- **Page Replacement**: FIFO and LRU algorithms
- **Real-time Visualization**: See memory frames update step by step
- **Performance Metrics**: Hit ratio, miss rate, fragmentation
- **Custom Configuration**: Adjust memory blocks and process sizes

### Deadlock Detection & Avoidance
- **Banker's Algorithm**: Check system safety state
- **Deadlock Detection**: Identify deadlocked processes
- **Dynamic Matrix Input**: Configure custom resource scenarios
- **Safe Sequence**: View safe ordering of processes
- **Need Matrix**: Automatic calculation of resource needs

### Performance Analyzer
- **Algorithm Comparison**: Compare all CPU scheduling algorithms
- **Visual Charts**: Bar and line charts for metrics
- **Efficiency Scoring**: See which algorithm performs best
- **Recommendations**: Get suggestions based on your data

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
git clone <repository-url>
cd OS-Project
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

## 📋 Prerequisites for Different Modules

### CPU Scheduling
- Process arrival times
- Process burst times
- Priority values (for priority algorithms)
- Time quantum (for round robin)

### Memory Management
- Memory block sizes
- Process sizes
- Number of frames (for page replacement)
- Reference string (for page replacement)

### Deadlock
- Allocation matrix
- Max matrix
- Available resources
- Request matrix (for detection)

## 🎓 Learning Outcomes

### CPU Scheduling
- Understand different scheduling strategies
- Compare fairness and efficiency
- Analyze impact of time quantum
- See effects of process priorities

### Memory Management
- Learn allocation strategies
- Compare fragmentation levels
- Understand page faults
- Analyze hit ratios

### Deadlock
- Check system safety
- Identify deadlock states
- Understand resource needs
- Find safe sequences

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS | Styling |
| React Router | Navigation |
| Recharts | Data visualization |

## 📁 Project Structure

```
src/
├── algorithms/           # Algorithm implementations
│   ├── cpu/             # CPU scheduling algorithms
│   ├── memory/          # Memory management algorithms
│   └── deadlock/        # Deadlock algorithms
├── components/          # Reusable React components
│   ├── charts/          # Chart and visualization components
│   └── *.tsx            # UI components (Button, Card, Input, etc.)
├── pages/               # Application pages
│   ├── Dashboard.tsx
│   ├── CPUScheduling.tsx
│   ├── MemoryManagement.tsx
│   ├── Deadlock.tsx
│   ├── PerformanceAnalyzer.tsx
│   └── About.tsx
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🎨 Design

### Theme
- **Dark Glassmorphism**: Modern dark theme with frosted glass effect cards
- **Color Palette**: 
  - Primary Blue: `#3B82F6`
  - Accent Purple: `#8B5CF6`
  - Success Green: `#10B981`
  - Warning Amber: `#F59E0B`

### UI Components
- **Sidebar Navigation**: Easy access to all modules
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Glass Cards**: Semi-transparent cards with backdrop blur
- **Smooth Animations**: Hover effects and transitions

## 📊 Algorithms Implemented

### CPU Scheduling (6 algorithms)
1. **FCFS** - First Come First Served
2. **SJF Non-Preemptive** - Shortest Job First
3. **SJF Preemptive** - Preemptive Shortest Job First
4. **Priority Non-Preemptive** - Priority-based scheduling
5. **Priority Preemptive** - Preemptive priority
6. **Round Robin** - Time-slice based scheduling

### Memory Management (4 algorithms)
1. **First Fit** - Allocate in first suitable block
2. **Best Fit** - Allocate in smallest suitable block
3. **FIFO** - First In First Out page replacement
4. **LRU** - Least Recently Used page replacement

### Deadlock (2 algorithm implementations)
1. **Banker's Algorithm** - Deadlock avoidance
2. **Deadlock Detection** - Identify deadlock states

## 💡 Usage Examples

### Example 1: CPU Scheduling
1. Go to CPU Scheduling page
2. Click "Load Sample Data" or enter custom processes
3. Select an algorithm
4. Click "Run Simulation"
5. View Gantt chart and metrics
6. Compare different algorithms in Performance Analyzer

### Example 2: Memory Management
1. Go to Memory Management page
2. Choose "Memory Allocation" or "Page Replacement" tab
3. Load sample data or customize
4. Run simulation
5. View allocation results or frame states

### Example 3: Deadlock Analysis
1. Go to Deadlock page
2. Set up allocation and max matrices
3. Choose Banker's Algorithm or Detection
4. Run analysis
5. Check if system is safe

## 🎓 Educational Use

### For Students
- Learn by doing: Interactive simulations
- Visual feedback: See how algorithms work
- Test understanding: Try different inputs
- Compare approaches: Benchmark algorithms

### For Faculty
- Teaching tool: Display visualizations
- Demonstration: Show algorithm behavior
- Assignment: Have students test scenarios
- Research: Analyze algorithm performance

## 📈 Performance Notes

- **Fast Rendering**: Vite provides instant HMR
- **Optimized Build**: 600KB+ minified (includes all visualization libraries)
- **No Backend**: Runs entirely in the browser
- **Responsive**: Optimized for all screen sizes

## 🔧 Development

### Adding New Features
1. Create algorithm file in `/src/algorithms/`
2. Add TypeScript types to `/src/types/index.ts`
3. Create page component in `/src/pages/`
4. Add navigation in Layout component
5. Test thoroughly with sample data

### Code Quality
- TypeScript strict mode enabled
- ESLint configured
- No console errors
- Clean, reusable components

## 📝 License

This project is intended for educational purposes.

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Improve documentation
- Add new algorithms
- Enhance visualizations

## 📞 Support

For issues or questions:
1. Check the About page for detailed information
2. Review sample data examples
3. Check console for error messages
4. Test with simpler inputs first

## 🙏 Acknowledgments

Built as an educational tool for Operating System algorithm learning and visualization.

---

**Last Updated**: April 2026  
**Version**: 1.0.0
