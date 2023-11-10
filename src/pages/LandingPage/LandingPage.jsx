import "./LandingPage.scss";
import React, { useState } from "react";
import { db } from "../../firebase-config";
import {
  collection, //function that allows to make a reference to a collection in firebase
  addDoc,
  serverTimestamp, //function from firebase that creates a timestamp
} from "firebase/firestore";
import headerLogo from "../../assets/logos/logo8.svg";
import logo from "../../assets/logos/logo13.svg";
import hero from "../../assets/images/hero.svg";
import arrowRight from "../../assets/images/arrow_rightdown.svg";
import arrowLeft from "../../assets/images/arrow_leftdown.svg";
import people from "../../assets/images/ConnectedPeople.svg";
import approved from "../../assets/images/ApprovedDelivery.jpg";
import shield from "../../assets/images/SecurityShield.svg";
import SignOut from "../../components/SignOut/SignOut";
import bubble from "../../assets/images/bubble.svg";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [nameError, setNameError] = useState(" ");
  const [emailError, setEmailError] = useState(" ");
  const [linkedInError, setLinkedInError] = useState(" ");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const waitlistCollectionRef = collection(db, "waitlist");
  const addToWaitlist = async ({ name, email, linkedIn }) => {
    await addDoc(waitlistCollectionRef, {
      name,
      email,
      linkedIn,
      createdAt: serverTimestamp(),
    });
  };
  function isEmailValid(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }
  function isLinkedInValid(linkedIn) {
    // This regex pattern checks for common LinkedIn URL formats
    const linkedInRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;
    return linkedInRegex.test(linkedIn);
  }

  //function to handle form submission, data validation and submit data to firebase
  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset error states
    setNameError(" ");
    setEmailError(" ");
    setLinkedInError(" ");

    setFormSubmitted(true);

    // validating form data
    let hasError = false;
    if (name.trim() === "") {
      // set error states to provide feedback to the user
      setNameError("Please provide your name.");
      console.error("Please fill in name field (required).");
      hasError = true;
    } else {
      setNameError(""); // Clear error if the name is provided
    }
    if (email.trim() === "") {
      // set error states to provide feedback to the user
      setEmailError("Please provide your email.");
      console.error("Please fill in email field (required).");
      hasError = true;
    } else if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      // set error states to provide feedback to the user?
      console.error(
        "Invalid email format. Please enter a valid email address."
      );
      hasError = true;
    } else {
      setEmailError(""); // Clear error if the email is provided and valid
    }

    if (linkedIn && !isLinkedInValid(linkedIn)) {
      setLinkedInError("Please provide a valid LinkedIn URL.");
      console.error(
        "Please provide a valid LinkedIn URL or leave the field blank."
      );
      hasError = true;
    } else {
      setLinkedInError(""); // Clear error if the LinkedIn URL is provided and valid
    }

    // submiting form data - sending data to firebase
    if (!hasError) {
      addToWaitlist({
        name,
        email,
        linkedIn,
      });

      //reseting state variables
      setName("");
      setEmail("");
      setLinkedIn("");
      setFormSubmitted(false);
      event.target.reset();
    }
  };

  return (
    <main className="landing">
      <a href="/sign-in">Sign In</a>
      <SignOut />
      <header className="landing__header">
        <img
          className="landing__header-logo"
          src={headerLogo}
          alt="MakeitMVP header logo"
        />
        <a href="/#landing__form">
          <button className="landing__header-btn">Sign Up</button>
        </a>
      </header>
      <section className="landing__hero">
        <div className="landing__hero-container">
          <div className="landing__hero-topcontainer">
            <h1 className="landing__title">
              Unlock the Power of AI-Driven Collaboration
            </h1>
            <img
              className="landing__hero-img"
              src={hero}
              alt="three people strategizing"
            />
          </div>
          <h2 className="landing__subtitle landing__subtitle--hero">
            Join the Future of Collaboration! Be the first to experience
            SuperGroup, where AI meets seamless collaboration.
          </h2>
        </div>

        <a href="/#landing__form">
          <button className="landing__btn">Sign Up</button>
        </a>
      </section>
      <img
        className="landing__arrow-right"
        src={arrowRight}
        alt="Curver arrow going right and down with yellow border"
      />
      <section className="landing__features">
        <h2 className="landing__subtitle landing__subtitle--features">
          Our Key Features:
        </h2>
        <div className="landing__features-container">
          <article className="landing__feature">
            <img
              className="landing__img"
              src={people}
              alt="Icon showing people connecting"
            />
            <h2 className="landing__subtitle">AI-Enhanced Collaboration</h2>
            <p className="landing__description">
              Leverage the power of AI to enhance your team's communication and
              decision-making
            </p>
          </article>
          <article className="landing__feature">
            <img
              className="landing__img"
              src={approved}
              alt="icon of a screen with a check, approval"
            />
            <h2 className="landing__subtitle">Intuitive Interface</h2>
            <p className="landing__description">
              Enjoy a user-friendly and intuitive chat interface with seamless
              AI integration
            </p>
          </article>
          <article className="landing__feature">
            <img
              className="landing__img"
              src={shield}
              alt="icon of a security shield with a lock"
            />
            <h2 className="landing__subtitle">Secure and Private</h2>
            <p className="landing__description">
              Your data is encrypted and protected to ensure the highest
              standards of security and privacy
            </p>
          </article>
        </div>
      </section>
      <img
        className="landing__arrow-left"
        src={arrowLeft}
        alt="Curver arrow going left and down with yellow border"
      />
      <section className="landing__process">
        <div className="landing__process-container">
          <img
            className="landing__logo"
            src={logo}
            alt="MakeItMVP LightBulb logo"
          />
          <h2 className="landing__subtitle landing__subtitle--process">
            How it Works:
          </h2>
        </div>
        <div className="landing__step landing__step--first">
          <div className="landing__body">
            <h2 className="landing__subtitle">Step 1:</h2>
            <p className="landing__description">
              Join the waitlist by entering your email.
            </p>
          </div>
        </div>
        <div className="landing__step landing__step--second">
          <div className="landing__body">
            <h2 className="landing__subtitle">Step 2:</h2>
            <p className="landing__description">
              Receive exclusive updates and early access notifications.
            </p>
          </div>
        </div>
        <div className="landing__step landing__step--third">
          <div className="landing__body">
            <h2 className="landing__subtitle">Step 3:</h2>
            <p className="landing__description">
              Be among the first to experience the future of collaboration with
              SuperGroup.
            </p>
          </div>
        </div>
        <a href="/#landing__form">
          <button className="landing__btn">Sign Up</button>
        </a>
      </section>

      <section className="landing__waitlist">
        <h2 className="landing__subtitle landing__subtitle--waitlist">
          Unlock Your Power
        </h2>
        <p className="landing__description">Join Our Email List</p>
        <form
          id="landing__form"
          className="landing__form"
          onSubmit={handleSubmit}
        >
          <div className="landing__label">
            <input
              className={`landing__input ${
                nameError !== "" && formSubmitted ? "landing__input-error" : ""
              }`}
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>

            <span className="landing__error">{nameError}</span>
          </div>
          <div className="landing__label">
            <input
              id="email"
              className={`landing__input ${
                (emailError !== "" || !isEmailValid(email)) && formSubmitted
                  ? "landing__input-error"
                  : ""
              }`}
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <span className="landing__error">{emailError}</span>
          </div>
          <div className="landing__label">
            <input
              id="linkedIn"
              className={`landing__input ${
                linkedInError !== "" && formSubmitted
                  ? "landing__input-error"
                  : ""
              }`}
              name="linkedIn"
              type="text"
              placeholder="LinkedIn (Optional)"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
            />
            <span className="landing__error">{linkedInError}</span>
          </div>
          <button className="landing__btn-submit" type="submit">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default LandingPage;
