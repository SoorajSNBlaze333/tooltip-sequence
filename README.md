<h1 style="width: 100%; text-align: center; font-weight: 200; margin-bottom: 10px">Tooltip Sequence</h2>
<div style="text-align: center; font-size: 12px; margin-bottom: 15px; font-weight: 200">A minimalistic set of tooltips on your app.</div>

<div style="width: 100%; display: flex; justify-content: center; align-items: center;">
  <a href="https://github.com/SoorajSNBlaze333/tooltip-sequence/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/SoorajSNBlaze333/tooltip-sequence" style="margin: 2px"></a>
  <a href="https://github.com/SoorajSNBlaze333/tooltip-sequence/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/SoorajSNBlaze333/tooltip-sequence" style="margin: 2px"></a>
  <a href="https://github.com/SoorajSNBlaze333/tooltip-sequence/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/SoorajSNBlaze333/tooltip-sequence" style="margin: 2px"></a>
  <a href="#"><img alt="size" src="https://img.shields.io/badge/size-6kb-brightgreen" style="margin: 2px"></a>
</div>

<div style="margin: 10px 0px">
  <img src="./docs/static/cover.png" style="width: 100%" alt="cover"/>
</div>

<div style="margin: 10px 0px">
  <h2 style="font-weight: 200;">What it does</h2>
  <div style="font-size: 12px; font-weight: 200;">So suppose you create a Web Application and you want to take your users or anyone on a walkthrough on one, two or maybe all the features in your app, you can install this simple Javascript package to create a sequence of small tooltips that will guide the user to each feature( in our case a web element ) and show a small description of what you want them to know about that feature.This package would save you the time to manually create tooltip descriptions on each page and link them together in action.</div>
</div>

<h2 style="margin: 10px 0px;font-weight: 200;">Installation</h2>


<h3 style="font-weight: 100;">Quick Usage ⚡️</h3>
<div style="font-size: 12px; font-weight: 200;">Add the following tags to your HTML document</div>

```html
<link rel="stylesheet" href="https://unpkg.com/tooltip-sequence@latest/dist/index.css">
<script src="https://unpkg.com/tooltip-sequence@latest/dist/index.min.js"></script>
```

<h3 style="font-weight: 100;">Or</h3>

<h3 style="font-weight: 100;">Use npm</h3>

```sh
npm install tooltip-sequence --save
```

<div style="font-size: 12px; font-weight: 200;">Add the following statements to the file that uses the sequence</div>

```js
import createSequence from "tooltip-sequence";
import "tooltip-sequence/dist/index.css";
```

<h2 style="margin: 10px 0px;font-weight: 200;">Example</h2>

```js
const options = {
  welcomeText: "Let us take you on a quick tour of the page!",
  confirmText: "Let's start",
  cancelText: "Maybe later",
  sequence: [
    {
      element: "#brand-name",
      description: "This is the brand name of the App.",
    },
    {
      element: "#home-nav",
      description: "<h2>Click here to go to Home page. <div>Home Page</div></h2>",
    },
    {
      element: "#edit-profile",
      description: "📝 This is the edit profile button",
    },
  ],
};
createSequence(options);
```
<div style="font-weight: 200;">Infinite Customizations available. You can customize any element that is created by overriding the classes. Customizations are only limited by the creativity of the designer</div>

<h2 style="margin-top: 10px; font-weight: 200;">Checkout the features and a live demo <a href="https://tooltip-sequence.netlify.app/">here</a></h2>
