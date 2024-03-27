import React from 'react';
import "../Home/Home.css"
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Companies from '../../components/Companies/Companies';

import BenefitsTeacher from '../../components/Benefits/BenefitsTeacher';
import BenefitsStudent from '../../components/Benefits/BenefitsStudent';
import Courses from '../../components/CoursesCards/Courses';
import Footer from '../../components/Footer/Footer';

const Home: React.FC = () => {
  return (
    <>
      <Header/>
      <Main/>
      <Companies/>
      <BenefitsStudent/>
      <BenefitsTeacher/>
      <Courses/>
      <Footer/>
    </>
  );
};

export default Home;