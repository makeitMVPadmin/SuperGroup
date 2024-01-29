# MakeItMVP Launch Academy Starter Repository: SuperGroup

Welcome to the MakeItMVP Launch Academy SuperGroup Repository! This repository is designed to provide new junior/entry developers with a structured starting point for their assigned projects. It's built using React, Javascript and Sass to help you get up and running quickly and familiarize with what has been implemented based on Phases.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure (MAIN)](#project-structure-main)
- [Project Structure (DEVELOP)](#project-structure-develop)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To begin working on your project, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/MakeItMVP/SuperGroup.git
   ```

2. Change your working directory to the cloned repository:

   ```bash
   cd SuperGroup
   ```
3. Open the repository in your code editor 

   ```bash
   code .
   ```

4. Make sure that you're in the develop branch. Switch from the main branch to develop branch to see the current work in progress. (as of Phase 2)
   
   ```bash
   git checkout develop
   ``` 

5. Before installing dependencies, make sure to create a .env file within the project directory. This is where your FireBase keys will be stored in order to access the database. Please ask for the keys from your lead developer and add them in your .env file using this format: 

   ```.env
   REACT_APP_FIREBASE_API_KEY=""
   REACT_APP_FIREBASE_AUTH_DOMAIN=""
   REACT_APP_FIREBASE_PROJECT_ID=""
   REACT_APP_FIREBASE_STORAGE_BUCKET=""
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
   REACT_APP_FIREBASE_APP_ID=""
   REACT_APP_FIREBASE_MEASUREMENT_ID=""
   REACT_APP_CLERK_PUBLISHABLE_KEY=""
   ```

6. Install the project dependencies:

   ```bash
   npm install
   ```

7. Start the development server:

   ```bash
   npm start
   ```

8. Open your web browser and navigate to `http://localhost:3000` to see your project running.

9. Before making any changes to the code, please make sure to create your own branch by following Git Version Control protocols. 

   ```bash
   git checkout -b <new branch name>
   ```

Now you're ready to start building upon the project using the provided structure!

## Project Structure-Main

The project structure is organized as follows:

```
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── ...
│   ├── styles/
│   │   ├── main.scss
│   │   ├── ...
│   ├── index.js
├── public/
│   ├── index.html
│   ├── ...
├── package.json
├── README.md
```

- `src/`: Contains the main source code for your project, including React components and styles.
- `public/`: Contains static assets and your project's HTML template.
- `package.json`: Defines project dependencies and scripts.

Feel free to customize the project structure to fit your specific project requirements.

## Project Structure-Develop

The project structure is organized as follows:

```
├──.firebase/
│   ├── ...
├── .github/workflows
│   ├── ...
├── functions/
│   ├── index.js
├── node_modules/
│   ├── node_modules
├── public/
│   ├── index.html
│   ├── ...
├── src/
│   ├──assets/
│   │   ├── fonts/...
│   │   ├── icons/...
│   │   ├── images/...
│   │   ├── logos/...
│   ├── components/
│   │   ├── AccountButton
│   │   ├── AddMembers
│   │   ├── ...
│   ├── pages/
│   │   ├── ChatPage/
│   │   ├── HomePage/
│   │   ├── LandingPage/
│   │   ├── NotFoundPage/
│   ├── styles/
│   │   ├── _global.scss
│   │   ├── ...
│   ├── App.js
│   ├── firebase-config.jsx
│   ├── index.js
├── .env
├── .firebaserc
├── .gitignore
├── database.rules.json
├── firebase-debug.log
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── package-lock.json
├── package.json
├── README.md
```

- `.firebase/`: Contains the hosting cache connected to your Firebase database. (note for team: do we need this...?)
- `.github/`: Contains the github workflows for pull requests and merging the firebase host.
- `.functions/`: Holds the index.js file that contains code specific to the AI. 
- `public/`: Contains the project's HTML template.
- `src/`: Contains the main source code for the project, including static assets, React components, pages and styles.
- `.env`: See Getting Started line 5.
- `package.json`: Defines project dependencies and scripts.

## Technologies

This starter repository uses the following technologies:

- React: A JavaScript library for building user interfaces.
- Sass: A CSS extension language that adds features like variables, nesting, and more.
- Firebase: Cloud storage database 

You can expand upon these technologies as needed for your project.

## Contributing

We welcome contributions from the community. If you have suggestions or improvements for this starter repository, please open an issue or create a pull request. For more information on how to contribute, check our [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the [MIT License](LICENSE).
