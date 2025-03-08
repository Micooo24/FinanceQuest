import React, { useState, useEffect } from "react";

const financialTips = [
  "Track Your Expenses – Keep a record of where your money goes to identify unnecessary spending.",
  "Follow the 50/30/20 Rule – Allocate 50% for needs, 30% for wants, and 20% for savings or investments.",
  "Build an Emergency Fund – Save at least 3-6 months’ worth of living expenses for emergencies.",
  "Avoid Lifestyle Inflation – Increase savings as your income grows instead of upgrading unnecessary expenses.",
  "Automate Savings – Set up automatic transfers to savings or investment accounts to ensure consistency.",
  "Use Cash Instead of Credit – Helps control impulsive spending and avoids unnecessary debt.",
  "Pay Off High-Interest Debt First – Focus on paying debts with the highest interest first.",
  "Avoid Minimum Payments – Always try to pay more than the minimum amount to reduce interest costs.",
  "Look for Discounts & Cashback – Take advantage of deals, promo codes, and loyalty programs.",
  "Start Investing Early – The sooner you invest, the more you benefit from compound interest.",
  "Build Multiple Income Streams – Relying on one source of income can be risky. Try freelancing, side businesses, or passive income opportunities.",
  "Start Retirement Savings Early – Even small contributions grow significantly over time.",
];

const FinancialTips = () => {
  const [randomTip, setRandomTip] = useState("");

  useEffect(() => {
    const shuffledTip = financialTips[Math.floor(Math.random() * financialTips.length)];
    setRandomTip(shuffledTip);
  }, []);

  return (
    <div style={{ padding: "5px",  borderRadius: "10px" , fontFamily: "'Fraunces", mt: 5}}>
  
      <p>{randomTip}</p>
    </div>
  );
};

export default FinancialTips;
