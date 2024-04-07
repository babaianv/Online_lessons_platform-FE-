import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ChangePassword from "../../components/MyAccount/ChangePassword";

const ChangePasswordPage: React.FC = () => {
  return (
    <>
      <Header />
      <ChangePassword />
      <Footer />
    </>
  );
};

export default ChangePasswordPage;
