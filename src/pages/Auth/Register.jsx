import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
import { axiosServer } from "../../features/store";
import Header from "../../components/Header";
import "./Login.scss";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axiosServer.post("/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        setLoading(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("email", data.user.email);

        dispatch(
          setToken({
            token: data.token,
            name: data.user.name,
            email: data.user.email,
          })
        );
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="login_form">
        <form onSubmit={handleSubmit}>
          <h2>SIGN UP</h2>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Full Name"
            type="text"
          />
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            type="email"
          />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />

          <button type="submit" className="btn">
            {loading ? "Please Wait..." : "SIGNUP"}
          </button>
          <div className="links">
            <Link to="/login">Go back to login?</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
