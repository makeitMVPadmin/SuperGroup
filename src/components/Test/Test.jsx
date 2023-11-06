import "./Test.scss";
import React, { useState } from "react";
import { db } from "../../firebase-config";
import logo from "../../assets/logos/logo1.svg";
import logo2 from "../../assets/logos/logo2.svg";
import up from "../../assets/icons/thumbsup.svg";
import down from "../../assets/icons/thumbsdown.svg";
import profile from "../../assets/images/Mohan-muruge.jpg";

const Test = () => {
  const openai = require("openai");
  //   gpt-3.5-turbo
  const [newMessage, setNewMessage] = useState("");
  return (
    <main>
      <div className="test__container">
        <img className="test__container" src={logo} alt="logo" />
        <h1>Corporate Group Chat</h1>
        <img src={logo2} alt="logo" />
      </div>
      <div>
        <div>
          <label for="test__image">
            <input
              id="test__image"
              className="test__image"
              type="image"
              name="image"
              src={profile}
              alt="Mohan-muruge"
            />
          </label>
          <label for="test__label" className="test__message-label">
            <input
              id="comments__input-name"
              className="test__input"
              name="fullName"
              type="text"
              placeholder="Enter your name"
              required
            />
          </label>
        </div>
        <div>
          <span className="test__span">Was this helpful?</span>
          <img className="test__img1" src={up} alt="Thumbs up" />
          <img className="test__img2" src={down} alt="Thumbs down" />
        </div>
        <div className="test__improve-container">
          <label for="test__improve-input" className="test__improve-label">
            <input
              id="test__improve-input"
              className="test__improve-input"
              name="improve"
              type="text"
              placeholder="Describe how I can improve"
              required
            />
          </label>
          <label for="test__ai-image">
            <input
              id="test__ai-image"
              className="test__ai-image"
              type="image"
              name="image"
              src={profile}
              alt="Mohan-muruge"
            />
          </label>
          <button className="test__button">Send</button>
        </div>
      </div>
    </main>
  );
};

export default Test;
