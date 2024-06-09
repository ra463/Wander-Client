import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
import { axiosServer } from "../../features/store";
import Header from "../../components/Header";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      alert("Please fill all fields");
    }

    try {
      setLoading(true);
      const { data } = await axiosServer.post("/api/user/login", {
        email,
        password,
      });

      if (data?.success) {
        setLoading(false);
        localStorage.setItem("token", data?.token);
        localStorage.setItem("name", data?.user.name);
        localStorage.setItem("email", data?.user.email);

        dispatch(
          setToken({
            token: data?.token,
            firstName: data?.user.name,
            email: data?.user.email,
          })
        );
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="login_form">
        <form onSubmit={handleSubmit}>
          <h2>SIGN IN</h2>
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

          <button type="submit" disabled={loading}>
            {loading ? "Please Wait..." : "SIGNIN"}
          </button>
          <div className="links">
            <Link to="/register">Don't have an account?</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
