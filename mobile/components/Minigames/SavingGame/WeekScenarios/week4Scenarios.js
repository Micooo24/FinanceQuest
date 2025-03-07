const week4Scenarios = [
  {
    question: "Your electricity bill is higher than expected. How do you handle it?",
    options: [
      { text: "Pay the full amount", cost: 2000, result: "You paid the full amount and avoided any issues." },
      { text: "Pay partially and negotiate", cost: 1000, result: "You paid partially and negotiated with the provider." },
    ],
  },
  {
    question: "A family member asks for a loan. Do you help them?",
    options: [
      { text: "Yes, family comes first", cost: 1500, result: "You helped your family member and they are grateful." },
      { text: "No, I can't afford it", cost: 0, result: "You explained that you can't afford to help." },
    ],
  },
  {
    question: "You find a great deal on a vacation package. Do you book it?",
    options: [
      { text: "Yes, I deserve a vacation", cost: 3000, result: "You booked the vacation and had a great time." },
      { text: "No, I need to save money", cost: 0, result: "You decided to save money instead of going on vacation." },
    ],
  },
  {
    question: "Your pet needs a vet visit. What do you do?",
    options: [
      { text: "Take them to the vet", cost: 1000, result: "You took your pet to the vet and they received proper care." },
      { text: "Wait and see if they get better", cost: 0, result: "You waited to see if your pet got better, but it was risky." },
    ],
  },
  {
    question: "You get a chance to invest in a friend's startup. Do you invest?",
    options: [
      { text: "Yes, it could be profitable", cost: 2000, result: "You invested in your friend's startup and it could be profitable." },
      { text: "No, it's too risky", cost: 0, result: "You decided not to invest because it was too risky." },
    ],
  },
  {
    question: "Your car insurance is due. How do you handle it?",
    options: [
      { text: "Pay the full amount", cost: 2500, result: "You paid the full amount and avoided any issues." },
      { text: "Pay in installments", cost: 1000, result: "You paid in installments and managed your budget better." },
    ],
  },
  {
    question: "You have an opportunity to attend a professional workshop. Do you go?",
    options: [
      { text: "Yes, it will help my career", cost: 2000, result: "You attended the workshop and it helped your career." },
      { text: "No, I can't afford it", cost: 0, result: "You decided not to attend the workshop to save money." },
    ],
  },
];

export default week4Scenarios;