import "./LandingPage.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config";
import {
  collection, //function that allows to make a reference to a collection in firebase
  addDoc,
  serverTimestamp, //function from firebase that creates a timestamp
} from "firebase/firestore";

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

  //funtion to update state variables
  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "linkedIn":
        setLinkedIn(event.target.value);
        break;
      default:
        break;
    }
  };

  //function to handle form submission, data validation and submit data to firebase
  const handleSubmit = (event) => {
    event.preventDefault();

    // validate form data here

    if (name.trim() === "" || email.trim() === "" || !isEmailValid(email)) {
      // set error states to provide feedback to the user?
      console.error("Please fill in all required fields.");
      return; // Prevent further execution
    }
    if (linkedIn && !isLinkedInValid(linkedIn)) {
      console.error("Please fill in LinkedIn link correctly");
      return; // Prevent further execution
    }

    // submit form data here - sending data to firebase

    addToWaitlist({
      name,
      email,
      linkedIn,
    });

    //reset state variables
    setName("");
    setEmail("");
    setLinkedIn("");
    event.target.reset();
  };

  return (
    <main className="landing">
      <h1 className="landing__title">
        Unlock the Power of AI-Driven Collaboration
      </h1>
      <p className="landing__description">
        Join the Future of Collaboration! Be the first to experience SuperGroup,
        where AI meets seamless collaboration.
      </p>
      <section className="landing__features">
        <h4 className="landing__subtitle">Key Features:</h4>
        <p>
          AI-Enhanced Collaboration: Leverage the power of AI to enhance your
          team's communication and decision-making. Intuitive Interface: Enjoy a
          user-friendly and intuitive chat interface with seamless AI
          integration. Secure and Private: Your data is encrypted and protected
          to ensure the highest standards of security and privacy.
        </p>
      </section>
      <section className="landing__process">
        <h4 className="landing__subtitle">How it Works:</h4>
        <ul className="landing__items">
          <li className="landing__item">
            Step 1: Join the waitlist by entering your email.
          </li>
          <li className="landing__item">
            Step 2: Receive exclusive updates and early access notifications.
          </li>
          <li className="landing__item">
            Step 3: Be among the first to experience the future of collaboration
            with SuperGroup.
          </li>
        </ul>
        <Link to="#form">
          <button className="landing__btn">Sign Up</button>
        </Link>
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
          onChange={handleChange}
        ></input>

        <label htmlFor="email" className="field__label">
          Email:
        </label>
        <input
          id="email"
          className="landing__input"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
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
          onChange={handleChange}
        ></input>
        <button className="landing__btn-submit" type="submit">
          Submit
        </button>
        {/* https://react.dev/reference/react-dom/components/input#reading-the-input-values-when-submitting-a-form */}
      </form>
    </main>
  );
};

export default LandingPage;
