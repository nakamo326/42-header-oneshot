import * as assert from 'assert';

import * as vscode from 'vscode';
import { getUser, getMail } from '../../getConfig';
import { env } from 'process';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('getUser test', async () => {
    env.USER = 'testuserenv';
    assert.strictEqual(getUser(), 'testuserenv');

    // await vscode.commands.executeCommand('vscode.openFolder',);
    // let settings = vscode.workspace.getConfiguration('42-header-oneshot');
    // await settings.update('user', 'testuser');
    // assert.strictEqual(getUser(), 'testuser');

    delete env.USER;
    assert.strictEqual(undefined, getUser());
  });

  test('getMail test', () => {
    env.MAIL = 'testuser@student.42tokyo.jp';
    assert.strictEqual(getMail(), 'testuser@student.42tokyo.jp');

    delete env.MAIL;
    assert.strictEqual(getMail(), undefined);
  });
});
