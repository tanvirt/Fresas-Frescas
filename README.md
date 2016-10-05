# Fresas-Frescas

App Structure:

	app/
	----- shared/   	// Acts as reusable components or partials of our site
	----- components/   // Each component is treated as a mini Angular app
	----- app.module.js // Creates the main module and runs on startup
	----- app.routes.js // Provides routes to all views and links controllers
	assets/
	----- img/      	// Images and icons for our app
	----- css/      	// All styles and style related files (SCSS or LESS files)
	----- js/       	// JavaScript files written for our app that are not for angular
	----- libs/     	// Third-party libraries such as jQuery, Moment, Underscore, etc.
	index.html

Command Line Installations:

	npm install -g http-server

To Run Locally:

	1. Open your command prompt to the Fresas-Frescas directory and run: http-server -o
	2. Open Chrome and go to the URL: 127.0.0.1:8080
	3. Right-click on the webpage and click "Inspect Element" to open Chome DevTools
	4. Click "Network" in the toolbar and check the "Disable cache" checkbox
