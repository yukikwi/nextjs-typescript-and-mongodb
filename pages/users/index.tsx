import Link from "next/link";
import { IUser } from "src/Models/User";
import { useEffect, useState } from "react";
import Header from "src/components/Header";

export default function Usuarios() {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const asyncGetUsers = async () => {
      const { origin } = window.location;
      const data = await fetch(origin + "/api/users");
      const users = await data.json();
      return users;
    };
    if (window) {
      asyncGetUsers()
        .then((users) => {
          setUsers(users);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const mappedUser = users.reverse().map((userdata, i) => (
    <div
      style={{
        transition: "0.12s",
      }}
      className="break-words p-4 rounded-md text-sm w-full sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/6 border-2 hover:bg-gray-100 m-1 cursor-pointer"
      key={Math.random()}
    >
      <b className="my-2">{userdata._id}</b>
      <br />
      <p className="my-4">{userdata.name}</p>
    </div>
  ));

  return (
    <div>
      <Header>Total User: {users.length}</Header>
      <div className="flex space-x-4">
        <Link href="/">
          <div className="bg-red-400 inline-block px-2 py-1 text-white cursor-pointer">
            Back
          </div>
        </Link>
        <Link href="/users/create">
          <div className="bg-blue-400 inline-block px-2 py-1 text-white cursor-pointer">
            Add one
          </div>
        </Link>
      </div>
      <div className="py-4 flex flex-wrap overflow-y-scroll h-96 md:h-72 my-4 border-4 rounded-md">
        {mappedUser}
      </div>
    </div>
  );
}
