import React, { useState } from 'react'
import { Link } from 'react-router';
const Login = () => {
  const [username, setusername] = useState("");
  const [Password, setPassword] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    setusername("");
    setPassword("");
  }
  return (
    <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2">
      <div className="text-amber-50 flex items-center gap-3 justify-center h-full w-full flex-col ">
        <h1 className="text-4xl mb-5">Login</h1>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col items-center justify-center gap-5 mb-5"
        >
          <input
            onChange={(e) => {
              setusername(e.target.value);
            }}
            className="border rounded-3xl px-6 py-3 text-center  "
            type="text"
            placeholder="Username"
            value={username}
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className=" border rounded-3xl  px-6 py-3  text-center "
            type="text"
            placeholder="Password"
            value={Password}
          />
          <Link className="hover:underline" to="/register">
            Already have an account?
          </Link>
          <button className="bg-amber-50 border-2 border-amber-50 text-[#141313] px-6 py-3  rounded-3xl hover:bg-[#141313] hover:text-amber-50 transition cursor-pointer duration-250  ">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login