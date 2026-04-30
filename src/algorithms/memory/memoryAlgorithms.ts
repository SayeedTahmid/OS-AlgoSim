import { MemoryBlock, MemoryAllocationResult, PageReplacementResult, PageFrame } from '../../types';

export const memoryAlgorithms = {
  // First Fit - Memory Allocation
  firstFit: (blockSizes: number[], processSizes: number[]): MemoryAllocationResult => {
    const blocks: MemoryBlock[] = blockSizes.map((size, i) => ({
      id: (i + 1).toString(),
      size,
      allocated: false
    }));

    const allocatedProcesses = new Set<string>();
    const unallocatedProcesses: string[] = [];

    processSizes.forEach((processSize, i) => {
      const processId = `P${i + 1}`;
      const blockIndex = blocks.findIndex(b => !b.allocated && b.size >= processSize);

      if (blockIndex !== -1) {
        blocks[blockIndex].allocated = true;
        blocks[blockIndex].processId = processId;
        allocatedProcesses.add(processId);
      } else {
        unallocatedProcesses.push(processId);
      }
    });

    const internalFragmentation = blocks
      .filter(b => b.allocated && b.processId)
      .reduce((sum, b) => {
        const processSize = processSizes[parseInt(b.processId!.substring(1)) - 1];
        return sum + (b.size - processSize);
      }, 0);

    return { blocks, internalFragmentation, unallocatedProcesses };
  },

  // Best Fit - Memory Allocation
  bestFit: (blockSizes: number[], processSizes: number[]): MemoryAllocationResult => {
    const blocks: MemoryBlock[] = blockSizes.map((size, i) => ({
      id: (i + 1).toString(),
      size,
      allocated: false
    }));

    const allocatedProcesses = new Set<string>();
    const unallocatedProcesses: string[] = [];

    processSizes.forEach((processSize, i) => {
      const processId = `P${i + 1}`;
      const suitableBlocks = blocks
        .map((b, idx) => ({ block: b, index: idx }))
        .filter(({ block }) => !block.allocated && block.size >= processSize)
        .sort((a, b) => a.block.size - b.block.size);

      if (suitableBlocks.length > 0) {
        const { index } = suitableBlocks[0];
        blocks[index].allocated = true;
        blocks[index].processId = processId;
        allocatedProcesses.add(processId);
      } else {
        unallocatedProcesses.push(processId);
      }
    });

    const internalFragmentation = blocks
      .filter(b => b.allocated && b.processId)
      .reduce((sum, b) => {
        const processSize = processSizes[parseInt(b.processId!.substring(1)) - 1];
        return sum + (b.size - processSize);
      }, 0);

    return { blocks, internalFragmentation, unallocatedProcesses };
  },

  // FIFO - Page Replacement
  fifo: (numFrames: number, referenceString: number[]): PageReplacementResult => {
    const frames: PageFrame[][] = [];
    const currentFrames: (number | null)[] = Array(numFrames).fill(null);
    let hits = 0;
    let misses = 0;
    const queue: number[] = [];

    referenceString.forEach(pageNum => {
      const framesCopy = [...currentFrames];
      frames.push(framesCopy.map(p => p !== null ? { pageNumber: p } : {}));

      if (currentFrames.includes(pageNum)) {
        hits++;
      } else {
        misses++;

        if (queue.length < numFrames) {
          currentFrames[queue.length] = pageNum;
        } else {
          const removedPage = queue.shift()!;
          const removeIndex = currentFrames.indexOf(removedPage);
          currentFrames[removeIndex] = pageNum;
        }

        queue.push(pageNum);
      }
    });

    const hitRatio = hits / (hits + misses);

    return {
      frames,
      hits,
      misses,
      hitRatio,
      faultCount: misses
    };
  },

  // LRU - Page Replacement
  lru: (numFrames: number, referenceString: number[]): PageReplacementResult => {
    const frames: PageFrame[][] = [];
    const currentFrames: number[] = [];
    const usageOrder: number[] = [];
    let hits = 0;
    let misses = 0;

    referenceString.forEach(pageNum => {
      const framesCopy: PageFrame[] = currentFrames.map(p => ({ pageNumber: p }));
      while (framesCopy.length < numFrames) {
        framesCopy.push({});
      }
      frames.push(framesCopy);

      const index = currentFrames.indexOf(pageNum);

      if (index !== -1) {
        hits++;
        // Move to end (most recently used)
        usageOrder.splice(usageOrder.indexOf(pageNum), 1);
        usageOrder.push(pageNum);
      } else {
        misses++;

        if (currentFrames.length < numFrames) {
          currentFrames.push(pageNum);
          usageOrder.push(pageNum);
        } else {
          // Replace least recently used
          const lruPage = usageOrder.shift()!;
          currentFrames[currentFrames.indexOf(lruPage)] = pageNum;
          usageOrder.push(pageNum);
        }
      }
    });

    const hitRatio = hits / (hits + misses);

    return {
      frames,
      hits,
      misses,
      hitRatio,
      faultCount: misses
    };
  }
};
