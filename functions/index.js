// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// // const { onRequest } = require("firebase-functions/v2/https");
// // const logger = require("firebase-functions/logger");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // exports.helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", { structuredData: true });
// //   response.send("Hello from Firebase!");
// // });


// functions/index.js (Firebase Functions)

// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const fetch = require("node-fetch");
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();
// // require("dotenv").config();

// const app = express();

// app.use(express.json());
// app.use(cors());

// admin.initializeApp();

// // This function is triggered when a new document is created in
// // the Firestore
// // collection named "messages-test".
// // Retrieves the data of the newly created Firestore document using
// // the snapshot.
// exports.handleAIMentions = functions.firestore
//     .document("messages-test/{messageId}")
//     .onCreate(async (snapshot, context) => {
//       console.log("Function triggered!");
//       const messageData = snapshot.data();
//       // Convert message text to lowercase for matching
//       const messageText = messageData.text.toLowerCase();

//       // Check if the message contains "@ai" If it does, it continues
//       // with further processing.
//       if (messageText.includes("@ai")) {
//         try {
//         // Get the text that follows the "@ai"
//         // mention for processing
//         // Extract text after "@ai"
//           const aiRequest = messageText.split("@ai")[1].trim();
//           // Make a request to the OpenAI API for insights
//           const response = await fetch(
//               "https://api.openai.com/v1/chat/completions", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   "Authorization": `Bearer ${process.env._AI_API_KEY}`,
//                 },
//                 body: JSON.stringify({
//                   model: "gpt-3.5-turbo-0613",
//                   messages: [{role: "user", content: aiRequest}],
//                   max_tokens: 100,
//                 }),
//               },
//           );

//           const responseData = await response.json();
//           console.log(responseData);

//           // Once you get the response from OpenAI, you can do
//           // further processing or send it back to Firestore
//           // For example, save the AI-generated response back to
//           // Firestore under a specific collection
//           // Upon receiving a response from the OpenAI API, it
//           // extracts the AI-generated
//           // response and saves it to the Firestore collection
//           // "messages-test" along with
//           // the original message's reference and timestamp.
//           const db = admin.firestore();
//           await db.collection("aiResponses").add({
//             originalMessageId: snapshot.id, // Ref to original message
//             response: responseData.choices[0].text.trim(), // Extract AI res
//             timestamp: admin.firestore.FieldValue.serverTimestamp(),
//           });
//         } catch (error) {
//           console.error("Error processing AI request:", error);
//         }
//       }
//       return null; // Return null to end the function
//     });

// import * as functions from "firebase-functions";

// const admin = require("firebase-admin");
// admin.initializeApp();

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();
// // const openai = require("openai");
// const app = express();
// app.use(express.json());
// app.use(cors({origin: true}));

// const functions = require("firebase-functions");
// // const {Configuration, OpenAIApi} =require("openai");
// const OpenAI = require("openai");

// // Create a configuration object with your OpenAI API key
// const configuration = {
//   apiKey: "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",
// };
// // const configuration = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// const openai = new OpenAI(configuration);
// exports.generateText = functions.https.onCall(async (prompt, context) => {
//   try {
//     // const openAPIResponse = await openai.createCompletion({
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: prompt,
//       max_tokens: 100,
//       // n: 1,
//       // stop: "{}",
//     });
//     console.log(completion.data, "response data");
//     if (completion.data.choices.length > 0) {
//       const generatedText = completion.data.choices[0].text?.trim();
//       console.log(generatedText);
//       return {text: generatedText};
//     } else {
//       throw new Error("No choices available");
//     }
//   } catch (error) {
//     console.error("OpenAI API request failed:", error);
//     throw new functions.https.HttpsError("internal", "API request failed");
//   }
// });
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();
// const openai = require("openai");

// const app = express();
// admin.initializeApp();
// app.use(express.json());
// app.use(cors({origin: true}));

// const openaiClient = new openai.OpenAI({
//   apiKey: "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",
// });

