// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let vscode = require('vscode');
let terminalStack = [];


function generateItem(context, name, command) {
    let title = name.replace("task-", "").replace("-", " ").toUpperCase()
    let key = "button.task." + name;

    vscode.commands.registerCommand(key, () => {
        if (!terminalStack[title]) {
            terminalStack[title] = vscode.window.createTerminal(title);
        }

        terminalStack[title].show();
        terminalStack[title].sendText(command);
    });

    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    statusBarItem.command = key;
    statusBarItem.text = title;
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

}

function generateTask(context) {

    let cwd = vscode.workspace.rootPath;

    vscode.workspace.openTextDocument(cwd + '/package.json').then((document) => {
        let text = document.getText();
        let packageJson = JSON.parse(text);
        let scripts = packageJson.scripts

        if (scripts) {
            for (var x in scripts) {
                if (x.toString().length && x.startsWith("task-")) {
                    generateItem(context, x, scripts[x])
                }
            }
        }
    });

    vscode.window.onDidCloseTerminal((item) => {
        if (terminalStack[item._name])
            delete terminalStack[item._name];
    })

}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    generateTask(context)
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;