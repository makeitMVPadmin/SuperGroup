import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import HomePage from './pages/HomePage/HomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import ChatPage from "./pages/ChatPage/ChatPage"
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {

  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
  console.log(clerkPubKey);

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
            {/* <HomePage /> */}
              <SignedIn>
                <HomePage />
              </SignedIn>
               <SignedOut>
                <RedirectToSignIn />
             </SignedOut>
            </>
            }
          />
          <Route
            path="/chat/:chatId"
            element={
            <>
            {/* <ChatPage /> */}
              <SignedIn>
                <ChatPage />
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
  return (
   <>
    <ClerkWithRoutes />  
      </>
  );
}

export default App;
