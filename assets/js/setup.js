// Hello and welcome to my project this website is a singlepage site that can uses code to display projects and all the info about them without accessing githubs API.
// How to use:
// First you need to have public github repositorys so that they can be loaded into the site

// These repositorys must be named with _ where you want spaces to be added e.g.
// a repo could be called management_console and it would get changed to
// Management Console when you load the website

// Then you need to have a description for the repository which will be used
// in the cards on the main page

// Next you need to have a readme.md file as this is used to load the page content into
// the site

// Finally you must set the constants below to what you want them as:

const site_url = "https://futurelucas4502.github.io" // URL to index of your site

const owner = "futurelucas4502" // Your github username

// Note: The github API has a rate limit of 60 requests an hour therefore this whole site functions without using the API yes its jank but it means the website can be visited more than 60 times which i think is better even if it is a little slower

// Originally there were many options here but each eventually stopped working till now only one remains if this one fails feel free to change this to another cors proxy
const cors = "https://corsproxy.io/?"

const fixedName1 = "futurelucas4502" // Set to the first tab you want to be visible
// outside the dropdown

const fixedName2 = "management_console_mobile" // Set to the second tab you want to be visible
// outside the dropdown

const fixedName1FA = "fa-user" // Font awesome icon to be used for the fixed name

const fixedName2FA = "fa-address-book" // Font awesome icon to be used for the fixed name

const full_name = "Lucas Wilson" // Your full name

const repo_name = "futurelucas4502.github.io" // Name of the repo your website is stored in

const docs = `
# Introduction:

Welcome this is a "little" project I made mostly for myself but the idea is that anyone can take this and use it on their own github pages site.

## Setup:

1. Go to [here](https://github.com/futurelucas4502/futurelucas4502.github.io) and press the "Use this template" button
<br><br>
2. Then name the repo "your-username.github.io", add a description and click "Create repository from template"
<br><br>
3. Open the setup.js file in assets/js/ and go through the comments in the file to change the 11 constants needed 
<br><br>
4. If you want documentation to show up properly add a folder called docs in all your repositories with index.md and any other markdown files
<br><br>
5. To set favicons for documentation make sure to include a favicon.ico in the docs folder of all your repositories
<br><br>
6. To set up what the app looks like when saved to the homescreen on iOS, Android and Windows etc go to [here](https://realfavicongenerator.net/) if you don't my icon and name etc will be used so this is highly recommended!
<br><br>
7. Then when you download the zip file delete "favicon.ico", "favicon-16x16.png" and "favicon-32x32.png" as we are using your github profile image as the favicon (Also after you've downloaded the zip don't follow the guide it gives you saying what tags to include!!)
<br><br>
8. Then copy the remaining files to the root of the site and overwrite the existing one's
**Note**: Also do not insert into the head the code it tells you to as its already done and we will be configuring it later.
9. Next if you want photos of the project on the cards instead of 404 errors then you should place an image called screenshot.png in your all of your repo's master branch in the following path: /assets/screenshot.png
<br><br>
10. Now in order to set the app up for use as a PWA (Progressive web app) that can be "installed" visit [here](https://appsco.pe/developer/splash-screens) and upload your image and download the zip file generated
<br><br>
11. Now delete the splashscreens folder already in the repo and place the one extracted from the zip in the root of the site
<br><br>
12. Now delete lines 29 to 58 in index.html and copy the html tags the site generates to the index.html file
<br><br>
13. Next set all the info from line 7 to 49 in index.html and line 16 to 40 in _layouts/default.html to what you want it as (it sounds like a lot but theres a line space between each line to make it easier to read so its actually not very much)
<br><br>
14. Open style.scss and index.css in /assets/css and default.html in _layouts make any changes you like to the theme
<br><br>
15. Save and commit your changes and your done!

**Note**: It may take up to 20 minutes for the site to appear live after following these steps.

## Further customisation:

If you want to host your site at somewhere other than your-username.github.io you can go into the repo settings and set this just make sure you change the site_url in the setup.js file!
`
// Above is the documentation for the site as it can't be placed in docs/index.md as we are
// already using this for other things

// That's it now save and commit your changes and wait and the site will be built however this
// can take up to 20 minutes as stated above

export { site_url, owner, cors, fixedName1, fixedName2, fixedName1FA, fixedName2FA, full_name, repo_name, docs }
