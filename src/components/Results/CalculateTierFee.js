
const calculateTierFee = (accountValue, householdAUM, breakpoints, feePercentages) => {
    let maxVal = Math.max(accountValue, householdAUM);
    let tierValues = [];
    let tierFees = [];
    let sumTierValues = 0;

    breakpoints.forEach((breakpoint, i) => {
        let tierValue = 0;
        if (i === 0) {
            tierValue = Math.min(breakpoint, accountValue / maxVal * breakpoint);
        } else {
            const remainingValue = accountValue - sumTierValues;
            if (remainingValue <= 0) {
                tierValue = 0; // No remaining account value to allocate
            } else if (i === breakpoints.length - 1) {
                // For the last tier, allocate all remaining account value
                tierValue = remainingValue;
            } else {
                // For intermediate tiers, calculate based on the remaining value and breakpoint
                tierValue = Math.min(remainingValue, accountValue / maxVal * breakpoint);
            }
        }
        sumTierValues += tierValue;
        tierValues.push(tierValue);
        tierFees.push(tierValue * (feePercentages[i] / 100));
    });

    let totalTierFee = tierFees.reduce((acc, fee) => acc + fee, 0);
    return { tierValues, tierFees, totalTierFee };
}
export default calculateTierFee;
// // Input values
// let accountValue = 10000; // Example account value
// let householdAUM = 0; // Example household AUM
// let breakpoints = [5000, 5000]; // Dollar values
// let feePercentages = [1.00, 1.00]; // Fee percentages

// // Calculate tier values and fees
// let { tierValues, tierFees, totalTierFee } = calculateTier(accountValue, householdAUM, breakpoints, feePercentages);

// console.log("Tier Values:", tierValues);
// console.log("Tier Fees:", tierFees);
// console.log("Total Tier Fee:", totalTierFee);
