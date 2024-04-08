import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AccountPanel from "../../components/AccountPanel/AccountPanel";

const MyAccountPage: React.FC = () => {
  return (
    <>
      <Header />
      <AccountPanel />
      <Footer />
    </>
  );
};

export default MyAccountPage;
