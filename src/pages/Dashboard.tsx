import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'CPU Scheduling',
      description: '6 algorithms: FCFS, SJF, Priority, Round Robin',
      icon: '⚡',
      path: '/cpu-scheduling'
    },
    {
      title: 'Memory Management',
      description: 'Memory allocation & page replacement algorithms',
      icon: '💾',
      path: '/memory-management'
    },
    {
      title: 'Deadlock Detection',
      description: 'Banker\'s Algorithm & Deadlock Detection',
      icon: '🔗',
      path: '/deadlock'
    },
    {
      title: 'Performance Analysis',
      description: 'Compare algorithm performance with charts',
      icon: '📈',
      path: '/performance-analyzer'
    }
  ];

  return (
    <Layout title="Dashboard" subtitle="OS Algorithm Simulator & Performance Analyzer">
      <div className="space-y-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Algorithms"
            value="14"
            icon="🧮"
            color="blue"
          />
          <StatCard
            title="CPU Algorithms"
            value="6"
            icon="⚡"
            color="purple"
          />
          <StatCard
            title="Memory Algorithms"
            value="4"
            icon="💾"
            color="green"
          />
          <StatCard
            title="Deadlock Algorithms"
            value="4"
            icon="🔗"
            color="orange"
          />
        </div>

        {/* Welcome Section */}
        <Card className="p-8 bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
          <h3 className="text-2xl font-bold text-white mb-3">Welcome to OS Simulator</h3>
          <p className="text-gray-300 mb-6">
            An interactive platform to learn and visualize Operating System algorithms. Simulate various CPU scheduling, memory management, and deadlock algorithms with custom inputs and visual outputs.
          </p>
          <Button
            onClick={() => navigate('/cpu-scheduling')}
            size="lg"
          >
            Get Started →
          </Button>
        </Card>

        {/* Feature Cards */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Available Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.path}
                className="p-6 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => navigate(feature.path)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      {feature.description}
                    </p>
                    <Button variant="ghost" size="sm">
                      Explore →
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h4 className="text-lg font-semibold text-white mb-3">📚 For Students</h4>
            <p className="text-gray-400 text-sm">
              Learn OS concepts interactively with visual simulations and detailed metrics.
            </p>
          </Card>
          <Card className="p-6">
            <h4 className="text-lg font-semibold text-white mb-3">👨‍🏫 For Faculty</h4>
            <p className="text-gray-400 text-sm">
              Use as a teaching tool to explain complex algorithms visually to your class.
            </p>
          </Card>
          <Card className="p-6">
            <h4 className="text-lg font-semibold text-white mb-3">⚡ Real-time Analysis</h4>
            <p className="text-gray-400 text-sm">
              Get instant results and compare multiple algorithms side by side.
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
