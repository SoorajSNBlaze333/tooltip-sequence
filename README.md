# Tooltip Sequence
A Sequential tooltip generator, that guides your users to new or existing features, by taking them on a tour across the features that you want them to see and be helped on.

## Installation
Install the package using 
```shell
npm install tooltip-sequence --save
```
## Usage
```javascript
import { createSequence } from 'tooltip-sequence';
import 'tooltip-sequence/index.css';

const options = {
  welcomeText: "Let us take you on a quick tour of the page!",
  confirmText: "Let's start",
  cancelText: "Maybe later",
  sequence: [{
    element: '#brand-name',
    description: 'This is the brand name of the App.'
  }, {
    element: '#home-nav',
    description: 'Click here to go to Home page'
  }, {
    element: '#edit-profile',
    description: 'This is the edit profile button'
  }]
};
createSequence(options);
```

You can add any number of elements to your options using either a class or an id selector.

## Customizing the Tooltips
You can literally customize any element that is being created by just overriding the classes.