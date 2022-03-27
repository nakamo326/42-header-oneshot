import * as vscode from 'vscode';
import { hasHeader } from './hasHeader';

export async function deleteHeader(target: vscode.Uri[]) {
  await Promise.all(
    target.map(async (file) => {
      const t = vscode.workspace.fs.readFile(file);
      const text = (await t).toString();
      if (!hasHeader(text)) {
        // console.log(`${file.path} is skipped!`);
        return;
      }

      const outputBuf = Uint8Array.from(Buffer.from(text.split('\n').slice(12).join('\n')));
      await vscode.workspace.fs.writeFile(file, outputBuf);
      // console.log(`${path.basename(file.path)} is added header!`);
    }),
  );
}
