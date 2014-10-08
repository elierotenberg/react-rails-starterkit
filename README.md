React on Rails Starter Kit
==========================

Plug and play Starter Kit for the [Ultimate React Framework](https://github.com/elierotenberg/react-rails).

Usage
=====
0. Clone/fork
0. `npm install`
0. Hack the code
0. `npm start`
0. Visit `http://localhost:8080/`

Important note: Don't `npm install react` or anything similar. `react-rails` includes its own version of React,
and you should use it. `require('react-rails').React` if needed, but React just doesn't work well if multiple
instances are in the same package.


Release notes/news
==================
- 30/9/2014: Should be ready for use, but expect some bugs, still very early release.
Feel free to post and issue.

Whats included?
===============

This starter kit contains:

- An opinionated, simple and efficient file structure (see below)

- Preconfigured assets pipelines and build tools, including:
    - linting (`jshint` with `esnext` and `globals:Promise`)
    - Serveral bread-and-butter libs/polyfills, including:
        - `lodash` (fast `_` API implementation),
        - `bluebird` (fast `Promise` API implementation),
        - `R.scope` (fast `bind` for context-only function binding),
        - `cors` for `express`,
        - `co` (generators-based coroutines).

    - ES6/7/JSX to ES5 transpiling of many features:
        - Promises (`bluebird`),
        - `jsx` transforms (`react-tools`),
        - es6 generators (using [`regenerator`](https://github.com/facebook/regenerator)),
        - all the features supported by [`esnext`](https://github.com/esnext/esnext):
            - arrow functions,
            - classes,
            - comprehensions,
            - computed property keys,
            - default params,
            - destructuring,
            - iterators + for-of,
            - object literal concise definitions,
            - object literal shorthand,
            - rest params,
            - spread,
            - template strings.

    - Common JS bundling for the browser (using `browserify`)
        - all of the above transformations transpiled to ES5,
        - `fs.readFileSync` and alike static files preloading (using `brfs`),

    - `development`/`production` modes (configurable in `src/config.js`) to opt-in/out of:
        - js minification (using `UglifyJS 2`),
        - css minification (using `css-min`),
        - skip runtime types/invariants checks from React and React on Rails,
        - reduce console verbosity,
        - disable long traces support for `setImmediate` and `Promise`.

    - `gulp watch` that "just works", including `watchify + browserify` for super fast incremental builds,

    - Style processing
        - `normalize.css` included by default,
        - `autoprefixer` and `css-min` (in `production` mode) on components styles and stylesheets,
        - optionally declare your components' style in their class definition, they get processed
        and bundled into `components.css` and served statically. Who needs a CSS preprocessor when you
        get the full power of JS?

- A complete starter app source, including:
    - A simple components hierarchy,
    - A navigation router,
    - A memory-based Flux (Store/EventEmitter/Dispatcher) named `memory`
    - An uplink-based Flux named `uplink`
    - A static server, serving `static/` under the path `/`
    - A prerendering server,
    - A basic Uplink server implementing Flux over the wire,
    - Preconfigured plugins for React of Rails:
        - `R.History`, managing navigation,
        - `R.Localize`, managing i18n,
        - `R.Window`, managing window events,
        - `R.XWindow`, managing cross-window events,
        - `R.Fullscreen`, managing fullscreen state/events,

- Several scaffolding tools:
    - `gulp component --displayName=MyComponent [--tagName=div]` to scaffold a component
    named `MyComponent` in `src/components`, and populates its `render` method with the appropriate JSX element.
    JSX element tagName defaults to div, but can be anything like "span", "MyOtherComponent", etc.
    Component name should match /[A-Z][a-zA-Z0-9]*$/, ie. be like MyComponent, not like myComponent or my_Component.
    - `gulp import-all-components` to update `src/componentsClasses` to reflect all the components in `src/components`.
    - `npm start` that "just works".


What now?
=========

Everything in this repo is configurable.

- Just want to plug in your components? Head to `src/components` and consider using `gulp component` for scaffolding.
- Want to implement client-side global logic? Head to `src/dispatchers/MemoryDispatcher`.
- Want to implement server-side global logic? Head to `src/dispatchers/UplinkDispatcher`.
- Want to modify how you HTML <head> contains? Head to `src/index.tpl`.
- Want to include more stylesheets, external components or customize which plugins are used? Head to `src/App.js`.
- Want to customize your passive REST backend? Head to `src/Uplink.js`.

File structure
==============

The file structure has been carefully curated to be pleasant to work with.
You are free to modify it but many things such as automated tasks and cross-dependencies depends on it.

```
Project root
+--package.json
|    Package configuration. Make sure to update it by running `npm init`.
|    Core module `assert` is listed as a dependency because oddly browserify requires it.
|
+--config.js
|    Configuration variables. Keys are straightforward, notable keys include
|    `supportedLocales`, `mode` (either `development` or `production`), and render/uplink
|    server hostnames and ports.
|    Don't mind the convoluted trick with process["env"]["NODE_ENV"], its working as intented.
|
+--.gitignore
|    In addition to `node_modules` and the usual, contains `dist` and `tmp`.
|    Consider removing `node_modules` and `dist` if you plan to use git for deployment.
|
+--README.md
|    This file. Overwrite with you own README.md.
|
+--gulpfile.js
|    Contains a series of preconfigured tasks. You can safely add yours.
|    Notable tasks include:
|      - `default`, which builds everything, puts the server executables in `dist` and the
|         bundled client in `static`,
|      - `watch`, which automatically rebuilds everything incrementally (leveraging
|         `watchify` for `browserify` and `gulp-cached` for other tasks)
|      - `component`, which bootstraps a new component using eg.
|        `gulp component --displayName="MyComponent"`
|      - `styles`, interprets all styles declared in components sources, and bundles them
|        into `static/components.css`.
+--src
|  |  Single source of truth for the building pipeline. Contains all of your actual source.
|  |  Files in this directory will be transpiled to ES3, but you can safely use `jsx` tags
|  |  (in `.jsx` files), generators (`function*()`), arrow functions, destructuring, etc.
|  |
|  +--components
|  |  |  Directory for the components classes.
|  |  |  You should have exactly one file per component class, with the extension `.jsx`
|  |  |  and the `jsx` pragma `/** @jsx React.DOM */`. This file should export a single
|  |  |  value, which should be the result of `React.createClass`.
|  |  |  Components class names should have their first letter uppercased.
|  |  |  Most components should have `R.Component.Mixin`.
|  |  |  You may easily scaffold new components using
|  |  |  `gulp component --displayName=MyComponent` (see below).
|  |  |
|  |  +--Root.jsx
|  |  |    Default root component, preconfigured to play nicely as an isomorphic router
|  |  |    backed by the `memory` store populated by `R.History.Plugin`.
|  |  |    Routes are read from `/src/routers/NavigationRouter`.
|  |  |    Feel free to modify the routing behaviour, remove it, or move it
|  |  |    into another component.
|  |  |
|  |  +--HistoryLink.jsx
|  |  |    App-level link component preconfigured to play nicely with `R.History.Plugin`,
|  |  |    backed by the `memory` dispatcher.
|  |
|  +--dispatchers
|  |  |  Directory for the dispatchers classes.
|  |  |  You should have exactly one file per dispatcher class. This file should export a
|  |  |  single value, which should be the result of `R.Dispatcher.createDispatcher`.
|  |  |  Each dispatcher class defines how actions are dispatched, and most often trigger
|  |  |  side effects in the current Flux instance, such as updating a store.
|  |  |  A single dispatcher class can be used, but it is recommended to use one dispatcher
|  |  |  class per backend (eg. one for local data, one for server-sent data) to avoid
|  |  |  confusion.
|  |  |  Most dispatchers will simply be instances of a `R.Dispatcher.createDispatcher`
|  |  |  constructor, but since Dispatcher is just an API contract, you might want to
|  |  |  implement your own.
|  |  |
|  |  +--MemoryDispatcher.js
|  |  |  Default memory dispatcher. Add your actions listeners here.
|  |  |
|  |  +--UplinkDispatcher.js
|  |  |  Default uplink dispatcher. Add your actions listeners here.
|  |  |  Note that an uplink dispatcher usually won't actually do much on its own; most
|  |  |  times it will only check input and forward appropriate messages to the underlying
|  |  |  `Uplink` instance.
|  |
|  +--eventEmitters
|  |  |  Directory for the event emitters classes.
|  |  |  You should have exactly one file per event emitter class. This file should export
|  |  |  a single value, which should be the result of `R.EventEmitter.createEventEmitter`.
|  |  |  Most event emitters will use presets from `R.EventEmitter`, but since EventEmitter
|  |  |  is just an API contract, you might want to implement your own.
|  |  |
|  |  +--MemoryEventEmitter.js
|  |  |  Cached value of calling `R.EventEmitter.createMemoryEventEmitter`.
|  |  |  Represents a local event emitter residing in memory. It exposes an `emit` method
|  |  |  which a Dispatcher (usually a MemoryDispatcher) may invoke.
|  |  |
|  |  +--UplinkEventEmitter.js
|  |  |  Cache value of calling `R.EventEmitter.createUplinkEventEmitter`.
|  |  |  Represents a remote event emitter residing in an uplink server. It is
|  |  |  subscribe-only and a Dispatcher may not emit directly, only pass actions to an
|  |  |  uplink server that will then emit.
|  |
|  +--routers
|  |  |  Directory for the routers classes.
|  |  |  You should have exactly one file per router class. This file should export a
|  |  |  single value, which should be derived from `R.Router`.
|  |  |  Most routers will simply derive `R.Router` by prototypal inheritance and
|  |  |  adding some routes, but since Router is just and API contract, you might want
|  |  |  to implement your own.
|  |  |  Remember that in `R`, routers are just URL-patterns-friendly generalized regular
|  |  |  expressions, and are passive objects waiting for you to call `match` on them.
|  |  |
|  |  +--NavigationRouter.js
|  |  |  An demo navigation router, feel free to edit it.
|  |  |  Note that `/src/components/Root` relies on its behaviour, update it accordingly.
|  |
|  +--stores
|  |  |  Directory for the stores classes.
|  |  |  You should have exactly one file per store class. This file should export a
|  |  |  single  value, which should be the result of `R.Store.createStore`.
|  |  |  Most event emitters will use presets from `R.Store`, but since Store is just an
|  |  |  API contract, you might want to implement your own.
|  |  |
|  |  +--MemoryStore.js
|  |  |  Cached value of calling `R.Store.createMemoryStore`.
|  |  |  Represents a local store residing in memory. It exposes a `set` method which a
|  |  |  Dispatcher (usually a MemoryDispatcher) may invoke.
|  |  |
|  |  +--UplinkStore.js
|  |  |  Cached value of calling `R.Store.createUplinkStore`.
|  |  |  Represents the local reflection of a store residing in an Uplink server. This
|  |  |  reflection is automatically updated whenever the Uplink server is updated.
|  |
|  +--App.js
|  |  Main `R.App` class.
|  |  You may want to modify the main HTML file template, do more stuff at template vars
|  |  bootstrapping time, load more stylesheets, etc.
|  |  Default configuration include general purpose plugins (Window, History, Localize,
|  |  Fullscreen, XWindow), which you may remove if you don't want them, as well as
|  |  `normalize.css`.
|  |  If you want to add your CSS framework of choice (such as Twitter Bootstrap or Pure),
|  |  just drop your stylesheet there.
|  |  Don't forget to copy the stylesheet in `static` at build time (see
|  |  `gulpfile.js`).
|  |  If you need more scripts to be loaded on the client (eg. Facebook SDK), you can also
|  |  add them, but note that they won't be available in node, so make sure no isomorphic
|  |  code depends on them.
|  |
|  +--client.js
|  |  Client entry point. Simply mounts the class on the client. You most likey won't modify
|  |  anything here.
|  |
|  +--Flux.js
|  |  Main `R.Flux` class.
|  |  Here is setup the context in which each app instance will run (either on the client or
|  |  on the server).
|  |  You may want to add more initalization, but beware not to create leaks, such as
|  |  timeouts or intervals.
|  |  This file is typically where your define your remote connections (such as uplink or
|  |  REST client), stores, event emitters and dispatchers.
|  |  The default configuration includes:
|  |    - one uplink client
|  |    - one memory-backed store (`memory`)
|  |    - one uplink-backed store (`uplink`)
|  |    - one memory-backed event emitter (`memory`)
|  |    - one uplink-backed event emitter (`uplink`)
|  |    - one dispatcher intented to handle purely local actions (`memory`)
|  |    - one dispatcher intented to handle local-remote actions (`uplink`)
|  |
|  +--index.tpl
|  |  Main HTML template file. You probably won't need to modify it, since the default
|  |  template is production-ready, assuming `/App` is correctly configured.
|  |
|  +--render-server.js
|  |  Render/static server entry point. Starts a new `express` server and mounts a
|  |  `static` middleware to serve `/static` as `/`.
|  |  Feel free to replace `express` by something else or add more middleware (caching, etc).
|  |
|  +--server.js
|  |  Simple process manager whose sole job is to start both `/render-server` and
|  |  `/uplink-server` as child processes.
|  |  In addition, server.js watches for changes in `dist` and restarts its children
|  |  whenever its contents changes. Ideal in combination with `gulp watch`.
|  |
|  +--uplink-server.js
|  |  Uplink server entry point. Starts a new `express` server and mounts the uplink server.
|  |
|  +--Uplink.js
|  |  Main `R.Uplink` class. Simple `Uplink` client configured to work well.
|  |
|  +--UplinkServer.js
|  |  Main `R.UplinkServer` class. Resembles closely an all-in-one dispatcher.
|  |  Here you can modify what happens when a new session is created, or a session is
|  |  destroyed (either leaves or expires).
|  |  Stores and event emitterw need to be explicitly whitelisted (router-like patterns
|  |  are accepted).
|  |  Actions handlers are passed to their handler generators.
|  |  You may want to use locks to avoid race conditions (see `R.Lock`).
|
+--dist
|  Don't put anything here. Its intented to be populated and cleaned by automated tasks.
|
+--static
|  All files in this directory will be publicly accessible.
|  This is were the browserified client build is put, as `client.js`.
|  You can put here custom CSS stylesheets, external JS deps, images, favicon.ico, etc.
|  By default, should contain "normalize.css", copied from the npm package `normalize.css`
|  for automatic update.
|
+--tasks
|  |  Quality of life tasks to ease your development/deployment experience.
|  |
|  +--createAllComponentsStylesheets.js
|  |  Extracts all the styles declared inside components source files, process them, and
|  |  bundles them into the appropriate .css files in `static/`. For example, if a components'
|  |  `statics.getStylesheetRules` returned { components: ..., main: ... }, then the rules
|  |  will respectively get dumped into `static/components.css` and `static/main.css`.
|  |
|  +--createComponent.js
|  |  Pass a component name as `--displayName="ComponentName"`.
|  |  Creates a new file into `/src/components` in a new `.jsx` file, containing a predefined
|  |  template.
|  |
|  +--createComponent.tpl
|  |  Template injected into new components files. Feel free to modify it, for example if you
|  |  want to include more or less libs.
```
