// import React, { useState } from 'react';
// import { app } from '../../firebase-config';
// import 'firebase/functions';
// import { getFunctions, httpsCallable } from 'firebase/functions';




// const GenerateText =() => {
//   const [generatedText, setGeneratedText] = useState(null);
//   const functions = getFunctions(app); 
//   const generateTextFromPrompt = async (prompt) => {
//       const generateTextFunction = getFunctions().httpsCallable('generateText');
      
//       try {
//           const result = await generateTextFunction(prompt);
//           setGeneratedText(result.data.text);
//       } catch (error) {
//           console.error('Firebase function invocation failed:', error);
//       }
//   };

//    // Render the component
//   return (
//     <div>
//       <button onClick={() => generateTextFromPrompt({ prompt: "Once upon a time" })}>
//         Generate Story
//       </button>
//       {generatedText && <p>{generatedText}</p>}
//     </div>
//   );
// };


// export default GenerateText;

import React, { useState } from 'react';
import { app } from '../../firebase-config';
// const functions = getFunctions(app);
import { getFunctions, httpsCallable } from 'firebase/functions'; //Imports functions from Firebase SDK to handle Cloud Functions.

const GenerateText = () => {
  const [prompt, setPrompt] = useState(''); //Stores the user input for the text generation prompt.
  const [response, setResponse] = useState(''); //Stores the generated text obtained from the Firebase Cloud Function.
  const functions = getFunctions(app); //Retrieves the Firebase functions associated with the Firebase app.
  const generateText = httpsCallable(functions, 'generateText'); //Creates a callable function associated generateText associated with the firebase function called generateText 

//   This function is called when the "Generate Text" button is clicked.
  const handleGenerateText = () => {
    // triggers the generateText function by passing the prompt as an argument
    generateText({ prompt })
      .then((result) => {
        setResponse(result.data.generatedText); // Access 'generatedText' from the response data, Upon receiving a response from the Firebase Cloud Function, it updates the response state with the generated text.
      })
      .catch((error) => {
        console.error('Error generating text:', error);
      });
  };

  return (
    <div>
      <input type="text" value={prompt} onChange={(event) => setPrompt(event.target.value)} />
      <button onClick={handleGenerateText}>Generate Text</button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default GenerateText;
