const week3Scenarios = [
    {
      question: "Your friend invites you to a weekend getaway. Do you go?",
      options: [
        { text: "Yes, I need a break", cost: 1500, stressChange: -10 },
        { text: "No, I need to save money", cost: 0, stressChange: 5 },
      ],
    },
    {
      question: "Your phone breaks and you need a new one. What do you do?",
      options: [
        { text: "Buy a new phone", cost: 3000, stressChange: -5 },
        { text: "Get it repaired", cost: 1000, stressChange: 0 },
        { text: "Use an old spare phone", cost: 0, stressChange: 5 },
      ],
    },
    {
      question: "You find a part-time job opportunity. Do you take it?",
      options: [
        { text: "Yes, I need extra income", cost: 0, stressChange: 10 },
        { text: "No, I can't handle more stress", cost: 0, stressChange: -5 },
      ],
    },
    {
      question: "Your car needs urgent repairs. What do you do?",
      options: [
        { text: "Get it repaired immediately", cost: 2000, stressChange: -5 },
        { text: "Delay the repairs", cost: 0, stressChange: 10 },
      ],
    },
    {
      question: "You receive a surprise bonus at work. How do you use it?",
      options: [
        { text: "Save it all", cost: -1000, stressChange: -5 },
        { text: "Spend it on something nice", cost: 0, stressChange: 5 },
      ],
    },
    {
      question: "Your friend asks you to lend them some money. Do you help?",
      options: [
        { text: "Yes, I can help", cost: 1000, stressChange: 5 },
        { text: "No, I need to save", cost: 0, stressChange: -5 },
      ],
    },
    {
      question: "You find a great deal on a new gadget. Do you buy it?",
      options: [
        { text: "Yes, it's a great deal", cost: 2000, stressChange: -5 },
        { text: "No, I need to save money", cost: 0, stressChange: 5 },
      ],
    },
  ];
  
  export default week3Scenarios;