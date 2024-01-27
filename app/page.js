"use client";

import { useState, useContext, useEffect } from "react";
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";

import { currencyFormatter } from "@/lib/utils";

import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";

import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import SignIn from "@/components/SignIn";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Nav from "@/components/Navigation";
import Image from "next/image";

ChartJS.register(ArcElement, Tooltip, Legend);


import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [ showAddIncomeModal, setShowAddIncomeModal ] = useState(false);
  const [ showAddExpenseModal, setShowAddExpenseModal ] = useState(false);

  const [ balance, setBalance ] = useState(0);

  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);

  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);

    setBalance(newBalance);
  }, [ expenses, income ]);

  if (!user) {
    return <SignIn />;
  }

  const neonColors = [
    "#ff00ff", // Neon Pink
    "#00ffff", // Neon Cyan
    "#ffcc00", // Neon Yellow
    "#ff0066", // Neon Magenta
    "#00ff66", // Neon Green
    "#ff9900", // Neon Orange
    "#cc00ff", // Neon Purple
    "#33ccff", // Neon Blue
    "#ff3366", // Neon Red
    "#66ffcc", // Neon Turquoise
  ];
  const getRandomBrightColor = () => {

    return neonColors[ Math.floor(Math.random() * neonColors.length) ];
  };

  const options = {
    scales: {
      x: {
        barThickness: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses Visualization',
      },
    },
  };
  const options2 = {

    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses',
      },
    },
  };
  const options3 = {

    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income',
      },
    },
  };

  return (
    <>
      {/* Add Income Modal */}
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      />

      {/* Add Expenses Modal */}
      <AddExpensesModal
        show={showAddExpenseModal}
        onClose={setShowAddExpenseModal}
      />
      <Nav />
      <main className="w-full px-6 md:px-[7.5rem] mx-auto overflow-hidden">
        <section className="py-3">
          <p className="text-[#6F6F6F] text-lg kd tracking-wide">Your Balance</p>
          <h2 className="text-4xl font-normal text-[#372B2B] kd">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">

          <button
            onClick={() => {
              setShowAddExpenseModal(true);
            }}
            className="bg-[#0063F7] px-6 py-[0.425rem] text-white kd flex gap-2"
          >
            <span><Image
              src={'/add.svg'}
              width={24}
              height={24}
            />
            </span>
            <span>Expenses</span>
          </button>
          <button
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
            className="border border-[#0063f7] px-6 py-[0.425rem] text-[#0063F7] kd flex gap-2"
          >
            <span><Image
              src={'/addB.svg'}
              width={24}
              height={24}
            />
            </span>
            <span>Add</span>
          </button>

        </section>
        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl text-[#372B2B] kd tracking-wide">Your Expense List</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => {
              return (<>
                <ExpenseCategoryItem key={expense.id} expense={expense} />
                <div class="border-t border-gray-300"></div>
              </>)
            })}
          </div>
        </section>
        
        <Bar
          data={{
            labels: expenses.map((expense) => expense.title),
            datasets: [
              {
                label: 'Expense',
                data: expenses.map((expense) => expense.total),
                backgroundColor: expenses.map(() => getRandomBrightColor()),
                barThickness: 20,
              },
            ],
          }}
          options={options}
        />

        <section className="py-6 flex flex-col md:flex-row justify-between">
          <div className=" w-[15.625rem] md:w-[21.875rem] mx-auto flex flex-col">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: [
                      "#ffcc00", // Neon Yellow
                      "#ff0066", // Neon Magenta
                      "#00ff66", // Neon Green
                      "#ff9900", // Neon Orange
                      "#cc00ff", // Neon Purple
                      "#33ccff", // Neon Blue
                      "#ff3366", // Neon Red
                      "#66ffcc", ],
                    borderWidth: 2,
                  },
                ],
              }}
              options={options2}
            />
          </div>
          <div className="w-[15.625rem] md:w-[21.875rem] mx-auto flex flex-col">
            <Doughnut
              data={{
                labels: income.map((expense) => expense.description),
                datasets: [
                  {
                    label: "Income",
                    data: income.map((expense) => expense.amount),
                    backgroundColor: income.map(() => getRandomBrightColor()),
                    borderColor: [
                      "#ffcc00", // Neon Yellow
                      "#ff0066", // Neon Magenta
                      "#00ff66", // Neon Green
                      "#ff9900", // Neon Orange
                      "#cc00ff", // Neon Purple
                      "#33ccff", // Neon Blue
                      "#ff3366", // Neon Red
                      "#66ffcc", ],
                    borderWidth: 2,
                  },
                ],
              }}
              options={options3}
            />
          </div>
        </section>

      

      </main>
    </>
  );
}
