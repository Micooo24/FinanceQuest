const week2Scenarios = [
  { 
    question: "Your child gets sick. Will you take them to a clinic (₱500) or self-medicate?", 
    options: [
      { text: "Go to the clinic (₱500)", cost: 500, result: "You took your child to the clinic and they received proper care." },
      { text: "Buy meds and hope for the best (₱200)", cost: 200, result: "You bought meds and hoped for the best, but it was risky." }
    ]
  },
  { 
    question: "Your employer is delaying salary. What will you do?", 
    options: [
      { text: "Borrow from a friend (₱0)", cost: 0, result: "You borrowed money from a friend to get by." },
      { text: "Take a loan with interest (₱500)", cost: 500, result: "You took a loan with interest to cover your expenses." }
    ]
  },
  { 
    question: "Unexpected home repair needed (₱800).", 
    options: [
      { text: "Fix immediately (₱800)", cost: 800, result: "You fixed the home issue immediately and avoided further damage." },
      { text: "Ignore it for now (₱0)", cost: 0, result: "You ignored the home issue, but it might get worse." }
    ]
  },
  { 
    question: "A neighbor offers a side job paying ₱700.", 
    options: [
      { text: "Accept the extra work (+₱700)", cost: -700, result: "You accepted the side job and earned extra money." },
      { text: "Decline, need rest (₱0)", cost: 0, result: "You declined the side job and took some rest." }
    ]
  },
  { 
    question: "Electric bill is due (₱1,200).", 
    options: [
      { text: "Pay on time (₱1,200)", cost: 1200, result: "You paid the electric bill on time and avoided penalties." },
      { text: "Pay later with penalty (₱1,400)", cost: 1400, result: "You paid the electric bill later with a penalty." }
    ]
  },
  { 
    question: "Your friend invites you to a weekend trip (₱1,500).", 
    options: [
      { text: "Join (₱1,500)", cost: 1500, result: "You joined the weekend trip and had a great time." },
      { text: "Decline (₱0)", cost: 0, result: "You declined the trip and saved money." }
    ]
  },
  { 
    question: "You find an old item you can sell for ₱600.", 
    options: [
      { text: "Sell it (+₱600)", cost: -600, result: "You sold the old item and made some money." },
      { text: "Keep it (₱0)", cost: 0, result: "You decided to keep the old item." }
    ]
  }
];

export default week2Scenarios;