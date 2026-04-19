import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';

const About: React.FC = () => {
  return (
    <Layout title="About" subtitle="Project information and details">
      <div className="space-y-8 max-w-4xl">
        {/* Project Overview */}
        <Card className="p-8 bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
          <h2 className="text-2xl font-bold text-white mb-4">Interactive OS Algorithm Simulator</h2>
          <p className="text-gray-300 leading-relaxed">
            An educational platform designed to help students and faculty understand core Operating System
            algorithms through interactive simulations, visual outputs, and real-time performance analysis.
          </p>
        </Card>

        {/* Features */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">📚 Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-blue-400 mb-3">⚡ CPU Scheduling</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>✓ FCFS (First Come First Served)</li>
                <li>✓ SJF - Non Preemptive</li>
                <li>✓ SJF - Preemptive</li>
                <li>✓ Priority - Non Preemptive</li>
                <li>✓ Priority - Preemptive</li>
                <li>✓ Round Robin</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h4 className="text-lg font-semibold text-purple-400 mb-3">💾 Memory Management</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>✓ Memory Allocation</li>
                <li>  - First Fit</li>
                <li>  - Best Fit</li>
                <li>✓ Page Replacement</li>
                <li>  - FIFO</li>
                <li>  - LRU (Least Recently Used)</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h4 className="text-lg font-semibold text-green-400 mb-3">🔗 Deadlock Handling</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>✓ Banker's Algorithm</li>
                <li>✓ Deadlock Detection</li>
                <li>✓ Safe State Analysis</li>
                <li>✓ Need Matrix Calculation</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h4 className="text-lg font-semibold text-yellow-400 mb-3">📈 Performance Tools</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>✓ Algorithm Comparison</li>
                <li>✓ Metrics Visualization</li>
                <li>✓ Gantt Charts</li>
                <li>✓ Real-time Analysis</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">🛠️ Technology Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h4 className="font-semibold text-white mb-4">Frontend</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>React 18</li>
                <li>TypeScript</li>
                <li>Vite</li>
                <li>React Router</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-white mb-4">Styling</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Tailwind CSS</li>
                <li>Glass Morphism</li>
                <li>Dark Theme</li>
                <li>Responsive Design</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold text-white mb-4">Visualization</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Recharts</li>
                <li>Custom Components</li>
                <li>Gantt Charts</li>
                <li>Real-time Rendering</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Target Users */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">👥 Ideal For</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-primary mb-3">👨‍🎓 Students</h4>
              <p className="text-gray-400 text-sm">
                Learn OS concepts interactively with visual simulations. Test different algorithms and
                understand how they behave with various inputs.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="text-lg font-semibold text-accent mb-3">👨‍🏫 Faculty</h4>
              <p className="text-gray-400 text-sm">
                Use as a powerful teaching tool to explain complex algorithms to your class. Show real-time
                visualizations and performance comparisons.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="text-lg font-semibold text-success mb-3">📋 Exams & Preparation</h4>
              <p className="text-gray-400 text-sm">
                Practice OS algorithms and understand their behavior. Get instant feedback on your inputs
                and detailed metrics for analysis.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="text-lg font-semibold text-warning mb-3">⚙️ Researchers</h4>
              <p className="text-gray-400 text-sm">
                Analyze and compare algorithm performance across different scenarios. Export data for further
                analysis and experimentation.
              </p>
            </Card>
          </div>
        </div>

        {/* Learning Outcomes */}
        <Card className="p-8">
          <h3 className="text-2xl font-bold text-white mb-6">🎯 Learning Outcomes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Understand</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>✓ CPU scheduling algorithms</li>
                <li>✓ Memory management techniques</li>
                <li>✓ Deadlock avoidance & detection</li>
                <li>✓ Performance metrics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Analyze</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>✓ Compare algorithm performance</li>
                <li>✓ Evaluate trade-offs</li>
                <li>✓ Assess system behavior</li>
                <li>✓ Make design decisions</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Project Details */}
        <Card className="p-8 border-blue-500/30 bg-blue-500/5">
          <h3 className="text-2xl font-bold text-white mb-4">📖 Project Details</h3>
          <div className="space-y-4 text-gray-300 text-sm">
            <p>
              <span className="font-semibold">Version:</span> 1.0.0
            </p>
            <p>
              <span className="font-semibold">Type:</span> Educational Web Application
            </p>
            <p>
              <span className="font-semibold">Purpose:</span> Interactive learning and visualization of OS algorithms
            </p>
            <p>
              <span className="font-semibold">Target Audience:</span> CS students, faculty, and OS enthusiasts
            </p>
            <p>
              <span className="font-semibold">Deployment:</span> Web-based, no backend required
            </p>
          </div>
        </Card>

        {/* Additional Resources */}
        <Card className="p-8">
          <h3 className="text-2xl font-bold text-white mb-6">📚 Additional Resources</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Algorithm References</h4>
              <p className="text-gray-400 text-sm">
                Each algorithm includes detailed explanations, time complexities, and real-world use cases
                to help you understand when and why to use each approach.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Sample Data</h4>
              <p className="text-gray-400 text-sm">
                Load pre-configured sample datasets to quickly test algorithms without manually entering data.
                Perfect for quick demonstrations and learning.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Performance Metrics</h4>
              <p className="text-gray-400 text-sm">
                Understand key metrics like waiting time, turnaround time, response time, and page faults.
                Each metric is explained to help you interpret the results.
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            © 2024 Interactive OS Algorithm Simulator. Built with ❤️ for education.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
