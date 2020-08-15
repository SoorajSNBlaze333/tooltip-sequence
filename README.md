# Tooltip Sequence

A Sequential tooltip generator, that guides your users to new or existing features, by taking them on a tour across the features that you want them to see and be helped on.


# unpkg

In your `base.html` add the unpkg to the head tag
```html
<link rel="stylesheet" href="https://unpkg.com/tooltip-sequence@latest/dist/index.css">
<script src="https://unpkg.com/tooltip-sequence@latest/dist/index.min.js"></script>

<script>
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
        description: "Click here to go to Home page",
      },
      {
        element: "#edit-profile",
        description: "This is the edit profile button",
      },
    ],
  };
  createSequence(options);
</script>
```

# npm

## Installation

Install the package using

```sh
npm install tooltip-sequence --save
```

## Usage

```js
import createSequence from "tooltip-sequence";
import "tooltip-sequence/dist/index.css";

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
      description: "Click here to go to Home page",
    },
    {
      element: "#edit-profile",
      description: "This is the edit profile button",
    },
  ],
};
createSequence(options);
```

You can add any number of elements to your options using either a class or an id selector.

## Customizing the Tooltips

You can customize any element that is created by overriding the classes.

## Development

You need [Hugo](https://gohugo.io/) to run the dev server. If you have [Homebrew](https://brew.sh/) you can do the following:

```sh
brew install hugo
```

Check this [Hugo installation page](https://gohugo.io/getting-started/installing/) for installing on other systems.

Then clone the repo, install dependencies, and start the server locally.

```sh
git clone https://github.com/SoorajSNBlaze333/tooltip-sequence.git
cd tooltip-sequence
npm i
npm start
```

Open [`http://localhost:1313`](http://localhost:1313) in your browser.

| Scripts              | Description                          |
| -------------------- | ------------------------------------ |
| `npm start`          | Starts a local dev server            |
| `npm run production` | For generating production docs files |
