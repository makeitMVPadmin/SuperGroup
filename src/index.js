import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import HomePage from './pages/HomePage/HomePage';
import LandingPage from './pages/LandingPage/LandingPage';


const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById("root"));

const ClerkWithRoutes = () => {
  const navigate = useNavigate()

  return (
    <ClerkProvider 
    publishableKey={clerkPubKey}
    navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/sign-in/*"
          element={<SignIn redirectUrl={'/home'} routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp redirectUrl={'/home'} routing="path" path="/sign-up" />}
        />
      <Route
          path="/home"
          element={
          <>
            <SignedIn>
              <HomePage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />
      </Routes>
    </ClerkProvider>
  )

}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
