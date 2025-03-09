const week3Scenarios = [
  {
    question: "Your friend invites you to a weekend getaway. Do you go?",
    options: [
      { text: "Yes, I need a break", cost: -1500, result: "You went on the weekend getaway and had a relaxing time." },
      { text: "No, I need to save money", cost: 0, result: "You stayed home and saved money." },
    ],
  },
  {
    question: "Your phone breaks and you need a new one. What do you do?",
    options: [
      { text: "Buy a new phone", cost: -3000, result: "You bought a new phone and it works perfectly." },
      { text: "Get it repaired", cost: -1000, result: "You got your phone repaired and it works fine." },
      { text: "Use an old spare phone", cost: 0, result: "You used an old spare phone, but it's not very reliable." },
    ],
  },
  {
    question: "You find a part-time job opportunity. Do you take it?",
    options: [
      { text: "Yes, I need extra income", cost: 0, result: "You took the part-time job and earned extra income." },
      { text: "No, I can't handle more stress", cost: 0, result: "You decided not to take the part-time job and avoided extra stress." },
    ],
  },
  {
    question: "Your car needs urgent repairs. What do you do?",
    options: [
      { text: "Get it repaired immediately", cost: -2000, result: "You got your car repaired and it's running smoothly." },
      { text: "Delay the repairs", cost: 0, result: "You delayed the repairs, but your car's condition worsened." },
    ],
  },
  {
    question: "You receive a surprise bonus at work. How do you use it?",
    options: [
      { text: "Save it all", cost: 1000, result: "You saved the bonus and increased your savings." },
      { text: "Spend it on something nice", cost: 0, result: "You spent the bonus on something nice and enjoyed it." },
    ],
  },
  {
    question: "Your friend asks you to lend them some money. Do you help?",
    options: [
      { text: "Yes, I can help", cost: -1000, result: "You lent money to your friend and they appreciated it." },
      { text: "No, I need to save", cost: 0, result: "You decided not to lend money and saved it instead." },
    ],
  },
  {
    question: "You find a great deal on a new gadget. Do you buy it?",
    options: [
      { text: "Yes, it's a great deal", cost: -2000, result: "You bought the new gadget and are happy with the purchase." },
      { text: "No, I need to save money", cost: 0, result: "You decided not to buy the gadget and saved money." },
    ],
  },
];

export default week3Scenarios;