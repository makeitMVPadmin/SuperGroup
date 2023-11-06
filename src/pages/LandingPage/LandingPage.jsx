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
import girl from "../../assets/images/girl.png";
import phone from "../../assets/images/phone.png";
import networks from "../../assets/images/networks.png";
import arrowRight from "../../assets/images/arrow_rightdown.svg";
import arrowLeft from "../../assets/images/arrow_leftdown.svg";
import cloud from "../../assets/images/cloud.svg";
import people from "../../assets/images/ConnectedPeople.svg";
import approved from "../../assets/images/ApprovedDelivery.svg";
import shield from "../../assets/images/SecurityShield.svg";
import SignOut from "../../components/SignOut/SignOut";
import bubble from "../../assets/images/bubble.svg";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

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

    // validating form data

    if (name.trim() === "" || email.trim() === "") {
      // set error states to provide feedback to the user?
      console.error("Please fill in all required fields.");
      return; // Prevent further execution
    }
    if (!isEmailValid(email)) {
      // set error states to provide feedback to the user?
      console.error("Incorrect email format.");
      return; // Prevent further execution
    }
    if (linkedIn && !isLinkedInValid(linkedIn)) {
      console.error("Please fill in LinkedIn link correctly");
      return; // Prevent further execution
    }

    // submiting form data - sending data to firebase

    addToWaitlist({
      name,
      email,
      linkedIn,
    });

    //reseting state variables
    setName("");
    setEmail("");
    setLinkedIn("");
    event.target.reset();
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
              alt="Hand with phone and social media icons"
            />
            <h2 className="landing__subtitle">AI-Enhanced Collaboration</h2>
            <p className="landing__description">
              Leverage the power of AI to enhance your team's communication and
              decision-making.
            </p>
          </article>
          <article className="landing__feature">
            <img
              className="landing__img"
              src={approved}
              alt="Hand with phone and social media icons"
            />
            <h2 className="landing__subtitle">Intuitive Interface</h2>
            <p className="landing__description">
              Enjoy a user-friendly and intuitive chat interface with seamless
              AI integration.
            </p>
          </article>
          <article className="landing__feature">
            <img
              className="landing__img"
              src={shield}
              alt="Hand with phone and social media icons"
            />
            <h2 className="landing__subtitle">Secure and Private</h2>
            <p className="landing__description">
              Your data is encrypted and protected to ensure the highest
              standards of security and privacy.
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
          {/* <img
            className="landing__img"
            src={girl}
            alt="Girl sends a message from her laptop"
          /> */}
        </div>
        <div className="landing__step landing__step--second">
          {/* <img
            className="landing__img"
            src={phone}
            alt="Hand with phone and social media icons"
          /> */}
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
          {/* <img
            className="landing__img"
            src={networks}
            alt="AI and artificial neural networks"
          /> */}
        </div>
        <a href="/#landing__form">
          <button className="landing__btn">Sign Up</button>
        </a>
      </section>

      <section className="landing__waitlist">
        <img
          className="landing__cloud"
          src={cloud}
          alt="Bubble cloud with yellow border"
        />
        <h2 className="landing__subtitle landing__subtitle--waitlist">
          Unlock Your Power
        </h2>
        <p className="landing__description">Join Our Email List</p>
        <form
          id="landing__form"
          className="landing__form"
          onSubmit={handleSubmit}
        >
          <input
            className="landing__input"
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            id="email"
            className="landing__input"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            id="linkedIn"
            className="landing__input"
            name="linkedIn"
            type="text"
            placeholder="LinkedIn (Optional)"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
          ></input>
          <button className="landing__btn-submit" type="submit">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default LandingPage;
