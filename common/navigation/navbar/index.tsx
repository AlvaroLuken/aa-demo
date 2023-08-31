"use client";

import { useAuth } from "@common/auth/AuthProvider";
import alchemyLogo from "@public/assets/alchemy-logo.svg";
import gonPfp from "@public/assets/gon_freecs.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import userbase from "userbase-js";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [isOnLoginPage, setIsOnLoginPage] = useState(false);

  useEffect(() => {
    setIsOnLoginPage(pathname === "/login");
  }, []);

  function handleLogout() {
    try {
      userbase
        .signOut()
        .then(() => {
          // user logged out
          console.log("User logged out!");
          logout();
          router.push("/");
        })
        .catch((e: any) => console.error(e));
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred."); // Update the error state
    }
  }

  return (
    <div className="navbar bg-base-100 font-mono bg-[#232939] h-12">
      <div className="flex-1">
        {/* <button
          onClick={() => router.push("/")}
          className="btn btn-ghost normal-case text-xl text-white"
        >
          Alchemy Demo Dapp
        </button> */}
        <Image
          onClick={() => router.push("/")}
          className="ml-1.5 cursor-pointer"
          width={164}
          height={100}
          src={alchemyLogo}
          alt="logo"
        />
      </div>
      <div className="flex gap-2">
        {user?.isLoggedIn ? (
          <button className="btn btn-primary">Logged In</button>
        ) : (
          <div className="flex gap-2">
            {!isOnLoginPage ? (
              <button
                onClick={() => router.push("/login")}
                className="btn hover:bg-[#4f6fdb] bg-[#324996] text-white"
              >
                Login
              </button>
            ) : (
              ""
            )}
          </div>
        )}

        <div
          className={`dropdown dropdown-end ${
            user?.isLoggedIn ? "visible" : "hidden"
          }`}
        >
          <label
            tabIndex={0}
            className={`btn btn-ghost btn-circle avatar ${
              user?.isLoggedIn ? "" : "cursor-default"
            }`}
          >
            <div className="w-10 rounded-full">
              <Image src={gonPfp} alt="gon-freecs" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className={`mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 ${
              user?.isLoggedIn ? "" : "hidden"
            }`}
          >
            {user?.isLoggedIn ? (
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
