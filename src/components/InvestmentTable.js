import React from "react";

const InvestmentTable = (props) => {
  return (
    <table className="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {props.investmentInfo.map((el) => {
          return (
            <tr key={el.year}>
              <td>{el.year}</td>
              <td>{el.savingsEndOfYear}</td>
              <td>{el.yearlyInterest}</td>
              <td>{el.totalInterestGain}</td>
              <td>{el.totalInvestedCapital}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default InvestmentTable;
