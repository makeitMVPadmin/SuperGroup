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


// // As an AI, I do not have feelings or personal experiences.
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const fetch = require("node-fetch");
// const dotenv = require("dotenv");
// dotenv.config();

// admin.initializeApp();

// exports.processMessage = functions.firestore
//     .document("messages-t/{messageId}")
//     .onCreate(async (snapshot, context) => {
//       const messageData = snapshot.data();
//       const messageText = messageData.text;
//       const messageId = context.params.messageId;
//       if (messageText.includes("@ai")) {
//         try {
//           const API_KEY = process.env.REACT_APP_FIREBASE_KEY;
//           const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
//             method: "POST",
//             headers: {
//               "Authorization": `Bearer ${API_KEY}`,
//               "Content-Type": "application/json",
//             },
//             // preparing a JSON object containing the model, messages,
//             // and max_tokens to be sent to the OpenAI API.
//             body: JSON.stringify({
//               model: "gpt-3.5-turbo",
//               messages: [{"role": "user",
//                 "content": messageText.replace("@ai", "")},
//               {"role": "system",
//                 "content": "You are Alex, a helpful, astute, and expert AI"+
//                 " assistant offering data-driven insights and suggestions."+
//                 " You specialize in"+
//              " AI-driven marketing strategies,providing valuable expertise "+
//                 "in optimizing campaigns, analyzing "+
//                 "data, and suggesting innovative approaches across various "+
//                 "marketing aspects. You are friendly yet professional."+
//                 " You work for Super Group, a "+
//              "Revolutionizing Company-Wide Collaboration + Decision-Making."+
//                 " Super Group is a cutting-edge platform designed to"+
//                 "enhance company-wide collaboration, marketing"+
//                 " strategies, and product decisions by seamlessly "+
//                 "integrating the power of GPT-3 "+
//                 "into group conversations. With Super Group, your "+
//                 "organization can create a dynamic"+
//                 " environment where employees, regardless of their role "+
//                 "or department, can engage in"+
//                 " meaningful discussions, share insights, and collectively "+
//                 "shape the future of your company."}],
//               max_tokens: 50,
//               temperature: 0.7,
//             }),
//           });
//           const aiData = await aiResponse.json();
//           // Handle aiData as needed
//           // Update Firestore document with AI response
//           const firestore = admin.firestore();
//           const messagesRef = firestore.collection("messages-t");
//           // await messagesRef.doc(messageId).update({
//           //   aiResponse: aiData.choices[0].message.content,
//           // });
//           const aiResponseContent = aiData.choices[0].message.content;
//           const lastFullStopIndex = aiResponseContent.lastIndexOf(".");
//           const trimmedAiResponse = lastFullStopIndex !== -1 ?
//        aiResponseContent.substring(0, lastFullStopIndex+1):aiResponseContent;
//           await messagesRef.doc(messageId).update({
//             aiResponse: trimmedAiResponse,
//           });
//           console.log("OpenAI Response:", aiData.choices[0].message.content);
//         } catch (error) {
//           console.error("Error calling OpenAI API:", error);
//         }
//       }
//     });


// As an AI, I do not have feelings or personal experiences.
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

admin.initializeApp();

exports.processMessage = functions.firestore
    .document("chatRooms/{chatId}/messages/{messageId}")
    .onCreate(async (snapshot, context) => {
      const messageData = snapshot.data();
      const messageText = messageData.text;
      const messageId = context.params.messageId;
      const chatId = context.params.chatId;
      console.log(messageId);
      console.log(chatId);
      console.log(messageText);
      console.log(messageData);
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
          console.log(aiData);
          // Handle aiData as needed
          // Update Firestore document with AI response
          const firestore = admin.firestore();
          const messagesRef =
          firestore.collection("chatRooms").doc(chatId).collection("messages");
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
