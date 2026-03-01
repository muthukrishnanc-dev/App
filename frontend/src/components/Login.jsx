import React, { useState } from "react";
import Task from "./Task";
import { TbXboxX } from "react-icons/tb";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import "../components/Login.css";
import banner from "../assets/logo.jpg";
import Button from "../Button";
function Login() {
  const [login, setlogin] = useState(true);
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  // store token
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = details;

    // validation
    if (login) {
      if (!email || !password) {
        setErr("Email and Password Required");
      }
    } else {
      if (!username || !email || !password) {
        setErr("Must fill all fields");
      }
    }
    try {
      const endpoint = login ? "/auth/login" : "/auth/register";
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (!res.ok) {
        setErr(data.message);
        setTimeout(() => {
          setErr("");
        }, 2000);
        return;
      }
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      setErr("Something went wrong");
      setTimeout(() => {
        // setErr(" ");
        setErr("");
      }, 2000);
    }

    console.log(err);
    setDetails({
      username: "",
      email: "",
      password: "",
    });
  };

  const [showpwd, setShowPwd] = useState(false);
  if (user) {
    return (
      <Task
        user={user}
        userId={user.id}
        username={user.username}
        setUser={setUser}
        setDetails={setDetails}
      />
    );
  }
  return (
    <div className="form_handler">
      <div className="form">
        {err && (
          <div className="showError">
            <span>{err}</span>
            <button onClick={() => setErr("")}>
              <TbXboxX size={20} />
            </button>
          </div>
        )}
        <h2 className="heading">{login ? "Login" : "Signup"}</h2>
        <form onSubmit={handleSubmit} method="POST">
          {!login && (
            <label htmlFor="username">
              <input
                type="text"
                name="username"
                id="username"
                value={details.username}
                onChange={(e) =>
                  setDetails({ ...details, [e.target.name]: e.target.value })
                }
                placeholder="username"
              />
            </label>
          )}
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, [e.target.name]: e.target.value })
              }
              placeholder="email"
            />
          </label>
          <label htmlFor="password" className="pwdbtn">
            <input
              type={showpwd ? "text" : "password"}
              name="password"
              id="password"
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, [e.target.name]: e.target.value })
              }
              placeholder="password"
            />
            <button
              id="showbtn"
              type="button"
              onClick={() => setShowPwd(!showpwd)}
            >
              {showpwd ? (
                <LuEyeClosed size={"20px"} />
              ) : (
                <LuEye size={"20px"} />
              )}
            </button>
          </label>
          <Button type="submit" className="custom_btn">
            {login ? "Login" : "Signup"}
          </Button>
        </form>
        <p>
          {login ? "Create Account" : "Already have Account"}
          <button onClick={() => setlogin(!login)}>
            {login ? "Signup" : "Login"}
          </button>
        </p>
      </div>
      <div className="banner">
        <img src={banner} alt="" />
      </div>
    </div>
  );
}

export default Login;
