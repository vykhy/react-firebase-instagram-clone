# Getting Started with Create React App

#Intro

This is a project where I built an instagram clone using tailwind, firebase and react. It was a great learning experience and I learnt so much about tailwind, react, with all its 
features and intricacies as well as firebase. 

I mostly used php and laravel before with its fully synchronous nature, so it was a lot of fun!

After completing the tutorial, I added additional functionalities and made several UI updates especially to make it mobile responsive. The two major ones would be photo upload using firebase storage, and the post pop-up view. There was a lot of frustration, mostly arising out of javascript asynchronity, state management and firestore data model but it got done.

Some of the project architecture is not optimal as the tutorial had written some functions with a single use in mind, and it called for some workarounds when reusing them later to add features, which could definitely have been improved by breaking down functions and updating the data model. But I did not want to meddle with the original code too much, nor did I want to rebuild it. Because if I were to rebuild it, I would prefer some other technology such as laravel with its much better object database model and relationships. And we can use Inertia if we wanted to make it an SPA too.

With all that said, I had a lot of fun and it was a great learning experience. I learnt a lot about the specific technologies as well as the bigger picture of laying out and organizing a project. Especially with react, I feel like my eyes were opened on several of its features, common problems and solutions to the point where I am feeling quite confident to tackle big complicated projects.

Biggest takeaways:
1. react hooks and custom hooks
2. firebase auth, firestore, storage and hosting
3. complex conditional renderings
4. state management
5. proptypes
6. dealing with asynchronity

#CHECK IT OUT
This app is hosted on firebase hosting at(https://instagram-clone-a6ecc.web.app/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

 #getting started 
clone repository run npm install run npm start If you want to use as a separate project, you will have to set up a firebase project

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
