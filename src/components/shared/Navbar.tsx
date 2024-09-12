"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import { links } from "../../../constants/constants";
import Link from "next/link";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { userAuthStore } from "@/store/authStore";

const Navbar = () => {
  const { fetchUser, user, logout } = userAuthStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser, user]);

  const path = usePathname();
  return (
    <div className="p-4 justify-between sticky top-0 flex items-center px-5 backdrop-blur-md">
      <div className="bg-gradient-to-b text-3xl font-bold from-violet-200 flex items-center to-violet-950 bg-clip-text bg-transparent dark:from-violet-50 dark:to-violet-300 text-transparent">
        <Home className="text-slate-800 mt-1 mr-1 dark:text-slate-200" />
        EstateWave
      </div>
      <div className="links space-x-3">
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
      <div className="buttons items-center space-x-3">
        <ModeToggle />
        {user === null ? (
          <>
            {" "}
            <Button>
              <Link href="/signup">SignUp</Link>{" "}
            </Button>
            <Button>
              <Link href="/login">Login</Link>{" "}
            </Button>
          </>
        ) : (
          <>

            <Button>
              <Link href={`/profile/${user.id}`} className="flex items-center space-x-2">
                <img
                  src={user.profileImage}
                  alt="CN"
                  className="w-5 h-5 rounded-full mr-2"
                />
                {user.email}
              </Link>{" "}
            </Button>
            <Button variant="destructive" onClick={() => logout()}>
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
