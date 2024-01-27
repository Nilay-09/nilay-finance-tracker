import { useState } from "react";

import { currencyFormatter } from "@/lib/utils";

import ViewExpenseModal from "./modals/ViewExpenseModal";

function ExpenseCategoryItem({ expense }) {
    const [ showViewExpenseModal, setViewExpenseModal ] = useState(false);

    return (
        <>
            <ViewExpenseModal
                show={showViewExpenseModal}
                onClose={setViewExpenseModal}
                expense={expense}
            />
            <button
                onClick={() => {
                    setViewExpenseModal(true);
                }}
                className="hover:scale-105"
            >
                <div className="flex items-center justify-between px-4 py-4 rounded-3xl">
                    <p className="text-[#0D1A26] font-normal roboto">{currencyFormatter(expense.total)}</p>
                    <div className="flex items-center gap-2 px-6 capitalize text-[#5C6670]">
                        {expense.title}
                    </div>
                    <p className="text-sm text-[#047D95] font-bold">Details</p>
                </div>
            </button>
        </>
    );
}

export default ExpenseCategoryItem;