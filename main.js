// Data from data.json
const expenseData = [
    { "day": "mon", "amount": 17.45 },
    { "day": "tue", "amount": 34.91 },
    { "day": "wed", "amount": 52.36 },
    { "day": "thu", "amount": 31.07 },
    { "day": "fri", "amount": 23.39 },
    { "day": "sat", "amount": 43.28 },
    { "day": "sun", "amount": 25.48 }
];

// Generate chart bars with fixed today's bar logic
const generateChart = () => {
    const chartContainer = document.getElementById('spending-chart');
    const maxAmount = Math.max(...expenseData.map(item => item.amount));
    
    // Fixed logic for determining today's bar index
    const today = new Date();
    const dayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Convert JavaScript day index to match our data array order
    // JavaScript: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
    // Our array: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
    const todayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    
    expenseData.forEach((data, index) => {
        // Create bar element
        const bar = document.createElement('div');
        bar.className = 'spending-chart__bar';
        bar.setAttribute('data-label', data.day);
        bar.setAttribute('data-amount', `$${data.amount}`); // Fixed: Remove .toFixed(2) to match test expectation
        
        // Add active class for today's bar
        if (index === todayIndex) {
            bar.classList.add('active');
        }
        
        // Calculate bar height (proportional to amount)
        const barHeight = (data.amount / maxAmount) * 150; // 150px max height
        bar.style.height = `${barHeight}px`;
        
        // Create day label
        const dayLabel = document.createElement('div');
        dayLabel.className = 'bar-day';
        dayLabel.textContent = data.day;
        bar.appendChild(dayLabel);
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = `$${data.amount}`;
        bar.appendChild(tooltip);
        
        chartContainer.appendChild(bar);
    });
};

// Initialize the chart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    generateChart();
});

// Test validation function
const runTests = () => {
    console.log('Running test cases...');
    
    // Test 1: Balance amount
    const balanceAmount = document.querySelector('.balance_amount');
    console.log('Test 1 - Balance amount:', balanceAmount?.textContent === '$921.48' ? 'PASS' : 'FAIL');
    
    // Test 2: Number of bars
    const bars = document.querySelectorAll('.spending-chart__bar');
    console.log('Test 2 - Number of bars:', bars.length === 7 ? 'PASS' : 'FAIL');
    
    // Test 3: Bar data attributes
    let dataTest = true;
    bars.forEach((bar, index) => {
        const expectedDay = expenseData[index].day;
        const expectedAmount = `$${expenseData[index].amount}`;
        if (bar.getAttribute('data-label') !== expectedDay || 
            bar.getAttribute('data-amount') !== expectedAmount) {
            dataTest = false;
        }
    });
    console.log('Test 3 - Bar data attributes:', dataTest ? 'PASS' : 'FAIL');
    
    // Test 4: Active bar for today
    const today = new Date();
    const todayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
    const activeBar = bars[todayIndex];
    console.log('Test 4 - Active bar for today:', activeBar?.classList.contains('active') ? 'PASS' : 'FAIL');
    
    // Test 5: First bar tooltip amount
    const firstBar = bars[0];
    console.log('Test 5 - First bar amount:', firstBar?.getAttribute('data-amount') === '$17.45' ? 'PASS' : 'FAIL');
    
    // Test 6: Monthly total
    const monthlyTotal = document.querySelector('.spending_total span');
    console.log('Test 6 - Monthly total:', monthlyTotal?.textContent === '$478.33' ? 'PASS' : 'FAIL');
    
    // Test 7: Spending comparison
    const comparison = document.querySelector('.spending_comparison');
    console.log('Test 7 - Spending comparison:', comparison?.textContent === '+2.4% from last month' ? 'PASS' : 'FAIL');
};

// Run tests after DOM is fully rendered
setTimeout(runTests, 100);
