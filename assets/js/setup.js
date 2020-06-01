// Hello and welcome to my project this website is a singlepage site that can use either
// the github API or my personal code to display projects and all the info about them.
// How to use:
// First you need to have public github repositorys so that they can be loaded into the site

// These repositorys must be named with _ where you want spaces to be added e.g.
// a repo could be called management_console and it would get changed to
// Management Console when you load the website

// Then you need to have a description for the repository which will be used
// in the cards on the main page

// Next you need to have a readme.md file as this is used to load the page content into
// the site

// Next if you want photos on the cards instead of 404 errors then you should place an
// image called screenshot.png in your all of your repo's master branch in the following path:
// /assets/screenshot.png

// Finally you must set the variables below to what you want them as:

var site_url = "https://futurelucas4502.github.io" // URL to index of your site

var owner = "futurelucas4502" // Your github username

var useAPI = false // Whether to use the official API or my personal code.

// Note: The API has a rate limit of 60 requests an hour therefore its recommended to
// have this set as false to use my custom code.

var fixedName1 = "management_console" // Set to the first tab you want to be visible
// outside the dropdown

var fixedName2 = "management_console_mobile" // Set to the second tab you want to be visible
// outside the dropdown
var fixedName1FA = "fa-address-book" // Font awesome icon to be used for the fixed name

var fixedName2FA = "fa-address-book" // Font awesome icon to be used for the fixed name

var full_name = "Lucas Wilson" // Your full name

var repo_name = "futurelucas4502.github.io" // Name of the repo your website is stored in

var docs = `
# futurelucas4502.github.io - Documentation:

Welcome this is a little project I made mostly for myself but the idea is that anyone can fork this and use it on their own github pages or jekyll site (may need extra config for jekyll).

## Setup:

1. Fork the repo
2. Go into the setting and change the name to your-username.github.io
3. Open the setup.js file in assets/js/ and go through the comments in the file to change the 10 variables needed
4. Save and commit your changes to setup.js and your done! (Yes its as easy as that)

**Note**: It may take up to 20 minutes for the site to appear live after following these steps.

## Further customisation:

If you want to host your site at somewhere other than your-username.github.io you can go into the repo settings and set this just make sure you change the site_url in the setup.js file!
`
// The documentation for the site as it can't be placed in docs/index.md as we are
// already using this for other things

// That's it now save and commit your changes and wait and the site will be built however this
// can take up to 20 minutes as stated above

export { site_url, owner, useAPI, fixedName1, fixedName2, fixedName1FA, fixedName2FA, full_name, repo_name, docs }