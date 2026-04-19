// CPU Scheduling Types
export interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority?: number;
}

export interface ScheduleResult {
  processId: string;
  startTime: number;
  endTime: number;
}

export interface CPUMetrics {
  completionTime: number;
  waitingTime: number;
  turnaroundTime: number;
  responseTime: number;
}

export interface CPUResults {
  schedule: ScheduleResult[];
  metrics: Record<string, CPUMetrics>;
  avgWaitingTime: number;
  avgTurnaroundTime: number;
}

// Memory Management Types
export interface MemoryBlock {
  id: string;
  size: number;
  allocated: boolean;
  processId?: string;
}

export interface MemoryAllocationResult {
  blocks: MemoryBlock[];
  internalFragmentation: number;
  unallocatedProcesses: string[];
}

export interface PageFrame {
  processId?: string | null;
  pageNumber?: number;
}

export interface PageReplacementResult {
  frames: PageFrame[][];
  hits: number;
  misses: number;
  hitRatio: number;
  faultCount: number;
}

// Deadlock Types
export interface DeadlockState {
  allocationMatrix: number[][];
  maxMatrix: number[][];
  availableResources: number[];
  needMatrix: number[][];
  isSafe: boolean;
  safeSequence: number[];
}

// Chart Data Types
export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface AlgorithmComparison {
  algorithmName: string;
  avgWaitingTime: number;
  avgTurnaroundTime: number;
  responseTime: number;
}
