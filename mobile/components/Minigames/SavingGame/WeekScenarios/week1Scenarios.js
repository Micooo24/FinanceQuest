const week1Scenarios = [
    { 
      question: "Your landlord reminds you that rent is due. How will you pay?", 
      options: [
        { text: "Pay full rent (₱3,500)", cost: 3500, stressChange: -5 },
        { text: "Pay partial rent (₱2,000)", cost: 2000, stressChange: 5 },
        { text: "Delay payment (₱0) but landlord gets mad", cost: 0, stressChange: 10 }
      ]
    },
    { 
      question: "You need to commute to work. What transport will you take?", 
      options: [
        { text: "Jeepney (₱20)", cost: 20, stressChange: -2 },
        { text: "Tricycle (₱50)", cost: 50, stressChange: -5 },
        { text: "Walk (₱0), but you arrive tired", cost: 0, stressChange: 5 }
      ]
    },
    { 
      question: "Lunchtime! What will you eat?", 
      options: [
        { text: "Carinderia meal (₱70)", cost: 70, stressChange: -2 },
        { text: "Jollibee (₱150)", cost: 150, stressChange: -5 },
        { text: "Bring packed lunch (₱30)", cost: 30, stressChange: 0 }
      ]
    },
    { 
      question: "You receive an invitation to a birthday celebration.", 
      options: [
        { text: "Join and chip in (₱300)", cost: 300, stressChange: -3 },
        { text: "Decline politely (₱0)", cost: 0, stressChange: 2 }
      ]
    },
    { 
      question: "A family member asks for financial help (₱1,000).", 
      options: [
        { text: "Send money (₱1,000)", cost: 1000, stressChange: -5 },
        { text: "Apologize, can't afford it", cost: 0, stressChange: 5 }
      ]
    },
    { 
      question: "You get a sideline job opportunity (₱500 bonus).", 
      options: [
        { text: "Take the job (earn ₱500)", cost: -500, stressChange: 10 },
        { text: "Skip it (₱0)", cost: 0, stressChange: -2 }
      ]
    },
    { 
      question: "Your phone bill is due (₱300).", 
      options: [
        { text: "Pay immediately (₱300)", cost: 300, stressChange: -2 },
        { text: "Delay payment (₱0), risk disconnection", cost: 0, stressChange: 5 }
      ]
    }
  ];
  
  export default week1Scenarios;