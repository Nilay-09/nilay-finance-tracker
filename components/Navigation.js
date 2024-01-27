import { useContext } from "react";

import { authContext } from "@/lib/store/auth-context";

import { ImStatsBars } from "react-icons/im";
import Image from "next/image";

function Nav() {
    const { user, loading, logout } = useContext(authContext);

    return (
        <header className="container h-24 md:h-[8rem] relative flex items-end md:mb-4 mb-2">

            <Image
                src={'/navbg.svg'}
                alt="bgNav"
                width={1200}
                height={200}
                className="absolute w-full h-full -z-10 object-cover"
            />


                {/* User information */}
                {user && !loading && (
                    <div className="flex items-center gap-2 mb-3 mx-6 md:mx-[7.5rem] text-white text-[2.35rem] roboto font-semibold">
                        {/* img */}
                        <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                            <img
                                className="object-cover w-full h-full"
                                src={user.photoURL}
                                alt={user.displayName}
                                referrerPolicy="no-referrer"
                            />
                        </div>

                        {/* name */}
                        <small>Hi, {user.displayName}!</small>
                    </div>
                )}

                {/* Right side of our navigation */}
                {/* {user && !loading && (
                    <nav className="flex items-center gap-4">
                        <div>
                            <ImStatsBars className="text-2xl" />
                        </div>
                        <div>
                            <button onClick={logout} className="btn btn-danger">
                                Sign out
                            </button>
                        </div>
                    </nav>
                )} */}
        </header>
    );
}

export default Nav;