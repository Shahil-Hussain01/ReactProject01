import React, { useState } from "react";
import classes from "./InvestmentForm.module.css";

const InvestmentForm = (props) => {
  const [enteredCurrentSavings, setEnteredCurrentSavings] = useState("");
  const [enteredYearlyContribution, setEnteredYearlyContribution] =
    useState("");
  const [enteredInterestRate, setEnteredInterestRate] = useState("");
  const [enteredDurationYear, setEnteredDurationYear] = useState("");

  const inputChangeHandler = (identifier, value) => {
    if (identifier === "currentSavings") {
      setEnteredCurrentSavings(value);
    } else if (identifier === "yearlyContribution") {
      setEnteredYearlyContribution(value);
    } else if (identifier === "expectedReturn") {
      setEnteredInterestRate(value);
    } else if (identifier === "duration") {
      setEnteredDurationYear(value);
    }
  };

  const blurInputs = () => {
    setEnteredCurrentSavings("");
    setEnteredDurationYear("");
    setEnteredInterestRate("");
    setEnteredYearlyContribution("");
  };

  const resetInputs = () => {
    blurInputs();
    props.isCalculatedFalse();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      currentSavings: enteredCurrentSavings,
      yearlyContribution: enteredYearlyContribution,
      interestRate: enteredInterestRate,
      duration: enteredDurationYear,
    };
    if (
      !userData.currentSavings ||
      !userData.yearlyContribution ||
      !userData.interestRate ||
      !userData.duration
    ) {
      return;
    }
    props.calculateHandler(userData);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            min={0}
            id="current-savings"
            onChange={(e) =>
              inputChangeHandler("currentSavings", e.target.value)
            }
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            onChange={(e) =>
              inputChangeHandler("yearlyContribution", e.target.value)
            }
          />
        </p>
      </div>
      <div className={classes["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            id="expected-return"
            onChange={(e) =>
              inputChangeHandler("expectedReturn", e.target.value)
            }
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            min={0}
            id="duration"
            onChange={(e) => inputChangeHandler("duration", e.target.value)}
          />
        </p>
      </div>
      <p className={classes.actions}>
        <button
          type="reset"
          className={classes.buttonAlt}
          onClick={resetInputs}
        >
          Reset
        </button>
        <button type="submit" className={classes.button}>
          Calculate
        </button>
      </p>
    </form>
  );
};

export default InvestmentForm;
