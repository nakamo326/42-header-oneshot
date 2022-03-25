import * as vscode from 'vscode';

export async function getTarget() {
  const workspace = await getWorkspace();
  if (!workspace) {
    return undefined;
  }
  const pattern = new vscode.RelativePattern(workspace.uri.path, '**/*.{c,h,cpp,hpp}');
  const uris = await vscode.workspace.findFiles(pattern, null);
  return uris;
}

async function getWorkspace(): Promise<vscode.WorkspaceFolder | undefined> {
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showInformationMessage('please open workspace.');
    return undefined;
  }
  if (vscode.workspace.workspaceFolders.length === 1) {
    return vscode.workspace.workspaceFolders[0];
  }
  return await vscode.window.showWorkspaceFolderPick();
}
