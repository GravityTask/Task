function twoSum(nums, target) {
    if (!Array.isArray(nums) || typeof target !== 'number') {
        throw new Error('Invalid input: nums should be an array and target should be a number');
    }
    
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        numMap.set(nums[i], i);
    }
    
    throw new Error('No valid two sum solution found');
}


const nums = [2, 7, 11, 15];
const target = 18;
console.log(twoSum(nums, target)); 