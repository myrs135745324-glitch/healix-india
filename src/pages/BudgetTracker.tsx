import { useState } from "react";
import { Plus, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import { EXPENSES } from "@/data/userData";
import { useToast } from "@/hooks/use-toast";

const WEEKLY_BUDGET = [
  { week: "Week 1", Food: 840, Medicine: 120 },
  { week: "Week 2", Food: 1020, Medicine: 280 },
  { week: "Week 3", Food: 980, Medicine: 220 },
  { week: "Week 4", Food: 0, Medicine: 0 },
];

const FILTERS = ["All", "Food", "Medicine", "Doctor"];

export default function BudgetTracker() {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: "Food", amount: "", description: "", date: "2026-03-14" });

  const filtered = activeFilter === "All" ? EXPENSES : EXPENSES.filter(e => e.category === activeFilter);

  const saveExpense = () => {
    if (!newExpense.amount) return;
    setShowModal(false);
    setNewExpense({ category: "Food", amount: "", description: "", date: "2026-03-14" });
    toast({ title: "✅ Expense saved!", duration: 2500 });
  };

  return (
    <div className="space-y-8 relative">
      {/* Month selector */}
      <div className="flex items-center justify-center gap-4">
        <button className="text-muted-foreground hover:text-foreground">←</button>
        <h3 className="text-lg font-bold text-foreground">March 2026</h3>
        <button className="text-muted-foreground hover:text-foreground">→</button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: "🍱", label: "Food", spent: 2840, budget: 3000 },
          { icon: "💊", label: "Medicine", spent: 620, budget: 1000 },
          { icon: "🏥", label: "Doctor", spent: 500, budget: 800 },
        ].map(item => (
          <div key={item.label} className="bg-card border border-border rounded-lg p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span>{item.icon}</span>
              <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
            </div>
            <p className="text-xl font-bold text-foreground">
              ₹{item.spent.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">/ ₹{item.budget.toLocaleString()}</span>
            </p>
            <div className="w-full h-2 bg-secondary rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-healix-button rounded-full"
                style={{ width: `${Math.min((item.spent / item.budget) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-right">{Math.round((item.spent / item.budget) * 100)}%</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="space-y-6">
          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-foreground">Weekly Breakdown</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_BUDGET}>
                  <XAxis dataKey="week" axisLine={false} tickLine={false} className="text-xs" />
                  <YAxis hide />
                  <Legend />
                  <Bar dataKey="Food" fill="hsl(88, 51%, 52%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Medicine" fill="hsl(121, 58%, 43%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Savings */}
          <div className="bg-background rounded-lg p-6 shadow-sm border-l-4 border-primary">
            <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">💡 AI Savings Tip</p>
            <p className="text-sm text-foreground italic leading-relaxed">
              "Switch your Metformin to Jan Aushadhi generic — same compound, ₹12 vs ₹45 per strip. You'd save ₹396/year on just one medicine!"
            </p>
            <button className="mt-3 text-xs font-bold text-healix-button hover:underline">
              Find Jan Aushadhi →
            </button>
          </div>
        </div>

        {/* Expenses table */}
        <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-foreground">Recent Expenses</h3>
          <div className="flex gap-2 mb-4">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all
                  ${activeFilter === f ? "bg-primary text-primary-foreground" : "bg-background border border-border text-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-3 py-2 text-left rounded-tl-lg">Date</th>
                  <th className="px-3 py-2 text-left">Category</th>
                  <th className="px-3 py-2 text-left">Description</th>
                  <th className="px-3 py-2 text-right rounded-tr-lg">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e, i) => (
                  <tr key={e.id} className={i % 2 === 0 ? "bg-background" : "bg-card"}>
                    <td className="px-3 py-2 text-muted-foreground">{e.date}</td>
                    <td className="px-3 py-2">{e.category}</td>
                    <td className="px-3 py-2">{e.description}</td>
                    <td className="px-3 py-2 text-right font-bold">₹{e.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-healix-button text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-30"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-foreground/30 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 w-full max-w-md shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-foreground">Add Expense</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <select
              value={newExpense.category}
              onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
              className="w-full bg-card border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option>Food</option>
              <option>Medicine</option>
              <option>Doctor</option>
            </select>
            <input
              type="number"
              placeholder="Amount (₹)"
              value={newExpense.amount}
              onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="w-full bg-card border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="text"
              placeholder="Description"
              value={newExpense.description}
              onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
              className="w-full bg-card border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="date"
              value={newExpense.date}
              onChange={e => setNewExpense({ ...newExpense, date: e.target.value })}
              className="w-full bg-card border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button onClick={saveExpense} className="w-full py-3 bg-healix-button text-primary-foreground font-bold rounded-lg text-sm">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
