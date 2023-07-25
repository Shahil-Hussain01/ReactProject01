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

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
        savingsEndOfYear: formatter.format(currentSavings),
        yearlyInterest: formatter.format(yearlyInterest),
        totalInterestGain: formatter.format(totalInterestGain),
        totalInvestedCapital: formatter.format(totalInvestedCapital),
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
      {!isCalculated && (
        <p style={{ textAlign: "center" }}>No data calculated yet!</p>
      )}
      {isCalculated && <InvestmentTable investmentInfo={investmentInfo} />}
    </div>
  );
}

export default App;
