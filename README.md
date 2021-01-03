## Tech Stack
1. [React](https://reactjs.org/)
2. [Bootstrap](https://getbootstrap.com/)
3. [Wit.ai](https://wit.ai/)
4. [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)

## Deployment Manual

Setup env variables
```
// make sure to create a .env file on the root directory
// add the following to the .env file

REACT_APP_HEADER=<Bearer Token>
```
`Note:` Bearer Token can be taken when you register an account for [Wit.ai](https://wit.ai/)

Install all packages
```
yarn install
```

Run the web app!
```
// if localhost
yarn run start

// if server production
yarn run dev
```

This web app is developed by Isaias Briones and [Amrees Almonte](https://github.com/amreesalmonte).