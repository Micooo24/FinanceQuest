const week2Scenarios = [
    { 
      question: "Your child gets sick. Will you take them to a clinic (₱500) or self-medicate?", 
      options: [
        { text: "Go to the clinic (₱500)", cost: 500, stressChange: -5 },
        { text: "Buy meds and hope for the best (₱200)", cost: 200, stressChange: 5 }
      ]
    },
    { 
      question: "Your employer is delaying salary. What will you do?", 
      options: [
        { text: "Borrow from a friend (₱0)", cost: 0, stressChange: 3 },
        { text: "Take a loan with interest (₱500)", cost: 500, stressChange: -3 }
      ]
    },
    { 
      question: "Unexpected home repair needed (₱800).", 
      options: [
        { text: "Fix immediately (₱800)", cost: 800, stressChange: -5 },
        { text: "Ignore it for now (₱0)", cost: 0, stressChange: 5 }
      ]
    },
    { 
      question: "A neighbor offers a side job paying ₱700.", 
      options: [
        { text: "Accept the extra work (+₱700)", cost: -700, stressChange: 5 },
        { text: "Decline, need rest (₱0)", cost: 0, stressChange: -2 }
      ]
    },
    { 
      question: "Electric bill is due (₱1,200).", 
      options: [
        { text: "Pay on time (₱1,200)", cost: 1200, stressChange: -3 },
        { text: "Pay later with penalty (₱1,400)", cost: 1400, stressChange: -5 }
      ]
    },
    { 
      question: "Your friend invites you to a weekend trip (₱1,500).", 
      options: [
        { text: "Join (₱1,500)", cost: 1500, stressChange: -5 },
        { text: "Decline (₱0)", cost: 0, stressChange: 2 }
      ]
    },
    { 
      question: "You find an old item you can sell for ₱600.", 
      options: [
        { text: "Sell it (+₱600)", cost: -600, stressChange: 3 },
        { text: "Keep it (₱0)", cost: 0, stressChange: 0 }
      ]
    }
  ];
  
  export default week2Scenarios;