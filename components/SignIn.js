import React, { useContext } from "react";

import { authContext } from "@/lib/store/auth-context";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";

function SignIn() {
    const { googleLoginHandler } = useContext(authContext);

    return (
        <main className="relative w-screen h-screen overflow-hidden flex flex-col justify-center items-center text-white">

            <Image
                src={'/bg.svg'}
                alt="Background"
                width={1200}
                height={600}
                className="absolute w-[92%] md:w-[97%] h-[92%] md:h-[95%] object-cover -z-10 mx-auto rounded-xl"
            />

            <div className="text-center flex flex-col gap-3 max-w-sm md:max-w-xl">
                <h1 className=" text-[2rem] font-bold">FinanceFolio</h1>
                <p className="text-xl text-gray-50  roboto">
                    Track expenses, manage budgets, and achieve financial goals seamlessly. Simplify your financial journey with our intuitive interface and powerful features.
                </p>
            </div>

            <div
                onClick={googleLoginHandler}
                className="group bg-white bg-opacity-20 rounded-xl border-2 border-zinc-100 border-opacity-20 flex px-4 py-2 mt-8 gap-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 items-center justify-center">
                <span className="text-white">Lets get Started</span>
                <FaArrowRightLong className="text-white w-0 group-hover:w-auto transition-all duration-1600 ease-in" />
            </div>

        </main>
    );
}

export default SignIn;