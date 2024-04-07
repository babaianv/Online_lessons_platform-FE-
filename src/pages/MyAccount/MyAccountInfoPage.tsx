import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MyAccountInfo from "../../components/MyAccount/MyAccountInfo";

const MyAccountInfoPage: React.FC = () => {
  return (
    <>
      <Header />
      <MyAccountInfo />
      <Footer />
    </>
  );
};

export default MyAccountInfoPage;
