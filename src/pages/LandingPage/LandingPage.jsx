import "./LandingPage.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config";
import {
  collection, //function that allows to make a reference to a collection in firebase
  addDoc,
  serverTimestamp, //function from firebase that creates a timestamp
} from "firebase/firestore";
import headerLogo from "../../assets/logos/logo8.svg";
import logo from "../../assets/logos/logo13.svg";
import hero from "../../assets/images/hero.png";
import girl from "../../assets/images/girl.png";
import phone from "../../assets/images/phone.png";
import networks from "../../assets/images/networks.png";
import SignOut from "../../components/SignOut/SignOut";

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
        <Link to="/#landing__form">
          <button className="landing__header-btn">Sign Up</button>
        </Link>
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
        <h2 className="landing__subtitle">
          Join the Future of Collaboration! Be the first to experience
          SuperGroup, where AI meets seamless collaboration.
        </h2>

        <Link to="/#landing__form">
          <button className="landing__btn">Sign Up</button>
        </Link>
      </section>
      <section className="landing__features">
        <h2 className="landing__subtitle">Our Key Features:</h2>
        <div className="landing__features-container">
          <article className="landing__feature">
            <h2 className="landing__subtitle">AI-Enhanced Collaboration</h2>
            <p className="landing__description">
              Leverage the power of AI to enhance your team's communication and
              decision-making.
            </p>
          </article>
          <article className="landing__feature">
            <h2 className="landing__subtitle">Intuitive Interface</h2>
            <p className="landing__description">
              Enjoy a user-friendly and intuitive chat interface with seamless
              AI integration.
            </p>
          </article>
          <article className="landing__feature">
            <h2 className="landing__subtitle">Secure and Private</h2>
            <p className="landing__description">
              Your data is encrypted and protected to ensure the highest
              standards of security and privacy.
            </p>
          </article>
        </div>
      </section>
      <section className="landing__process">
        <div className="landing__process-container">
          <img className="landing__logo" src={logo} alt="" />
          <h4 className="landing__subtitle">How it Works:</h4>
          <div className="landing__step landing__step--first">
            <div className="landing__body">
              <h2 className="landing__subtitle">Step 1:</h2>
              <p className="landing__description">
                Join the waitlist by entering your email.
              </p>
            </div>
            <img
              className="landing__img"
              src={girl}
              alt="Girl sends a message from her laptop"
            />
          </div>
          <div className="landing__step landing__step--second">
            <img
              className="landing__img"
              src={phone}
              alt="Hand with phone and social media icons"
            />
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
                Be among the first to experience the future of collaboration
                with SuperGroup.
              </p>
            </div>
            <img
              className="landing__img"
              src={networks}
              alt="AI and artificial neural networks"
            />
          </div>
          <Link to="/#landing__form">
            <button className="landing__btn">Sign Up</button>
          </Link>
        </div>
      </section>
      <form
        id="landing__form"
        className="landing__form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="landing__label">
          Name:
        </label>
        <input
          className="landing__input"
          name="name"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label htmlFor="email" className="field__label">
          Email:
        </label>
        <input
          id="email"
          className="landing__input"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label htmlFor="linkedIn" className="field__label">
          LinkedIn <span>(optional)</span>:
        </label>
        <input
          id="linkedIn"
          className="landing__input"
          name="linkedIn"
          type="text"
          placeholder="https://linkedin.com/in/"
          value={linkedIn}
          onChange={(e) => setLinkedIn(e.target.value)}
        ></input>
        <button className="landing__btn-submit" type="submit">
          Submit
        </button>
        {/* https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form */}
      </form>
      <footer className="landing__footer">
        <div className="landing__footer-container">
          <h4 className="landing__footer-subheading">Company</h4>
          <ul className="landing__items">
            <li className="landing__item">About Us</li>
            <li className="landing__item">Why Choose us</li>
            <li className="landing__item">Pricing</li>
            <li className="landing__item">Testimonial</li>
          </ul>
        </div>
        <div className="landing__footer-container">
          <h4 className="landing__footer-subheading">Resources</h4>
          <ul className="landing__items">
            <li className="landing__item">Privacy Policy</li>
            <li className="landing__item">Terms and Conditions</li>
            <li className="landing__item">Blog</li>
            <li className="landing__item">Contact Us</li>
          </ul>
        </div>
        <div className="landing__footer-container">
          <h4 className="landing__footer-subheading">Product</h4>
          <ul className="landing__items">
            <li className="landing__item">AI Generator</li>
            <li className="landing__item">Creating a Groupchat</li>
            <li className="landing__item">Time Schedule</li>
            <li className="landing__item">Lead Generate</li>
            <li className="landing__item">Remote Collaboration</li>
          </ul>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
