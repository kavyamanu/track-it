"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isFuture,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const capitalize = (query: string): string => {
  return query.charAt(0).toUpperCase() + query.substring(1);
};

export const Home = ({ dates }) => {
  // console.log(dates);
  const today = startOfToday();
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];
  const [date, setDate] = useState([]);
  const saveDates = (day) => {
    if (!date.includes(day)) setDate((date) => [day, ...date]);
    else setDate((date) => date.filter((e) => e !== day));
  };
  // console.log(date);
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
  };

  const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-12">
      <div className="flex place-items-center justify-around items-center w-screen">
        <Link type="button" href="/">
          <Image
            src="/trackit.png"
            width={80}
            height={80}
            alt="logo"
            className="border border-red-300 rounded-3xl"
          />
        </Link>
        <div className="flex flex-col items-center mt-6">
          <p className="text-5xl text-red-500 font-bold p-4">
            My Period Tracker
          </p>
          <p className="text-gray-500">Be a bit stronger everyday</p>
        </div>
        <Link
          className="rounded-full bg-red-600 px-8 py-2.5 text-m font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          href="/api/auth/signin"
        >
          SIGN IN
        </Link>
      </div>

      <div className="p-8 w-screen h-4/5 flex items-center justify-center">
        <div className="w-[900px] h-[600px]">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-xl">
              {format(firstDayOfMonth, "MMMM yyyy")}
            </p>
            <div className="flex items-center justify-evenly gap-6 sm:gap-12">
              <ChevronLeftIcon
                className="w-6 h-6 cursor-pointer"
                onClick={getPrevMonth}
              />
              <ChevronRightIcon
                className="w-6 h-6 cursor-pointer"
                onClick={getNextMonth}
              />
            </div>
          </div>
          <hr className="my-6" />
          <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
            {days.map((day, idx) => {
              return (
                <div key={idx} className="font-semibold">
                  {capitalize(day)}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-7 gap-6 sm:gap-12 mt-8 place-items-center">
            {daysInMonth.map((day, idx) => {
              return (
                <div key={idx} className={colStartClasses[getDay(day)]}>
                  <p
                    className={`cursor-pointer flex items-center justify-center font-semibold h-8 w-8 rounded-full ${
                      isFuture(day) ? "text-gray-400" : "text-gray-900"
                    } ${!isToday(day) && "hover:bg-red-200"} ${
                      isToday(day) && "border border-red-500"
                    } ${
                      date.includes(format(day, "d MMM yyyy")) &&
                      " bg-red-500 text-white"
                    }`}
                    onClick={() => saveDates(format(day, "d MMM yyyy"))}
                  >
                    {format(day, "d")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="gap-5 flex flex-col w-screen items-center h-20 overflow-scroll">
        <p className="text-2xl text-pink-600 font-medium">Period History</p>
        <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
          {date[0] &&
            date.map((eachDate, index) => (
              <li className="flex items-center space-x-3 " key={index}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="font-bold">{eachDate}</span>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
};
