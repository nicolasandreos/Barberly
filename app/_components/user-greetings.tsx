"use client";

import { useSession } from "next-auth/react";

const UserGreetings = () => {
  const { data } = useSession();

  return (
    <>
      {data?.user ? (
        <h2 className="text-2xl">
          Hello, <span className="font-bold">{data?.user?.name}!</span>
        </h2>
      ) : (
        <h2 className="text-2xl">
          Hello, <span className="font-bold">Sign in to your account!</span>
        </h2>
      )}
    </>
  );
};

export default UserGreetings;
