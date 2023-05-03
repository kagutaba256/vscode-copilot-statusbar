import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  )

  const updateStatusBar = () => {
    const isEnabled = vscode.workspace
      .getConfiguration()
      .get('github.copilot.inlineSuggest.enable')
    statusBar.text = isEnabled
    // 
      ? `$(circle-filled) Copilot: ON`
      : `$(circle-slash) Copilot: OFF`
    statusBar.color = isEnabled ? 'green' : 'red'
    statusBar.tooltip = isEnabled
      ? 'GitHub Copilot suggestions are enabled'
      : 'GitHub Copilot suggestions are disabled'
    statusBar.command = 'settings.cycle.copilot'
    statusBar.show()
  }

  const configListener = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration('github.copilot.inlineSuggest.enable')) {
      updateStatusBar()
    }
  })

  context.subscriptions.push(statusBar)
  context.subscriptions.push(configListener)
  updateStatusBar()
}

export function deactivate() {}
