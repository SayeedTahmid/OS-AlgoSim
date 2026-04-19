import { DeadlockState } from '../../types';

export const deadlockAlgorithms = {
  // Banker's Algorithm - Check if system is in safe state
  bankerAlgorithm: (
    allocation: number[][],
    max: number[][],
    available: number[]
  ): DeadlockState => {
    const numProcesses = allocation.length;
    const numResources = available.length;

    // Calculate need matrix
    const need: number[][] = allocation.map((row, i) =>
      row.map((val, j) => max[i][j] - val)
    );

    // Initialize work array and finish array
    const work = [...available];
    const finish = Array(numProcesses).fill(false);
    const safeSequence: number[] = [];

    // Track which processes we've checked
    let processesChecked = 0;

    while (processesChecked < numProcesses) {
      let found = false;

      for (let i = 0; i < numProcesses; i++) {
        if (!finish[i]) {
          // Check if need[i] <= work
          let canAllocate = true;

          for (let j = 0; j < numResources; j++) {
            if (need[i][j] > work[j]) {
              canAllocate = false;
              break;
            }
          }

          if (canAllocate) {
            // Allocate resources
            for (let j = 0; j < numResources; j++) {
              work[j] += allocation[i][j];
            }

            finish[i] = true;
            safeSequence.push(i);
            found = true;
            processesChecked++;
            break;
          }
        }
      }

      if (!found) {
        // No safe sequence found
        return {
          allocationMatrix: allocation,
          maxMatrix: max,
          availableResources: available,
          needMatrix: need,
          isSafe: false,
          safeSequence: []
        };
      }
    }

    return {
      allocationMatrix: allocation,
      maxMatrix: max,
      availableResources: available,
      needMatrix: need,
      isSafe: true,
      safeSequence
    };
  },

  // Deadlock Detection Algorithm
  deadlockDetection: (
    allocation: number[][],
    request: number[][],
    available: number[]
  ): { isDeadlock: boolean; deadlockedProcesses: number[] } => {
    const numProcesses = allocation.length;
    const numResources = available.length;

    const work = [...available];
    const finish = Array(numProcesses).fill(false);
    const deadlockedProcesses: number[] = [];
    let progressMade = true;

    while (progressMade) {
      progressMade = false;

      for (let i = 0; i < numProcesses; i++) {
        if (!finish[i]) {
          let canAllocate = true;

          for (let j = 0; j < numResources; j++) {
            if (request[i][j] > work[j]) {
              canAllocate = false;
              break;
            }
          }

          if (canAllocate) {
            // Allocate resources to process
            for (let j = 0; j < numResources; j++) {
              work[j] += allocation[i][j];
            }

            finish[i] = true;
            progressMade = true;
          }
        }
      }
    }

    // Processes with finish[i] == false are deadlocked
    for (let i = 0; i < numProcesses; i++) {
      if (!finish[i]) {
        deadlockedProcesses.push(i);
      }
    }

    return {
      isDeadlock: deadlockedProcesses.length > 0,
      deadlockedProcesses
    };
  }
};
