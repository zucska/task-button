# Task buttons

Task Buttons for status bar vscode


## Use prefix task 
    "task-XXXXXXXXX"

## Example file package.json

```javascript
  "scripts": {
    "postinstall": "node ./node_modules/vscode/bin/install",
    "task-run-server": "npm run server", // <<<<< example button
    "task-run-test": "npm run test" // <<<<<< example button
    "task-IOS": "react-native run-ios" // <<<<<< example button
  }
```