# HubHub UI

This React application serves as the user interface for [helxplatform/hubhub](https://github.com/helxplatform/hubhub).

### 🚧 Application Development

Now, that we have the base code. We're ready to install the application depdendencies and begin development. Move into the project root, and install the dependencies with `npm i`. Then start a local development server by running `npm start`. Note that this development environment utilizes [hot-module-replacement](https://webpack.js.org/guides/hot-module-replacement/) and [react-refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin) for optimal developer experience. That's it!

### 🎁 Building for Production

To build a production-ready React app from this starter, run `npm run build` from the project root directory. The bundled files will be exported to the `dist` directory.

To build an easily debuggable production build, use `npm run build-dev`.

### GitHub Pages Deployment

As development ramps up, quick deployments to GitHub Pages ([helxplatform.github.io/hubhub-ui/](https://helxplatform.github.io/hubhub-ui/)) by building the application bundle pushing to the `gh-pages` branch. A single script handles this: `npm run deploy`.
