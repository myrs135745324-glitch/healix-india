export const USER_DATA = {
  name: "Priya",
  age: 21,
  gender: "Female",
  role: "Hostel Student",
  stats: { height: 160, weight: 58, bmi: 22.6, blood: "B+" },
  conditions: ["Diabetes", "PCOS"],
  goals: ["Manage Condition", "Eat Healthier"],
  activity: "Medium",
  budget: "Rs 50-150",
  language: "Telugu",
  location: "Hyderabad",
  meds: [
    { id: 1, name: "Metformin 500mg", time: "Morning", status: "taken" as const },
    { id: 2, name: "Vitamin D3", time: "Afternoon", status: "pending" as const },
    { id: 3, name: "Iron tablet", time: "Night", status: "pending" as const },
  ],
};

export type MedStatus = "taken" | "pending";
export type Med = { id: number; name: string; time: string; status: MedStatus };

export const WEEKLY_LOGS = [
  { day: "Mon", steps: 5200, water: 1800, calories: 1400 },
  { day: "Tue", steps: 6100, water: 2100, calories: 1550 },
  { day: "Wed", steps: 4800, water: 1600, calories: 1380 },
  { day: "Thu", steps: 7200, water: 2400, calories: 1620 },
  { day: "Fri", steps: 5900, water: 1900, calories: 1500 },
  { day: "Sat", steps: 4200, water: 1200, calories: 1240 },
  { day: "Sun", steps: 0, water: 0, calories: 0 },
];

export const EXPENSES = [
  { id: 1, date: "12 Mar", category: "Food", description: "Mess bill - Week 2", amount: 840 },
  { id: 2, date: "10 Mar", category: "Medicine", description: "Metformin strip", amount: 120 },
  { id: 3, date: "09 Mar", category: "Food", description: "Fruits from market", amount: 180 },
  { id: 4, date: "07 Mar", category: "Doctor", description: "PCOS checkup", amount: 500 },
  { id: 5, date: "05 Mar", category: "Medicine", description: "Vitamin D3 + Iron", amount: 280 },
  { id: 6, date: "03 Mar", category: "Food", description: "Mess bill - Week 1", amount: 840 },
  { id: 7, date: "01 Mar", category: "Medicine", description: "Metformin strip", amount: 120 },
  { id: 8, date: "28 Feb", category: "Food", description: "Snacks & fruits", amount: 220 },
];
