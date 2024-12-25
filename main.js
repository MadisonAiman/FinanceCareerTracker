// Define a base class for handling calculations and 
// input validation

class CareerDashboard {
    constructor() {
        this.summaryElement = document.getElementById("dashboard-summary");
        this.hourlyRateElement = document.getElementById("dashboard-hourly-rate");
        this.roiElement = document.getElementById("dashboard-roi");
        this.gapElement = document.getElementById("dashboard-gap");
    }

    updateHourlyRate(hourlyRate) {
        this.hourlyRateElement.textContent = `Hourly Rate: $${hourlyRate}`;
    }

    updateROI(roi) {
        this.roiElement.textContent = `ROI: ${roi}%`;
    }

    updateGapAnalysis(activeYears, gapPercentage) {
        this.gapElement.textContent = 
            `Active Years: ${activeYears}, Gap: ${gapPercentage}%`;
    }
}

// Instantiate Dashboard
const careerDashboard = new CareerDashboard();
class CareerTracker {
    constructor(form, resultElement) {
        this.form = form;
        this.resultElement = resultElement;
    }

    // Utility method to validate input fields
    validateInput(inputId) {
        const value = parseFloat(document.getElementById(inputId).value);
        if (isNaN(value) || value < 0) {
            throw new Error(`Invalid input for field: ${inputId}`);
        }
        return value;
    }

    // Method to display results
    displayResult(content) {
        this.resultElement.innerHTML = content;
    }

    // Method to display error messages
    displayError(message) {
        this.resultElement.textContent = `Error: ${message}`;
    }
}

// Subclass for Time Value Calculation
class TimeValueCalculator extends CareerTracker {
    calculate() {
        try {
            const annualIncome = this.validateInput("annual-income");
            const weeklyHours = this.validateInput("work-hours");
    
            if (weeklyHours === 0) {
                throw new Error("Weekly hours cannot be zero.");
            }
    
            const hourlyRate = (annualIncome / (weeklyHours * 52)).toFixed(2);
            this.displayResult(`Your hourly rate is $${hourlyRate}.`);
    
            // Update the dashboard only if calculation succeeds
            careerDashboard.updateHourlyRate(hourlyRate);
        } catch (error) {
            this.displayError(error.message);
        }
    }    
}

// Subclass for Career Investment Calculation
class CareerInvestmentCalculator extends CareerTracker {
    calculate() {
        try {
            const investmentCost = this.validateInput("investment-cost");
            const salaryBoost = this.validateInput("salary-boost");
    
            if (investmentCost === 0) {
                throw new Error("Investment cost cannot be zero.");
            }
    
            const roi = (((salaryBoost - investmentCost) / investmentCost) * 100).toFixed(2);
            this.displayResult(`Your ROI is ${roi}%.`);
    
            // Update the dashboard only if calculation succeeds
            careerDashboard.updateROI(roi);
        } catch (error) {
            this.displayError(error.message);
        }
    }
    
}

// Subclass for Career Gap Analysis
class CareerGapAnalyzer extends CareerTracker {
    calculate() {
        try {
            const totalYears = this.validateInput("total-years");
            const gapYears = this.validateInput("gap-years");
    
            if (gapYears > totalYears) {
                throw new Error("Gap years cannot exceed total career years.");
            }
    
            const gapPercentage = ((gapYears / totalYears) * 100).toFixed(2);
            const activeYears = totalYears - gapYears;
    
            this.displayResult(`
                <p>Active Career Years: ${activeYears}</p>
                <p>Gap Percentage: ${gapPercentage}%</p>
            `);
    
            // Update the dashboard only if calculation succeeds
            careerDashboard.updateGapAnalysis(activeYears, gapPercentage);
        } catch (error) {
            this.displayError(error.message);
        }
    }
    
}

// Initialize calculators and bind events
document.addEventListener("DOMContentLoaded", () => {
    const timeValueCalculator = new TimeValueCalculator(
        document.getElementById("time-value-form"),
        document.getElementById("time-value-result")
    );
    document.getElementById("calculate-time-value").addEventListener("click", () => timeValueCalculator.calculate());

    const careerInvestmentCalculator = new CareerInvestmentCalculator(
        document.getElementById("career-investment"),
        document.getElementById("investment-result")
    );
    document.getElementById("calculate-investment").addEventListener("click", () => careerInvestmentCalculator.calculate());

    const careerGapAnalyzer = new CareerGapAnalyzer(
        document.getElementById("career-gap-form"),
        document.getElementById("career-gap-result")
    );
    document.getElementById("calculate-gap").addEventListener("click", () => careerGapAnalyzer.calculate());
});

