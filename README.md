React on Rails Starter Kit
==========================

Plug and play Starter Kit for the [Ultimate React Framework](https://github.com/elierotenberg/react-rails).

Usage
=====
1. Fork
2. Hack
3. `grunt`
4. `node dist/render-server`, `node dist/uplink-server`
5. Visit `http://localhost:8080/`


Contents
========

This starter kit contains:

- An opinionated file structure
- Pre-configured dev and build tasks, including preprocessing, bundling and minification.
- QoL tools such as `grunt component "MyNeatComponent"`
- A simple but production-ready Express-based pre-rendering server leveraging React on Rails goodness
- A simple but production-ready Uplink (Flux over the wire) server backend by express + socket.io


What now?
=========

Everything in this repo is configurable.

- Just want to plug in your components? Head to `src/components` and consider using `grunt component`.
- Want to implement client-side global logic? Head to `src/dispatchers/MemoryDispatcher`.
- Want to implement server-side global logic? Head to `src/dispatchers/UplinkDispatcher`.
- Want to modify how you HTML <head> contains? Head to `src/index.tpl`.
- Want to include more stylesheets, external components or customize which plugins are used? Head to `src/App.js`.
- Want to use `gulp` instead of `grunt`? `npm remove grunt; npm install gulp` and plug in your own tasks.
- Want to customize your passive REST backend? Head to `src/Uplink.js`.
