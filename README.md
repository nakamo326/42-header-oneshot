# 42-header-oneshot

![demo.gif](https://raw.githubusercontent.com/nakamo326/42-header-oneshot/main/demo.gif)

You don't have to add 42 headers to every single file!\
Just one command, your all sources will get header.

## Usage

### Insert header to your all source files.

Open command palette (Ctrl + shift + P)

input "Add 42 heder to all sources in workspace" and execute command.

If you open multi workspace, please choose workspace you want to add header.

#### Keyboard ShortCut

- **macOS** : <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>O</kbd>
- **Linux** / **Windows** : <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>O</kbd>.

> Current target file type is .c, .h, .cpp and .hpp.

## Configurations

Default values for **username** and **email** are imported from environment variables.

To override therse value, this extension contributes the following settings:

- `42-header-oneshot.user`
- `42-header-oneshot.mail`

## Known Issues

This extension is not tested much.\
If you want to use this extension, Please be careful.\
Push local change to remote repo before execute!
