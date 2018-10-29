# SRS Extension

## Build instructions
### Some background about packaging Chrome extensions
This extension replaces the New Tab page with a service of our making. If we simply wanted to embed a "webpage" in the new tab, we could build and test it with regular webpack hot-reloading and handle all the Chrome extension packaging separately in the build step. But because we might want to make use of specific Chrome APIs in the page itself—user preferences storage, for instance—we can't develop it outside the confines of extension packaging. 

The compromise is to use `webpack --watch` during development, instead of `webpack-serve`. This kind of sucks, because you have to open another New Tab to see your change. I'm investigating some fancier workarounds, but this is sufficient for now.

### Build commands
**For all commands:** 
* Run one of the build commands below. It should create a `dist` folder in the project directory.
* Navigate to `chrome://extensions` in the address bar
* Click the switch in the top right corner to toggle Developer mode
* Click "Load Unpacked" and select the `dist` folder created earlier.

`yarn build` outputs the project into a `dist` folder than can be loaded into Chrome.

`yarn start` outputs the project into a `dist` folder, then hangs and recompiles the project each time changes are made. As of now, you'll have to open a new tab to see the changes, but you won't have to re-add or reload the extension in Chrome settings.

### Note on load times
While using `yarn start` you will see a brief Flash of Unstyled Content as Chrome loads both the React and CSS components. If you `yarn build` and then open a new tab, it'll show a blank white page before loading the entire app at once, thanks to some Tim Tregubov webpack magic.

This white flash is annoying, but it's also true of every New Tab extension, and I didn't even notice it before building my own. A reasonable thing to do would be to add a loading logo, but right now it's fast enough that a loading indicator would be more annoying than useful.

