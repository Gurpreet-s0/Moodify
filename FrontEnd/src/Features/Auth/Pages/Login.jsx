import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { loginHandler, loading } = UseAuth();

  function submitHandler(e) {
    e.preventDefault();

    loginHandler({ email, password: Password })
      .then((res) => {
        console.log(res);
        navigate("/");
        setEmail("");
        setPassword("");
      })
      .catch((res) => {
        console.log(res);
      });
  }
  return loading ? (
    <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2">
      <div className="text-gray-500 flex items-center gap-3 justify-center h-full w-full flex-col ">
        <h1 className="text-4xl mb-5">Loading...</h1>
      </div>
    </div>
  ) : (
    <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2">
      <div className="text-slate-900 flex items-center gap-3 justify-center h-full w-full flex-col ">
        <h1 className="text-4xl mb-5">Login</h1>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col items-center justify-center gap-5 mb-5"
        >
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="border rounded-3xl px-6 py-3 text-center  "
            type="text"
            placeholder="Email"
            value={email}
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className=" border rounded-3xl  px-6 py-3  text-center "
            type="password"
            required
            placeholder="Password"
            value={Password}
          />
          <Link className="hover:underline" to="/register">
            Already have an account?
          </Link>
          <button className=" text-slate-900 px-6 py-3  rounded-3xl hover:bg-slate-900 hover:text-amber-50 transition cursor-pointer duration-250  ">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
