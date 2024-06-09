import React from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import "./Home.scss"

const Home = () => {
  const { name } = useSelector((state) => state.auth);
  return (
    <>
      <Header />
      <div className="home">
        <h2>{name}! You are logged In</h2>
      </div>
    </>
  );
};

export default Home;
