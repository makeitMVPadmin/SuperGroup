import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LandingPage from './pages/LandingPage/LandingPage';


// if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

// function ClerkProviderWithNavigate() {
//   const navigate = useNavigate();
//   const apiKey = process.env.REACT_APP_API_KEY;
//   console.log(`API Key: ${apiKey}`);
//   return (
 
//     <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route
//           path="/home"
//           element={
//             <SignedIn>
//               <HomePage />
//             </SignedIn>
//           }
//         />
//         <Route
//           path="*"
//           element={
//             <SignedOut>
//               <RedirectToSignIn />
//             </SignedOut>
//           }
//         />
        
//       </Routes>
//     </ClerkProvider>
//   );
// }

function App() {
  return (
   <>
      {/* <ClerkProviderWithNavigate /> */}
      </>
  );
}

export default App;
