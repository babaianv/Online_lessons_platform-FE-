import React from 'react'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Login from "../../components/Login/Login"

const LoginPage: React.FC = () => {
  return (
    <>
    <Header />
    <Login/>
    <Footer />
    </>
  )
}

export default LoginPage