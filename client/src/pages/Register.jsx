import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import googleicon from "../assets/google.png";
import facebookicon from "../assets/facebook.png";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/create",
        {
          name,
          email,
          password,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error, "Error in register component, or user already exist");
    }
  };
  return (
    <>
      <div className="flex justify-center py-14 items-center bg-gray-100">
        <div className=" drop-shadow-xl  w-[80%] h-[80vh] bg-white flex flex-row">
          <section className="bg-[#33D69F] w-[50%] h-full text-center flx items-center justify-center flex-col py-24">
            <h1 className="font-bold text-4xl text-white drop-shadow-2xl">
              Welcome
            </h1>
            <p>
              This aplication for Every user can travel with random strangers
            </p>
          </section>
          <section className="bg-white w-[50%] h-full flex flex-col items-center justify-center gap-3 ">
            <h1 className="text-[#33D69F] font-bold text-2xl mb-5">Register</h1>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Name "
              className="px-11 py-3 border border-[#33D69F] "
            />
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Email "
              className="px-11 py-3 border border-[#33D69F] "
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password "
              className="px-11 py-3 border  border-[#33D69F] "
            />
            <div className="flex flex-row gap-5">
              <img className="w-7" src={googleicon} alt="" />
              <img className="w-7" src={facebookicon} alt="" />
            </div>
            <Link to="/">
              {" "}
              <button
                onClick={handleSubmit}
                className="bg-[#33D69F] px-[20%] py-3 font-semibold border border-[#33D69F] "
              >
                Submit
              </button>
            </Link>
            <Link to="/login">
              <h1>Log in</h1>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

export default Register;
