import { FormEvent, useState } from "react";
import Header from "src/components/Header";
import Input from "src/components/Input";
import Router from "next/router";

export default function create() {
  const [user, setUser] = useState({
    name: "",
  });

  const updatePost = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [sent, setSent] = useState(false);

  async function sendPost(data) {
    console.log(data)
    const saved = await fetch(window.location.origin + "/api/users/create", {
      method: "post",
      body: JSON.stringify({
        ...data
      }),
    });
  }

  function handlePostDelivery(e: FormEvent) {
    e.preventDefault();
    sendPost(user)
      .then((saved) => {
        Router.push("/users");
        setSent(typeof saved !== "undefined");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Header>Add User</Header>
      <form
        onSubmit={handlePostDelivery}
        className="flex flex-wrap w-full md:w-64 items-center justify-center space-y-2"
      >
        <div className="w-full">
          <Input
            value={user.name}
            name="name"
            onChange={updatePost}
            placeholder="Name"
          />
        </div>
        <div className="w-full text-center">
          <button className="px-3 py-1.5 bg-blue-400 text-white rounded-md">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
