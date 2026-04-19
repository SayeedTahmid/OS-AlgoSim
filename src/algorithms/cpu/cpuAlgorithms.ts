import { Process, ScheduleResult, CPUMetrics, CPUResults } from '../../types';

export const cpuAlgorithms = {
  // First Come First Served
  fcfs: (processes: Process[]): CPUResults => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const schedule: ScheduleResult[] = [];
    const metrics: Record<string, CPUMetrics> = {};
    let currentTime = 0;

    sorted.forEach(process => {
      const startTime = Math.max(currentTime, process.arrivalTime);
      const endTime = startTime + process.burstTime;
      
      schedule.push({
        processId: process.id,
        startTime,
        endTime
      });

      metrics[process.id] = {
        completionTime: endTime,
        waitingTime: startTime - process.arrivalTime,
        turnaroundTime: endTime - process.arrivalTime,
        responseTime: startTime - process.arrivalTime
      };

      currentTime = endTime;
    });

    const avgWaitingTime = Object.values(metrics).reduce((sum, m) => sum + m.waitingTime, 0) / processes.length;
    const avgTurnaroundTime = Object.values(metrics).reduce((sum, m) => sum + m.turnaroundTime, 0) / processes.length;

    return { schedule, metrics, avgWaitingTime, avgTurnaroundTime };
  },

  // Shortest Job First - Non Preemptive
  sjfNonPreemptive: (processes: Process[]): CPUResults => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const schedule: ScheduleResult[] = [];
    const metrics: Record<string, CPUMetrics> = {};
    const completed = new Set<string>();
    let currentTime = 0;

    while (completed.size < sorted.length) {
      const available = sorted.filter(p => !completed.has(p.id) && p.arrivalTime <= currentTime);
      
      if (available.length === 0) {
        const nextProcess = sorted.find(p => !completed.has(p.id));
        if (nextProcess) currentTime = nextProcess.arrivalTime;
        continue;
      }

      const shortest = available.reduce((min, p) => p.burstTime < min.burstTime ? p : min);
      const startTime = currentTime;
      const endTime = startTime + shortest.burstTime;

      schedule.push({
        processId: shortest.id,
        startTime,
        endTime
      });

      metrics[shortest.id] = {
        completionTime: endTime,
        waitingTime: startTime - shortest.arrivalTime,
        turnaroundTime: endTime - shortest.arrivalTime,
        responseTime: startTime - shortest.arrivalTime
      };

      completed.add(shortest.id);
      currentTime = endTime;
    }

    const avgWaitingTime = Object.values(metrics).reduce((sum, m) => sum + m.waitingTime, 0) / processes.length;
    const avgTurnaroundTime = Object.values(metrics).reduce((sum, m) => sum + m.turnaroundTime, 0) / processes.length;

    return { schedule, metrics, avgWaitingTime, avgTurnaroundTime };
  },

  // Shortest Job First - Preemptive
  sjfPreemptive: (processes: Process[]): CPUResults => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const schedule: ScheduleResult[] = [];
    const metrics: Record<string, CPUMetrics> = {};
    const remaining: Record<string, number> = {};
    const responseTime: Record<string, number> = {};
    let currentTime = 0;

    sorted.forEach(p => {
      remaining[p.id] = p.burstTime;
    });

    while (Object.values(remaining).some(r => r > 0)) {
      const available = sorted.filter(p => p.arrivalTime <= currentTime && remaining[p.id] > 0);
      
      if (available.length === 0) {
        const nextProcess = sorted.find(p => remaining[p.id] > 0);
        if (nextProcess) currentTime = nextProcess.arrivalTime;
        continue;
      }

      const shortest = available.reduce((min, p) => remaining[p.id] < remaining[min.id] ? p : min);
      
      if (responseTime[shortest.id] === undefined) {
        responseTime[shortest.id] = currentTime - shortest.arrivalTime;
      }

      const endTime = currentTime + 1;
      schedule.push({
        processId: shortest.id,
        startTime: currentTime,
        endTime
      });

      remaining[shortest.id]--;
      currentTime = endTime;

      if (remaining[shortest.id] === 0) {
        metrics[shortest.id] = {
          completionTime: endTime,
          waitingTime: endTime - shortest.arrivalTime - shortest.burstTime,
          turnaroundTime: endTime - shortest.arrivalTime,
          responseTime: responseTime[shortest.id]
        };
      }
    }

    const avgWaitingTime = Object.values(metrics).reduce((sum, m) => sum + m.waitingTime, 0) / processes.length;
    const avgTurnaroundTime = Object.values(metrics).reduce((sum, m) => sum + m.turnaroundTime, 0) / processes.length;

    return { schedule, metrics, avgWaitingTime, avgTurnaroundTime };
  },

  // Priority Non Preemptive
  priorityNonPreemptive: (processes: Process[]): CPUResults => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const schedule: ScheduleResult[] = [];
    const metrics: Record<string, CPUMetrics> = {};
    const completed = new Set<string>();
    let currentTime = 0;

    while (completed.size < sorted.length) {
      const available = sorted.filter(p => !completed.has(p.id) && p.arrivalTime <= currentTime);
      
      if (available.length === 0) {
        const nextProcess = sorted.find(p => !completed.has(p.id));
        if (nextProcess) currentTime = nextProcess.arrivalTime;
        continue;
      }

      const highest = available.reduce((max, p) => (p.priority || 0) > (max.priority || 0) ? p : max);
      const startTime = currentTime;
      const endTime = startTime + highest.burstTime;

      schedule.push({
        processId: highest.id,
        startTime,
        endTime
      });

      metrics[highest.id] = {
        completionTime: endTime,
        waitingTime: startTime - highest.arrivalTime,
        turnaroundTime: endTime - highest.arrivalTime,
        responseTime: startTime - highest.arrivalTime
      };

      completed.add(highest.id);
      currentTime = endTime;
    }

    const avgWaitingTime = Object.values(metrics).reduce((sum, m) => sum + m.waitingTime, 0) / processes.length;
    const avgTurnaroundTime = Object.values(metrics).reduce((sum, m) => sum + m.turnaroundTime, 0) / processes.length;

    return { schedule, metrics, avgWaitingTime, avgTurnaroundTime };
  },

  // Priority Preemptive
  priorityPreemptive: (processes: Process[]): CPUResults => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const schedule: ScheduleResult[] = [];
    const metrics: Record<string, CPUMetrics> = {};
    const remaining: Record<string, number> = {};
    const responseTime: Record<string, number> = {};
    let currentTime = 0;

    sorted.forEach(p => {
      remaining[p.id] = p.burstTime;
    });

    while (Object.values(remaining).some(r => r > 0)) {
      const available = sorted.filter(p => p.arrivalTime <= currentTime && remaining[p.id] > 0);
      
      if (available.length === 0) {
        const nextProcess = sorted.find(p => remaining[p.id] > 0);
        if (nextProcess) currentTime = nextProcess.arrivalTime;
        continue;
      }

      const highest = available.reduce((max, p) => (p.priority || 0) > (max.priority || 0) ? p : max);
      
      if (responseTime[highest.id] === undefined) {
        responseTime[highest.id] = currentTime - highest.arrivalTime;
      }

      const endTime = currentTime + 1;
      schedule.push({
        processId: highest.id,
        startTime: currentTime,
        endTime
      });

      remaining[highest.id]--;
      currentTime = endTime;

      if (remaining[highest.id] === 0) {
        metrics[highest.id] = {
          completionTime: endTime,
          waitingTime: endTime - highest.arrivalTime - highest.burstTime,
          turnaroundTime: endTime - highest.arrivalTime,
          responseTime: responseTime[highest.id]
        };
      }
    }

    const avgWaitingTime = Object.values(metrics).reduce((sum, m) => sum + m.waitingTime, 0) / processes.length;
    const avgTurnaroundTime = Object.values(metrics).reduce((sum, m) => sum + m.turnaroundTime, 0) / processes.length;

    return { schedule, metrics, avgWaitingTime, avgTurnaroundTime };
  },

  // Round Robin
  roundRobin: (processes: Process[], timeQuantum: number): CPUResults => {
    const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const schedule: ScheduleResult[] = [];
    const metrics: Record<string, CPUMetrics> = {};
    const queue: Process[] = [];
    const remaining: Record<string, number> = {};
    const responseTime: Record<string, number> = {};
    let currentTime = 0;

    sorted.forEach(p => {
      remaining[p.id] = p.burstTime;
    });

    let processIndex = 0;

    while (Object.values(remaining).some(r => r > 0)) {
      // Add arrived processes to queue
      while (processIndex < sorted.length && sorted[processIndex].arrivalTime <= currentTime) {
        queue.push(sorted[processIndex]);
        processIndex++;
      }

      if (queue.length === 0) {
        if (processIndex < sorted.length) {
          currentTime = sorted[processIndex].arrivalTime;
        }
        continue;
      }

      const process = queue.shift()!;

      if (responseTime[process.id] === undefined) {
        responseTime[process.id] = currentTime - process.arrivalTime;
      }

      const executeTime = Math.min(timeQuantum, remaining[process.id]);
      schedule.push({
        processId: process.id,
        startTime: currentTime,
        endTime: currentTime + executeTime
      });

      remaining[process.id] -= executeTime;
      currentTime += executeTime;

      // Add newly arrived processes
      while (processIndex < sorted.length && sorted[processIndex].arrivalTime <= currentTime) {
        queue.push(sorted[processIndex]);
        processIndex++;
      }

      // If process not completed, add back to queue
      if (remaining[process.id] > 0) {
        queue.push(process);
      } else {
        metrics[process.id] = {
          completionTime: currentTime,
          waitingTime: currentTime - process.arrivalTime - process.burstTime,
          turnaroundTime: currentTime - process.arrivalTime,
          responseTime: responseTime[process.id]
        };
      }
    }

    const avgWaitingTime = Object.values(metrics).reduce((sum, m) => sum + m.waitingTime, 0) / processes.length;
    const avgTurnaroundTime = Object.values(metrics).reduce((sum, m) => sum + m.turnaroundTime, 0) / processes.length;

    return { schedule, metrics, avgWaitingTime, avgTurnaroundTime };
  }
};
