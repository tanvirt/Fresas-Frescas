# Fresas-Frescas


URLs:

	Domain: https://fresas-frescas.firebaseapp.com/
	Database: https://console.firebase.google.com/project/fresas-frescas/database/data


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


Required Software:

	1. Google Chrome
	2. Git
	2. Node.js


Command Line Installations:

	npm install -g firebase-tools


To Run Locally:

	1. Open your command prompt to the Fresas-Frescas directory and run: firebase serve
	2. Open Chrome and go to the URL: localhost:5000


The "Real" Docs for Firebase:

	https://github.com/firebase/angularfire/blob/master/docs/reference.md
