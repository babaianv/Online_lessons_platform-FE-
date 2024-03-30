import React from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Companies from '../../components/Companies/Companies';
import BenefitsTeacher from '../../components/Benefits/BenefitsTeacher';
import BenefitsStudent from '../../components/Benefits/BenefitsStudent';
import Footer from '../../components/Footer/Footer';
import CoursesCards from '../../components/CoursesCards/CoursesCards';

const Home: React.FC = () => {
  return (
    <>
      <Header/>
      <Main/>
      <Companies/>
      <BenefitsStudent/>
      <BenefitsTeacher/>
      <CoursesCards/>
      <Footer/>
    </>
  );
};

export default Home;