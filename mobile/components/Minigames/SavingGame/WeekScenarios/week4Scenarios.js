const week4Scenarios = [
    {
      question: "Your electricity bill is higher than expected. How do you handle it?",
      options: [
        { text: "Pay the full amount", cost: 2000, stressChange: 0 },
        { text: "Pay partially and negotiate", cost: 1000, stressChange: 5 },
      ],
    },
    {
      question: "A family member asks for a loan. Do you help them?",
      options: [
        { text: "Yes, family comes first", cost: 1500, stressChange: 5 },
        { text: "No, I can't afford it", cost: 0, stressChange: -5 },
      ],
    },
    {
      question: "You find a great deal on a vacation package. Do you book it?",
      options: [
        { text: "Yes, I deserve a vacation", cost: 3000, stressChange: -10 },
        { text: "No, I need to save money", cost: 0, stressChange: 5 },
      ],
    },
    {
      question: "Your pet needs a vet visit. What do you do?",
      options: [
        { text: "Take them to the vet", cost: 1000, stressChange: -5 },
        { text: "Wait and see if they get better", cost: 0, stressChange: 10 },
      ],
    },
    {
      question: "You get a chance to invest in a friend's startup. Do you invest?",
      options: [
        { text: "Yes, it could be profitable", cost: 2000, stressChange: 0 },
        { text: "No, it's too risky", cost: 0, stressChange: 5 },
      ],
    },
    {
      question: "Your car insurance is due. How do you handle it?",
      options: [
        { text: "Pay the full amount", cost: 2500, stressChange: 0 },
        { text: "Pay in installments", cost: 1000, stressChange: 5 },
      ],
    },
    {
      question: "You have an opportunity to attend a professional workshop. Do you go?",
      options: [
        { text: "Yes, it will help my career", cost: 2000, stressChange: -5 },
        { text: "No, I can't afford it", cost: 0, stressChange: 5 },
      ],
    },
  ];
  
  export default week4Scenarios;