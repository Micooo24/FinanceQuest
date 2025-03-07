const week1Scenarios = [
  { 
    question: "Your landlord reminds you that rent is due. How will you pay?", 
    options: [
      { text: "Pay full rent (₱3,500)", cost: 3500, result: "You paid the full rent and avoided any issues with your landlord." },
      { text: "Pay partial rent (₱2,000)", cost: 2000, result: "You paid partial rent, but your landlord is not happy." },
      { text: "Delay payment (₱0) but landlord gets mad", cost: 0, result: "You delayed the payment, and your landlord is very upset." }
    ]
  },
  { 
    question: "You need to commute to work. What transport will you take?", 
    options: [
      { text: "Jeepney (₱20)", cost: 20, result: "You took the jeepney and arrived at work on time." },
      { text: "Tricycle (₱50)", cost: 50, result: "You took the tricycle and arrived at work quickly." },
      { text: "Walk (₱0), but you arrive tired", cost: 0, result: "You walked to work and arrived tired." }
    ]
  },
  { 
    question: "Lunchtime! What will you eat?", 
    options: [
      { text: "Carinderia meal (₱70)", cost: 70, result: "You had a carinderia meal and felt satisfied." },
      { text: "Jollibee (₱150)", cost: 150, result: "You had Jollibee and enjoyed your meal." },
      { text: "Bring packed lunch (₱30)", cost: 30, result: "You brought a packed lunch and saved money." }
    ]
  },
  { 
    question: "You receive an invitation to a birthday celebration.", 
    options: [
      { text: "Join and chip in (₱300)", cost: 300, result: "You joined the celebration and had a great time." },
      { text: "Decline politely (₱0)", cost: 0, result: "You declined the invitation and stayed home." }
    ]
  },
  { 
    question: "A family member asks for financial help (₱1,000).", 
    options: [
      { text: "Send money (₱1,000)", cost: 1000, result: "You helped your family member and they are grateful." },
      { text: "Apologize, can't afford it", cost: 0, result: "You apologized and explained that you can't afford to help." }
    ]
  },
  { 
    question: "You get a sideline job opportunity (₱500 bonus).", 
    options: [
      { text: "Take the job (earn ₱500)", cost: -500, result: "You took the job and earned an extra ₱500." },
      { text: "Skip it (₱0)", cost: 0, result: "You skipped the job and had more free time." }
    ]
  },
  { 
    question: "Your phone bill is due (₱300).", 
    options: [
      { text: "Pay immediately (₱300)", cost: 300, result: "You paid the phone bill and avoided any issues." },
      { text: "Delay payment (₱0), risk disconnection", cost: 0, result: "You delayed the payment and risked disconnection." }
    ]
  }
];

export default week1Scenarios;