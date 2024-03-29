import React from "react";
import "./Benefits.css";

const BenefitsStudent = () => (
  <div className="benefitWrapper">
    <div className="benefitContainer">
      <img
        className="benefitsPhoto1"
        src="./img/imgBenefitLearning.png"
        alt="imgBenefitLearning"
      />
      <div className="benefitContent">
        <h2 className="benefitsTitleStudent">
          Benefit from our online Learning Expert
        </h2>
        <div className="benefitDetailsWrapperStudent">
          <div className="benefitDetails">
            <div>
              <h3 className="subtitle">Online Degree</h3>
              <p className="descriptionBenefit">
                Earning an online degree offers the flexibility to pursue higher
                education from anywhere.
              </p>
            </div>
            <img
              className="icon"
              src="./icons/onlineDegreeIcon.svg"
              alt="onlineDegreeIcon"
            />
          </div>
          <div className="benefitDetails">
            <div>
              <h3 className="subtitle">Short course</h3>
              <p className="descriptionBenefit">
                Short courses provide efficient and focused learning
                experiences, enabling individuals to acquire specific skills or
                knowledge in a condensed timeframe.
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
              <h3 className="subtitle">Learn with expert</h3>
              <p className="descriptionBenefit">
                Acquire new skills and knowledge through interactive online
                courses, fostering self-paced education and personal
                development.
              </p>
            </div>
            <img className="icon" src="./icons/learnIcon.svg" alt="learnIcon" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BenefitsStudent;
