export type Meal = {
  type: "Breakfast" | "Lunch" | "Dinner" | "Snacks";
  dish: string;
  cal: number;
  p: number;
  c: number;
  f: number;
};

export type WeekMeals = Record<string, Meal[]>;

export const MEAL_DATA: WeekMeals = {
  Mon: [
    { type: "Breakfast", dish: "Oats Idli with Sambar", cal: 280, p: 8, c: 42, f: 4 },
    { type: "Lunch", dish: "Brown Rice + Dal + Sabzi", cal: 520, p: 18, c: 78, f: 8 },
    { type: "Dinner", dish: "Roti + Paneer Curry", cal: 480, p: 22, c: 58, f: 14 },
    { type: "Snacks", dish: "Roasted Chana", cal: 120, p: 6, c: 18, f: 3 },
  ],
  Tue: [
    { type: "Breakfast", dish: "Poha with Peanuts", cal: 260, p: 7, c: 38, f: 7 },
    { type: "Lunch", dish: "Jeera Rice + Rajma", cal: 540, p: 20, c: 82, f: 9 },
    { type: "Dinner", dish: "Chapati + Mixed Veg", cal: 460, p: 14, c: 68, f: 10 },
    { type: "Snacks", dish: "Banana + Almonds", cal: 150, p: 4, c: 28, f: 5 },
  ],
  Wed: [
    { type: "Breakfast", dish: "Upma with Coconut Chutney", cal: 240, p: 6, c: 36, f: 6 },
    { type: "Lunch", dish: "Curd Rice + Pickle", cal: 480, p: 12, c: 76, f: 7 },
    { type: "Dinner", dish: "Roti + Dal Tadka", cal: 440, p: 16, c: 64, f: 8 },
    { type: "Snacks", dish: "Sprouts Chaat", cal: 130, p: 8, c: 20, f: 2 },
  ],
  Thu: [
    { type: "Breakfast", dish: "Idli Sambar (3 pieces)", cal: 250, p: 7, c: 40, f: 3 },
    { type: "Lunch", dish: "Vegetable Biryani", cal: 560, p: 14, c: 88, f: 12 },
    { type: "Dinner", dish: "Chapati + Palak Paneer", cal: 490, p: 20, c: 60, f: 16 },
    { type: "Snacks", dish: "Apple + Peanut Butter", cal: 160, p: 5, c: 24, f: 7 },
  ],
  Fri: [
    { type: "Breakfast", dish: "Dosa with Coconut Chutney", cal: 270, p: 6, c: 44, f: 6 },
    { type: "Lunch", dish: "Rice + Sambar + Papad", cal: 500, p: 14, c: 80, f: 8 },
    { type: "Dinner", dish: "Roti + Chana Masala", cal: 470, p: 18, c: 70, f: 10 },
    { type: "Snacks", dish: "Murmura Chaat", cal: 110, p: 3, c: 22, f: 2 },
  ],
  Sat: [
    { type: "Breakfast", dish: "Besan Chilla", cal: 230, p: 9, c: 32, f: 7 },
    { type: "Lunch", dish: "Veg Pulao + Raita", cal: 510, p: 12, c: 80, f: 10 },
    { type: "Dinner", dish: "Roti + Aloo Gobi", cal: 450, p: 12, c: 68, f: 10 },
    { type: "Snacks", dish: "Dates + Walnuts", cal: 140, p: 3, c: 26, f: 5 },
  ],
  Sun: [
    { type: "Breakfast", dish: "Methi Paratha + Curd", cal: 300, p: 10, c: 44, f: 9 },
    { type: "Lunch", dish: "Dal Khichdi + Ghee", cal: 530, p: 16, c: 82, f: 11 },
    { type: "Dinner", dish: "Roti + Mixed Dal", cal: 460, p: 18, c: 66, f: 8 },
    { type: "Snacks", dish: "Roasted Makhana", cal: 100, p: 4, c: 16, f: 2 },
  ],
};

export const MEAL_COLORS: Record<string, string> = {
  Breakfast: "border-l-primary",
  Lunch: "border-l-healix-button",
  Dinner: "border-l-primary",
  Snacks: "border-l-accent",
};
