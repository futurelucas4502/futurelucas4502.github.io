import { site_url, owner, useAPI } from "./setup.js"
var converter = new showdown.Converter();
var otherResponse = Array()
var html

function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

$(document).ready(async function () {
    if (document.location.href == `${site_url}/docs/index.html` || document.location.href == `${site_url}/docs/index` || document.location.href == `${site_url}/docs/` || document.location.href == "http://localhost/futurelucas4502.github.io/docs/index.html" || document.location.href == "http://localhost/futurelucas4502.github.io/docs/index" || document.location.href == "http://localhost/futurelucas4502.github.io/docs/") {
        window.location.replace("https://futurelucas4502.github.io"); // Load /docs = redirect to main page
    } else {
        document.getElementById("content").innerHTML = `<h4 style="margin:20px 0px" class="text-muted" id="loading"><span class="spinner-border m-1"
        style="width: 1.25rem;height: 1.25rem;border-width: .2rem;" role="status"
        aria-hidden="true"></span>Loading...</h4>`
        otherReady(get("docs")) // Else
    }
})

// Start Other Pages Loading
async function otherReady(name) {
    var nameFormatted = (name.replace(/_/g, ' ')).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
    if (useAPI) {
        otherResponse = await fetch(`https://api.github.com/repos/${owner}/${name}`); // Using github API
        otherResponse = await otherResponse.json();
    } else {
        await fetch('https://cors-anywhere.herokuapp.com/' + `https://github.com/${owner}/${name}`).then(res => { // Not using github API
            // The API call was successful!
            return res.text();
        }).then(function (html) {
            // Convert the HTML string into a document object
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            // Get the data
            let tempName = {
                "description": doc.querySelectorAll("span[itemprop='about']")[0].innerText
            }
            otherResponse.push(tempName)
        })
    }
    // Method where I fetch the file contents of the readme manually
    var page = get("page")
    if(page == undefined)page = "index"
    await fetch(`https://raw.githubusercontent.com/${owner}/${name}/master/docs/${page}.md`).then(res => {
        return res.text();
    }).then(data => {
        otherResponse[name] = data;
    });
    html = converter.makeHtml(otherResponse[name]);
    document.getElementById("content").innerHTML = html
    document.getElementsByClassName("project-name")[0].textContent = document.getElementsByTagName("h1")[1].innerText
    document.getElementsByClassName("project-tagline")[0].textContent = otherResponse[0]["description"]
    document.title = `${owner}'s Documentation || ${nameFormatted}`
}
// End Other Pages Loading