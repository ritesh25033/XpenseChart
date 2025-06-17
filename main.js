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

// Get current day (Tuesday as per the design)
const getCurrentDay = () => {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const today = new Date();
    return days[today.getDay()];
};

// Generate chart bars
const generateChart = () => {
    const chartContainer = document.getElementById('spending-chart');
    const maxAmount = Math.max(...expenseData.map(item => item.amount));
    const currentDay = 'wed'; // Set to Wednesday as shown in the design
    
    expenseData.forEach((data, index) => {
        // Create bar element
        const bar = document.createElement('div');
        bar.className = 'spending-chart__bar';
        bar.setAttribute('data-label', data.day);
        bar.setAttribute('data-amount', `$${data.amount.toFixed(2)}`);
        
        // Add active class for current day
        if (data.day === currentDay) {
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
        tooltip.textContent = `$${data.amount.toFixed(2)}`;
        bar.appendChild(tooltip);
        
        chartContainer.appendChild(bar);
    });
};

// Initialize the chart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    generateChart();
});

// Verify test cases
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
        const expectedAmount = `$${expenseData[index].amount.toFixed(2)}`;
        if (bar.getAttribute('data-label') !== expectedDay || 
            bar.getAttribute('data-amount') !== expectedAmount) {
            dataTest = false;
        }
    });
    console.log('Test 3 - Bar data attributes:', dataTest ? 'PASS' : 'FAIL');
    
    // Test 4: Active bar (Wednesday)
    const activeBar = document.querySelector('.spending-chart__bar.active');
    const activeBarIndex = Array.from(bars).indexOf(activeBar);
    console.log('Test 4 - Active bar (Wednesday):', activeBarIndex === 2 ? 'PASS' : 'FAIL');
    
    // Test 5: First bar tooltip amount
    const firstBar = bars[0];
    console.log('Test 5 - First bar amount:', firstBar?.getAttribute('data-amount') === '$17.45' ? 'PASS' : 'FAIL');
    
    // Test 6: Monthly total
    const monthlyTotal = document.querySelector('.spending_total span');
    console.log('Test 6 - Monthly total:', monthlyTotal?.textContent === '$478.33' ? 'PASS' : 'FAIL');
    
    // Test 7: Spending comparison
    const comparison = document.querySelector('.spending_comparison');
    const comparisonText = comparison?.textContent.replace(/\s+/g, ' ').trim();
    console.log('Test 7 - Spending comparison:', comparisonText?.includes('+2.4%') && comparisonText?.includes('from last month') ? 'PASS' : 'FAIL');
};

// Run tests after a short delay to ensure DOM is fully rendered
setTimeout(runTests, 100);
