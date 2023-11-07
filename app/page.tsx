import { PrismaClient } from "@prisma/client";
import { Home } from "~/components/Home";
import prisma from "~/lib/prisma";

async function getData() {
  // const result = await prisma.user.create({
  //   data: {
  //     name: "Kavaya",
  //     email: "demo@dem.com",
  //   },
  // });

  return prisma.user.findMany({});
  // const res = await fetch("https://api.example.com/...");
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }
  // return res.json();
}

const HomePage = async () => {
  debugger;
  const users = await getData();
  debugger;
  console.log(users);
  return <Home dates={users[0]?.dates} />;
};

export default HomePage;
