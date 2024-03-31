import React from "react";
import "./Benefits.css";
import "./BenefitsTeacher.css";

const BenefitsTeacher: React.FC = () => (
  <div className="benefitWrapper">
    <div className="benefitContainerTeacher">
      <img
        className="benefitsPhoto"
        src="./img/imgBenefitsCourse.png"
        alt="imgBenefitLearning"
      />
      <div className="benefitContent">
        <h2 className="benefitsTitle">Benefit for our Teachers</h2>
        <div className="benefitDetailsWrapper">
          <div className="benefitDetails">
            <div>
              <h3 className="subtitle">Simplicity</h3>
              <p className="descriptionBenefit">
                Teachers can easily showcase their lessons on our website
                without the hassle of creating and maintaining their own web
                resource.
              </p>
            </div>
            <img
              className="icon"
              src="./icons/simpleIcon.svg"
              alt="simpleIcon"
            />
          </div>
          <div className="benefitDetails">
            <div>
              <h3 className="subtitle">Education Focus</h3>
              <p className="descriptionBenefit">
                Thanks to our platform, teachers can concentrate on developing
                quality lessons without being distracted by the technical
                aspects of web development.
              </p>
            </div>
            <img
              className="icon"
              src="./icons/shortCourseIcon.svg"
              alt="shortCourseIcon"
            />
          </div>

          <div className="benefitDetails">
            <div>
              <h3 className="subtitle">Additional Income</h3>
              <p className="descriptionBenefit">
                Our website offers teachers the opportunity to start earning by
                sharing their knowledge and experience through online lessons,
                without the need to worry about marketing and promotion.
              </p>
            </div>
            <img className="icon" src="./icons/moneyIcon.svg" alt="moneyIcon" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BenefitsTeacher;
