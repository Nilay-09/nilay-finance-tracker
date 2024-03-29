"use client";

import { useState, useContext, useRef } from "react";
import { financeContext } from "@/lib/store/finance-context";

import { v4 as uuidv4 } from "uuid";

import Modal from "@/components/Modal";

function AddExpensesModal({ show, onClose }) {
    const [ expenseAmount, setExpenseAmount ] = useState("");
    const [ showAddExpense, setShowAddExpense ] = useState(false);

    const { expenses, addExpenseItem, addCategory } = useContext(financeContext);
    const i = expenses.length > 0 ? expenses[ 0 ] : null;

    // console.log()
    const [ selectedCategory, setSelectedCategory ] = useState(i && i.id ? i.id : null);

    const titleRef = useRef();
    const colorRef = useRef();

    const addExpenseItemHandler = async () => {
        const expense = expenses.find((e) => {
            return e.id === selectedCategory;
        });

        const newExpense = {
            color: expense.color,
            title: expense.title,
            total: expense.total + +expenseAmount,
            items: [
                ...expense.items,
                {
                    amount: +expenseAmount,
                    createdAt: new Date(),
                    id: uuidv4(),
                },
            ],
        };

        try {
            await addExpenseItem(selectedCategory, newExpense);

            console.log(newExpense);
            setExpenseAmount("");
            setSelectedCategory(null);
            onClose();
        } catch (error) {
            console.log(error.message);
        }
    };

    const addCategoryHandler = async () => {
        const title = titleRef.current.value.trim();
        const color = colorRef.current.value;

        if (!title) {
            console.log("Title cannot be empty");
            return;
        }

        try {
            await addCategory({ title, color, total: 0 });
            setShowAddExpense(false);
        } catch (error) {
            console.log(error.message);
        }
    };
    const getRandomColor = () => {
        // Generate a random color in hexadecimal format
        const letters = "89ABCDEF"; // Brighter color options
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[ Math.floor(Math.random() * letters.length) ];
        }
        return color;
    };
    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex flex-col gap-4">
                <label>Enter an amount..</label>
                <input
                    type="number"
                    min={0.01}
                    step={0.01}
                    placeholder="Enter expense amount"
                    value={expenseAmount}
                    onChange={(e) => {
                        setExpenseAmount(e.target.value);
                    }}
                />
            </div>

            {/* Expense Categories */}
            {/* {expenseAmount > 0 && ( */}
            <div className="flex flex-col gap-4 mt-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl capitalize">Select expense category</h3>
                    <button
                        onClick={() => {
                            setShowAddExpense(true);
                        }}
                        className="text-[#047D95] font-bold"
                    >
                        + Create New Category
                    </button>
                </div>

                {showAddExpense && (
                    <div className="flex items-center justify-between">
                        <input type="text" placeholder="Enter Title" ref={titleRef} />

                        <label>Pick Color</label>
                        <input type="color" className="w-24 h-10" value={getRandomColor()} ref={colorRef} />
                        <button
                            onClick={addCategoryHandler}
                            className="text-[#047D95]"
                        >
                            Create
                        </button>
                        <button
                            onClick={() => {
                                setShowAddExpense(false);
                            }}
                            className="btn btn-danger"
                        >
                            Cancel
                        </button>
                    </div>
                )}
                <div className="flex flex-col gap-3 overflow-y-scroll px-4 h-[12.5rem] my-2">
                    {expenses.map((expense) => {
                        return (
                            <button
                                key={expense.id}
                                onClick={() => {
                                    setSelectedCategory(expense.id);
                                }}
                            >
                                <div
                                    style={{
                                        boxShadow:
                                            expense.id === selectedCategory ? "1px 1px 4px" : "none",
                                    }}
                                    className="flex items-center justify-between px-4 py-4 bg-[#5b8cef48] rounded-3xl"
                                >
                                    <div className="flex items-center gap-2">
                                        {/* Colored circle */}
                                        <div
                                            className="w-[25px] h-[25px] rounded-full"
                                            style={{
                                                backgroundColor: expense.color,
                                            }}
                                        />
                                        <h4 className="capitalize">{expense.title}</h4>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
            {/* )} */}

            {expenseAmount > 0 && selectedCategory && (
                <span className="bg-blue-100 p-2 rounded-md">
                    <button className="text-[#047D95] font-bold text-sm" onClick={addExpenseItemHandler}>
                        Add Expense
                    </button>
                </span>
            )}
        </Modal>
    );
}

export default AddExpensesModal;