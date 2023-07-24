import React, { useState } from "react";
import InvestmentHeader from "./components/InvestmentHeader";
import InvestmentForm from "./components/InvestmentForm";
import InvestmentTable from "./components/InvestmentTable";

function App() {
  const [isCalculated, setIsCalculated] = useState(false);
  const [investmentInfo, setInvestmentInfo] = useState([]);

  const isCalculatedTrue = () => {
    setIsCalculated(true);
  };

  const isCalculatedFalse = () => {
    setIsCalculated(false);
  };

  const calculateHandler = (userInput) => {
    const yearlyData = [];
    let currentSavings = +userInput.currentSavings;
    const yearlyContribution = +userInput.yearlyContribution;
    const expectedReturn = +userInput.interestRate / 100;
    const duration = +userInput.duration;
    let totalInterestGain = 0;
    let totalInvestedCapital = currentSavings;

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      totalInterestGain += yearlyInterest;
      totalInvestedCapital += yearlyContribution;
      yearlyData.push({
        year: i + 1,
        savingsEndOfYear: parseFloat(currentSavings.toFixed(2)),
        yearlyInterest: parseFloat(yearlyInterest.toFixed(2)),
        totalInterestGain: parseFloat(totalInterestGain.toFixed(2)),
        totalInvestedCapital: parseFloat(totalInvestedCapital.toFixed(2)),
      });
    }
    setInvestmentInfo(yearlyData);

    isCalculatedTrue();
  };

  return (
    <div>
      <InvestmentHeader />
      <InvestmentForm
        calculateHandler={calculateHandler}
        isCalculatedFalse={isCalculatedFalse}
      />
      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      {!isCalculated && <p className="para">No data calculated yet!</p>}
      {isCalculated && <InvestmentTable investmentInfo={investmentInfo} />}
    </div>
  );
}

export default App;
