import "./Test.scss";
import React, { useState, useRef } from "react";
import { db, auth } from "../../firebase-config";
import logo from "../../assets/logos/logo1.svg";
import logo2 from "../../assets/logos/logo2.svg";
import up from "../../assets/icons/up.svg";
import down from "../../assets/icons/down.svg";
import profile from "../../assets/images/Mohan-muruge.jpg";
import { Auth } from "../Auth/Auth";
import { TestChat } from "../TestChat/TestChat";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Test = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token")); //variable to check if user authenticated or not, they might have been authenticated before so we need to grab information in the cookies
  //first we want to ask them the room they want to join
  const [room, setRoom] = useState(null); //it will represent what room the  user typed in, is room empty or not
  const roomInputRef = useRef(null); // use useRef because if we use onchange in the input, as soon as we add a single letter room will become true and we'll go into a chat, now we'll only update the room state when we click enter chat
  // if there is an auth token anywhere in the app it would be true, if not it will be false
  //if user is not auth send back to auth
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  // const openai = require("openai");
  //   gpt-3.5-turbo

  return (
    <main>
      {/* is room null or not, if it isn't null, display the chat,if it is null we want the user to type in a room ID */}
      <div>
        {room ? (
          <div>
            <TestChat room={room} />
          </div>
        ) : (
          <div className="room">
            <label>Enter Room Name</label>
            <input ref={roomInputRef} />
            <button onClick={() => setRoom(roomInputRef.current.value)}>
              Enter Chat
            </button>
          </div>
        )}
      </div>
      <div className="sign-out">
        <button className="sign-out-btn" onClick={signUserOut}>
          Sign Out
        </button>
      </div>
      {/* <div className="test__header">
        <img className="test__logo" src={logo} alt="logo" />
        <h1>Corporate Group Chat</h1>
        <img className="test__logo" src={logo} alt="logo" />
      </div>
      <div className="test__container">
        <div className="test__row">
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
        */}
      <div className="test__ai">
        <div className="test__ai-container">
          <div className="test__ai-message">
            <p className="test__message">
              Of course, here are the stats from last quarter: There was a 5%
              increase in sales generated from ad revenue and a 1.5% decrease in
              webpage abandonment.
            </p>
            <div className="test__feedback">
              <span className="test__span">Was this helpful?</span>
              <div className="test__feedback-icons">
                <img className="test__img1" src={up} alt="Thumbs up" />
                <img className="test__img2" src={down} alt="Thumbs down" />
              </div>
            </div>
          </div>
          <div className="test__ai-img"></div>
        </div>
        <div className="test__improve-container">
          <p className="test__message">Please describe how I can improve</p>
          <div className="test__ai-img"></div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
};

export default Test;
