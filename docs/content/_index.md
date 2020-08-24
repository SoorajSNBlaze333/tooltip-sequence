---
title: "Tooltip Sequence"
---

<h1 style="width: 100%; font-weight: 200;" class="text-center w-100 mt-2">Tooltip Sequence</h2>
<hr class="m-0"/>
<div style="font-size: 14px; font-weight: 200" class="text-center w-100 mt-2 mb-2">"A minimalistic set of tooltips on your app."</div>

<div style="width: 100%; display: flex; justify-content: center; align-items: center;">
  <a style="margin: 2px" href="https://github.com/SoorajSNBlaze333/tooltip-sequence/stargazers"><img alt="GitHub stars" id="github-stars" src="https://img.shields.io/github/stars/SoorajSNBlaze333/tooltip-sequence" ></a>
  <a style="margin: 2px" href="https://github.com/SoorajSNBlaze333/tooltip-sequence/network"><img alt="GitHub forks" id="github-forks" src="https://img.shields.io/github/forks/SoorajSNBlaze333/tooltip-sequence"></a>
  <a style="margin: 2px" href="https://github.com/SoorajSNBlaze333/tooltip-sequence/issues"><img alt="GitHub issues" id="github-issues" src="https://img.shields.io/github/issues/SoorajSNBlaze333/tooltip-sequence"></a>
  <a style="margin: 2px" href="#"><img alt="size" id="github-size" src="https://img.shields.io/badge/size-6kb-brightgreen"></a>
</div>

<div class="mt-3 text-center">
  <img src="./cover.png" class="img-fluid w-100 rounded border" style="max-width: 900px" alt="cover"/>
</div>

<div class="mb-4 text-center">
  <div style="font-weight: 200;" class="mt-1 mb-2">To take a quick demo of the package/plugin, please click the button below</div>
  <button id="demo-btn" onclick="return handleClick()" class="btn btn-dark mt-1">Demo</button>
</div>

<div class="mt-3 mb-3">
  <h1 style="font-weight: 200;">What it does</h1>
  <div style="font-size: 13px; font-weight: 200;">So suppose you create a Web Application and you want to take your users or anyone on a walkthrough on one, two or maybe all the features in your app, you can install this simple Javascript package to create a sequence of small tooltips that will guide the user to each feature( in our case a web element ) and show a small description of what you want them to know about that feature.This package would save you the time to manually create tooltip descriptions on each page and link them together in action.</div>
</div>

<h1 style="font-weight: 200;" class="mt-3 mb-3">Installation</h1>


<h3 style="font-weight: 200;">Quick Usage ⚡️</h3>
<div style="font-size: 12px; font-weight: 200;">Add the following tags to your HTML document</div>

```html
<link rel="stylesheet" href="https://unpkg.com/tooltip-sequence@latest/dist/index.css">
<script src="https://unpkg.com/tooltip-sequence@latest/dist/index.min.js"></script>
```

<h3 style="font-weight: 200; font-size: 20px;" class="text-muted">Or</h3>

<h3 style="font-weight: 200;">Use npm</h3>

```sh
npm install tooltip-sequence --save
```

<div style="font-size: 12px; font-weight: 200;" class="mb-2">**Add the following statements to the file that uses the sequence**</div>

```js
import createSequence from "tooltip-sequence";
import "tooltip-sequence/dist/index.css";
```

<h1 style="font-weight: 200;" class="mt-3 mb-3">Example</h1>

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