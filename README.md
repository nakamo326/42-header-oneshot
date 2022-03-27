# 42-header-oneshot

![demo.gif](https://raw.githubusercontent.com/nakamo326/42-header-oneshot/main/demo.gif)

You don't have to add 42 headers to every single file!\
Just one command, your all sources will get header.

## Usage

### Insert header to your all source files.

Open command palette (Ctrl + shift + P)\
Input "Add 42 heder to all sources in workspace" and execute command.\
If you open multi workspace, please choose workspace you want to add header.

### Delete header to your all source files.

You can delete all of header as well as inserting.\
Execute "Delete 42 heder to all sources in workspace" from command palette.


### Keyboard ShortCut

### Insert Header

- **macOS** : <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>O</kbd>
- **Linux** / **Windows** : <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>O</kbd>

### Delete Header

- **macOS** : <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>D</kbd>
- **Linux** / **Windows** : <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>D</kbd>

> Current target file type is .c, .h, .cpp and .hpp.

## Configurations

Default values for **username** and **email** are imported from environment variables.

To override therse value, this extension contributes the following settings:

- `42-header-oneshot.user`
- `42-header-oneshot.mail`