// app.post("/generateText", async (req, res) => {
//   const prompt = req.body.prompt;
//   // res.set("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.set("Access-Control-Allow-Methods", "POST");
//   res.set("Access-Control-Allow-Headers", "Content-Type");
//   try {
//     const response = await openaiClient.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{
//         role: "user",
//         content: prompt,
//       }],
//     });
//     const generatedText = response.data.choices[0].text;
//     res.status(200).json({generatedText});
//   } catch (error) {
//     console.error("Error generating text:", error);
//     res.status(500).json({error: "Error generating text"});
//   }
// });

// exports.api = functions.https.onRequest(app);

// const functions = require("firebase-functions");
// const openai = require("openai");
// const openaiAPIKey = "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";
// const openaiClient = new openai.OpenAI({apiKey: openaiAPIKey});
// const cors = require("cors")({origin: true});

// exports.chat = functions.https.onRequest(async (req, res) => {
//   cors(req, res, async () => {
//     if (req.method !== "POST") {
//       return res.status(405).send("Method Not Allowed");
//     }
//     const {message} = req.body;

//     // Make API call to OpenAI ChatGPT
//     try {
//       const response = await openaiClient.complete({
//         model: "gpt-3.5-turbo",
//         messages: [{role: "system", content: "You are a helpful assistant."},
//           {role: "user", content: message}],
//       });

//       // Process the response and send it back to the client
//       const output = response.data.choices[0].message.content;
//       res.status(200).json({message: output});
//     } catch (error) {
//       res.status(500).json({error: "Error generating response"});
//     }
//   });
// });


// As an AI, I do not have feelings or personal experiences.
// full stops
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

admin.initializeApp();

exports.processMessage = functions.firestore
    .document("messages-t/{messageId}")
    .onCreate(async (snapshot, context) => {
      const messageData = snapshot.data();
      const messageText = messageData.text;
      const messageId = context.params.messageId;
      if (messageText.includes("@ai")) {
        try {
          const API_KEY = process.env.REACT_APP_FIREBASE_KEY;
          const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${API_KEY}`,
              "Content-Type": "application/json",
            },
            // preparing a JSON object containing the model, messages,
            // and max_tokens to be sent to the OpenAI API.
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [{"role": "user",
                "content": messageText.replace("@ai", "")},
              {"role": "system",
                "content": "You are Alex, a helpful, astute, and expert AI"+
                " assistant offering data-driven insights and suggestions."+
                " You specialize in"+
                " AI-driven marketing strategies,providing valuable expertise "+
                "in optimizing campaigns, analyzing "+
                "data, and suggesting innovative approaches across various "+
                "marketing aspects. You are friendly yet professional."+
                " You work for Super Group, a "+
                "Revolutionizing Company-Wide Collaboration + Decision-Making."+
                " Super Group is a cutting-edge platform designed to"+
                "enhance company-wide collaboration, marketing"+
                " strategies, and product decisions by seamlessly "+
                "integrating the power of GPT-3 "+
                "into group conversations. With Super Group, your "+
                "organization can create a dynamic"+
                " environment where employees, regardless of their role "+
                "or department, can engage in"+
                " meaningful discussions, share insights, and collectively "+
                "shape the future of your company."}],
              max_tokens: 50,
              temperature: 0.7,
            }),
          });
          const aiData = await aiResponse.json();
          // Handle aiData as needed
          // Update Firestore document with AI response
          const firestore = admin.firestore();
          const messagesRef = firestore.collection("messages-t");
          // await messagesRef.doc(messageId).update({
          //   aiResponse: aiData.choices[0].message.content,
          // });
          const aiResponseContent = aiData.choices[0].message.content;
          const lastFullStopIndex = aiResponseContent.lastIndexOf(".");
          const trimmedAiResponse = lastFullStopIndex !== -1 ?
          aiResponseContent.substring(0, lastFullStopIndex+1):aiResponseContent;
          await messagesRef.doc(messageId).update({
            aiResponse: trimmedAiResponse,
          });
          console.log("OpenAI Response:", aiData.choices[0].message.content);
        } catch (error) {
          console.error("Error calling OpenAI API:", error);
        }
      }
    });
