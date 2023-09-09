# 42-header-oneshot

![demo.gif](https://raw.githubusercontent.com/nakamo326/42-header-oneshot/main/demo.gif)

No need to manually add 42 headers to every single file!\
With just one command, all your source files will be updated with the header.

## Usage

### Insert a Header to All Your Source Files

1. Open the command palette with Ctrl + Shift + P.
2. Type "Add 42 header to all sources in workspace" and execute the command.
3. If you have multiple workspaces open, choose the workspace where you want to add the header.

### Remove Headers from All Your Source Files

1. Access the command palette.
3. Execute "Delete 42 header from all sources in workspace."


### Keyboard ShortCut

### Insert Header

- **macOS** : <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>O</kbd>
- **Linux** / **Windows** : <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>O</kbd>

### Delete Header

- **macOS** : <kbd>⌘</kbd> + <kbd>⌥</kbd> + <kbd>D</kbd>
- **Linux** / **Windows** : <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>D</kbd>

> Currently, this extension targets the following file types: .c, .h, .cpp, and .hpp.

## Configurations

By default, the **username** and **email** values are imported from environment variables.

To override these values, this extension offers the following settings:

- `42-header-oneshot.user`
- `42-header-oneshot.mail`
