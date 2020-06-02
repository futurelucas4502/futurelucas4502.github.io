import { site_url, owner, useAPI, cors, repo_name, docs } from "./setup.js"
var converter = new showdown.Converter();
var otherResponse = Array()
var html

function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

async function getData(ownerVar, nameVar){
    await fetch(cors + `https://github.com/${ownerVar}/${nameVar}`).then(res => { // Not using github API
    // The API call was successful!
    return res.text();
}).then(function (html) {
    // Convert the HTML string into a document object
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    if(doc.querySelectorAll("span[itemprop='about']")[0] == undefined){
        document.getElementById("content").innerHTML = "404: Not Found"
        return
    }
    // Get the data
    let tempName = {
        "description": doc.querySelectorAll("span[itemprop='about']")[0].innerText
    }
    otherResponse.push(tempName)
}).catch(function(error){
    document.body.innerHTML = "An error occured please try again later or check the console for more info.<br>If it fails to load for after trying again later maybe open an issue on github so I can take a look."
    console.log(error)
})
}

$(document).ready(async function () {
    if (document.location.href.includes("?docs=") == false) {
        window.location.replace(`${site_url}`); // Load /docs = redirect to main page
    } else if(document.location.href == `${site_url}/docs/index.html?docs=${repo_name}` || document.location.href == "http://localhost/futurelucas4502.github.io/docs/testindex.html?docs=futurelucas4502.github.io") {
        document.getElementById("content").innerHTML = `<h4 style="margin:20px 0px" class="text-muted" id="loading"><span class="spinner-border m-1"
              style="width: 1.25rem;height: 1.25rem;border-width: .2rem;" role="status"
              aria-hidden="true"></span>Loading...</h4>`
        await getData(owner, repo_name)
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = `https://github.com/${owner}.png`;
        document.getElementsByTagName('head')[0].appendChild(link);
        document.title = `${owner}'s Documentation | ${(repo_name.replace(/_/g, ' ')).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}`
        document.getElementsByClassName("project-name")[0].textContent = "futurelucas4502.github.io - Documentation"
        document.getElementsByClassName("project-tagline")[0].textContent = otherResponse[0]["description"]
        document.getElementById("content").innerHTML = converter.makeHtml(docs);
        $('main').append(`<footer class="main-content site-footer">
        <span class="site-footer-owner"><a href="https://github.com/${owner}/${repo_name}">${repo_name}</a> is maintained and made by <a href="https://github.com/${owner}">${owner}</a>.</span>
        <span class="site-footer-credits">This page was generated by <a href="https://pages.github.com">GitHub Pages</a> and <a href="https://github.com/futurelucas4502">futurelucas4502</a>.</span>
    </footer>`);
    return
    }else{
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
        await getData(owner, name)
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
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = `https://raw.githubusercontent.com/${owner}/${name}/master/docs/favicon.ico`;
    document.getElementsByTagName('head')[0].appendChild(link);
    document.getElementById("content").innerHTML = html
    document.getElementsByClassName("project-name")[0].textContent = document.getElementsByTagName("h1")[1].innerText
    document.getElementsByClassName("project-tagline")[0].textContent = otherResponse[0]["description"]
    document.title = `${owner}'s Documentation | ${nameFormatted}`
    $('main').append(`<footer class="main-content site-footer">
    <span class="site-footer-owner"><a href="https://github.com/${owner}/${name}">${name}</a> is maintained and made by <a href="https://github.com/${owner}">${owner}</a>.</span>
    <span class="site-footer-credits">This page was generated by <a href="https://pages.github.com">GitHub Pages</a> and <a href="https://github.com/futurelucas4502">futurelucas4502</a>.</span>
</footer>`);
}
// End Other Pages Loading