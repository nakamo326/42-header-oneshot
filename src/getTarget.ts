import * as vscode from 'vscode';

export async function getTarget() {
  let workspace;
  await getWorkspace().then((ret) => {
    workspace = ret?.uri.path;
  });
  console.log(workspace);
  if (!workspace) {
    return undefined;
  }
  const pattern = new vscode.RelativePattern(workspace, '**/*.{c,h,cpp,hpp}');
  const uris = await vscode.workspace.findFiles(pattern, null);
  return uris;
}

// if user open multi workspace, choose by showWorkspaceFolderPick method
function getWorkspace(): Thenable<vscode.WorkspaceFolder | undefined> {
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showInformationMessage('please open workspace.');
    return Promise.reject(undefined);
  } else if (vscode.workspace.workspaceFolders.length === 1) {
    return Promise.resolve(vscode.workspace.workspaceFolders[0]);
  }
  return vscode.window.showWorkspaceFolderPick();
}
