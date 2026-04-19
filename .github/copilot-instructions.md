# OS Algorithm Simulator - Development Guidelines

## Project Overview
This is a React + Vite + TypeScript web application that simulates Operating System algorithms with interactive visualizations and performance analysis tools.

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with glass-morphism theme
- **Routing**: React Router v6
- **Charts**: Recharts
- **Package Manager**: npm

## Project Structure
```
src/
├── algorithms/
│   ├── cpu/          # CPU scheduling algorithms
│   ├── memory/       # Memory management algorithms
│   └── deadlock/     # Deadlock algorithms
├── components/
│   ├── charts/       # Visualization components
│   └── *             # Reusable UI components
├── pages/            # Application pages
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
The application will be available at `http://localhost:5173/`

### Build
```bash
npm run build
```

## Features Implemented

### 1. CPU Scheduling Module
- ✅ 6 algorithms: FCFS, SJF (NP/P), Priority (NP/P), Round Robin
- ✅ Interactive input table with add/delete/reset
- ✅ Gantt chart visualization
- ✅ Detailed metrics calculation (WT, TAT, RT)
- ✅ Sample data loader

### 2. Memory Management Module
- ✅ Memory Allocation (First Fit, Best Fit)
- ✅ Page Replacement (FIFO, LRU)
- ✅ Tabbed interface
- ✅ Real-time frame visualization
- ✅ Hit/miss ratio calculations

### 3. Deadlock Module
- ✅ Banker's Algorithm
- ✅ Deadlock Detection
- ✅ Dynamic matrix input
- ✅ Safe sequence identification
- ✅ Need matrix calculation

### 4. Performance Analyzer
- ✅ Multi-algorithm comparison
- ✅ Bar chart visualizations
- ✅ Detailed metrics table
- ✅ Algorithm recommendations

### 5. Dashboard & Navigation
- ✅ Summary statistics cards
- ✅ Feature overview
- ✅ Sidebar navigation
- ✅ Responsive layout

### 6. UI/UX
- ✅ Dark glass-morphism theme
- ✅ Smooth animations
- ✅ Mobile responsive
- ✅ Custom components
- ✅ Tailwind CSS styling

## Code Organization Rules

### Algorithm Files
- Keep algorithm logic in `/src/algorithms/` folders
- Each algorithm should be pure and testable
- Use TypeScript interfaces from `/src/types/`
- Return structured result objects

### UI Components
- Store reusable components in `/src/components/`
- Use Card for consistent styling
- Implement dark theme colors
- Add proper TypeScript types

### Pages
- One file per page in `/src/pages/`
- Use Layout component for consistency
- Handle state locally in pages
- Import components and algorithms

### Type Definitions
- All types in `/src/types/index.ts`
- Keep types organized by feature
- Use interfaces for object shapes
- Export all public types

## Development Best Practices

1. **TypeScript**: Always use proper types
2. **Components**: Keep them reusable and focused
3. **Styling**: Use Tailwind classes, avoid inline styles
4. **Colors**: Use theme colors from PRD
5. **Testing**: Test algorithms with sample data
6. **Performance**: Use React.memo for expensive components

## Theme Colors (Tailwind-ready)
- Background: `bg-[#0B1120]`
- Card: `bg-white/10` (glass effect)
- Primary: `bg-primary` (blue-500)
- Accent: `bg-accent` (purple-500)
- Text: `text-white`
- Muted: `text-gray-400`
- Success: `text-success` (green-500)
- Warning: `text-warning` (amber-500)

## Common Tasks

### Adding a New Algorithm
1. Create function in appropriate `/src/algorithms/` file
2. Add types to `/src/types/index.ts`
3. Implement in corresponding page
4. Add to comparison if applicable
5. Test with sample data

### Creating a New Page
1. Create file in `/src/pages/`
2. Use `Layout` component wrapper
3. Import necessary components
4. Add route in `/src/App.tsx`
5. Add navigation item in Layout

### Styling New Component
1. Use Tailwind CSS classes
2. Apply theme colors
3. Use rounded-2xl for cards
4. Add hover effects
5. Ensure dark theme compliant

## Debugging Tips

- Check console for errors
- Use TypeScript strict mode
- Validate input data before processing
- Test algorithms with edge cases
- Check responsive design at different breakpoints

## Performance Notes

- Build includes code splitting
- Recharts lazy loads chart library
- CSS is optimized with Tailwind's JIT
- JavaScript is minified for production

## Future Enhancements

- PDF/CSV export functionality
- More detailed algorithm explanations
- Interactive algorithm learning mode
- Custom algorithm builder
- Performance benchmarking tools
- Collaborative features
