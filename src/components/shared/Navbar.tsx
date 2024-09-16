"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { links } from "../../../constants/constants";
import Link from "next/link";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { userAuthStore } from "@/store/authStore";
import Notifications from "./Notifications";

const Navbar = () => {
  const { fetchUser, user, logout } = userAuthStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser, user]);

  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 sticky top-0 flex items-center justify-between px-5 backdrop-blur-md bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="bg-gradient-to-b text-3xl font-bold from-violet-200 flex items-center to-violet-950 bg-clip-text bg-transparent dark:from-violet-50 dark:to-violet-300 text-transparent">
        <Home className="text-slate-800 mt-1 mr-1 dark:text-slate-200" />
        EstateWave
      </div>

      <div className="lg:hidden flex items-center">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex lg:flex-1 items-center lg:justify-center lg:space-x-5">
        <div className="flex-1 flex justify-center space-x-5">
          {links.map((item) => (
            <Link
              key={item.location}
              className={`${
                path === item.location
                  ? "font-medium underline underline-offset-4 text-violet-500"
                  : "font-medium"
              }`}
              href={item.location}
            >
              {item.text}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {user === null ? (
            <>
              <Button>
                <Link href="/signup">SignUp</Link>
              </Button>
              <Button>
                <Link href="/login">Login</Link>
              </Button>
            </>
          ) : (
            <>
              <Notifications user={user} />
              <Button>
                <Link href={`/profile/${user.id}`} className="flex items-center space-x-2">
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-5 h-5 rounded-full"
                  />
                  {user.email}
                </Link>
              </Button>
              <Button variant="destructive" onClick={() => logout()}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-lg transition-transform transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col items-start p-4 space-y-4">
          <div className="w-full flex justify-between items-center mb-4">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-violet-200 to-violet-950 dark:from-violet-50 dark:to-violet-300">
              EstateWave
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <div className="space-y-4">
            {links.map((item) => (
              <Link
                key={item.location}
                className={`block text-lg ${
                  path === item.location
                    ? "font-medium underline underline-offset-4 text-violet-500"
                    : "font-medium"
                }`}
                href={item.location}
                onClick={() => setIsOpen(false)}
              >
                {item.text}
              </Link>
            ))}
            {user === null ? (
              <>
                <Button className="w-full">
                  <Link href="/signup">SignUp</Link>
                </Button>
                <Button className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
              </>
            ) : (
              <>
                <Notifications user={user} />
                <Button className="w-full">
                  <Link href={`/profile/${user.id}`} className="flex items-center space-x-2">
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-5 h-5 rounded-full"
                    />
                    {user.email}
                  </Link>
                </Button>
                <Button variant="destructive" className="w-full" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
