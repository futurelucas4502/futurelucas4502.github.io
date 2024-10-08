import { site_url, owner, cors, fixedName1, fixedName2, fixedName1FA, fixedName2FA, full_name, repo_name } from "./setup.js"

// Installable popups start

window.addEventListener("beforeinstallprompt", event => {
  if (!event) {
    return
  }
})

/* Only register a service worker if it's supported */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
}

// Installable popups end

// Start Navigation
let mobilehref
let first = true
let converter = new showdown.Converter()
let closeNavMobile = window.matchMedia("(max-width: 991px)")
closeNavMobile.addListener(closeNavMobileFunc) // Attach listener function on state changes

function closeNavMobileFunc() {
  $('.navbar-collapse').collapse('hide')
}

function init(href) { // Initial animation of hori-selector
  if (href != undefined) {
    $('#navbarSupportedContent ul li').removeClass("active")
    if ($('#navbarSupportedContent ul li a[href="' + decodeURI(href) + '"]').parent()[0].id == "navDropdownInner") {
      $('#navbarSupportedContent ul li a[href="' + decodeURI(href) + '"]').parent().parent().addClass("active")
    } else {
      $('#navbarSupportedContent ul li a[href="' + decodeURI(href) + '"]').parent().addClass("active")
    }
  }
  if (mobilehref != undefined) {
    $('#navbarSupportedContent ul li').removeClass("active")
    if ($('#navbarSupportedContent ul li a[href="' + decodeURI(mobilehref) + '"]').parent()[0].id == "navDropdownInner") {
      $('#navbarSupportedContent ul li a[href="' + decodeURI(mobilehref) + '"]').parent().parent().addClass("active")
    } else {
      $('#navbarSupportedContent ul li a[href="' + decodeURI(mobilehref) + '"]').parent().addClass("active")
    }
    mobilehref = undefined
  }
  let tabsNewAnim = $('#navbarSupportedContent')
  let activeItemNewAnim = tabsNewAnim.find('.active')
  let activeWidthNewAnimHeight = activeItemNewAnim.innerHeight()
  let activeWidthNewAnimWidth = activeItemNewAnim.innerWidth()
  let itemPosNewAnimTop = activeItemNewAnim.position()
  let itemPosNewAnimLeft = activeItemNewAnim.position()
  if (closeNavMobile.matches) { // Mobile view
    $(".hori-selector").css({
      "top": itemPosNewAnimTop.top + "px",
      "left": itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": (activeWidthNewAnimWidth - 10) + "px"
    })
  } else { // Desktop view
    $(".hori-selector").css({
      "top": itemPosNewAnimTop.top + "px",
      "left": itemPosNewAnimLeft.left + "px",
      "height": (activeWidthNewAnimHeight - 10) + "px",
      "width": activeWidthNewAnimWidth + "px"
    })
  }
  setTimeout(function () { navRightCut() }, 275)
}

$(window).on('resize', function () {
  setTimeout(function () { init() }, 500) // Runs init when page resized to ensure its in the correct place
})
$(".navbar-toggler").click(function () {
  setTimeout(function () { init() }, 200)
})

$(function () {
  if (Modernizr.history) { // Check if history pushing is enabled in this browser its 2020 so this probably isnt nessecary but just in case
    $("nav").on("click", "a", function (e) { // The code that executes when link pressed
      e.preventDefault() // Cancel redirection to prevent page loading like normal
      if (getComputedStyle(document.getElementById("toggler"), null).display != "none" && this.id != "navbarDropdown") {
        $('.navbar-collapse').collapse('hide') // Closes nav toggler when a link is pressed in mobile view
      }
      if ($(this).attr("href") == undefined || $(this).attr("href") == null || $(this).attr("href") == "") return
      try {
        let _link = ($(this).attr("href")).trim()
        history.pushState(null, null, _link) // Add link to browser history
        loadContent(_link) // Run custom load instead of redirect
      } catch (e) {
        console.log(e)
      }
    })

    $(document).on("click", ".viewBtn", function (e) { // The code that executes when link pressed
      e.preventDefault() // Cancel redirection to prevent page loading like normal
      if (getComputedStyle(document.getElementById("toggler"), null).display != "none" && this.id != "navbarDropdown") {
        $('.navbar-collapse').collapse('hide') // Closes nav toggler when a link is pressed in mobile view
      }
      try {
        let _link = ($(this).attr("href")).trim()
        history.pushState(null, null, _link) // Add link to browser history
        loadContent(_link) // Run custom load instead of redirect
      } catch (e) {
        console.log(e)
      }
    })

    function loadContent(href) {
      if (href == "index.html") {
        indexReady()
      } else {
        otherReady(href.split("=")[1])
      }
      if (getComputedStyle(document.getElementById("toggler"), null).display == "none") {
        setTimeout(function () { init(href) }, 600) // Set timeout instead of loading immediatly to allow for DOM delays e.g. loading of scroll bar
      } else {
        mobilehref = href
      }
    }

    $(window).bind('popstate', function () { // Run on forward or back pressed
      let _link = location.pathname.replace(/^.*[\\\/]/, '') // Get filename only of the history link
      if (location.href.split("?")[1] != undefined) _link += ("?" + location.href.split("?")[1]) // Adds the page request e.g. adds on ?page=management_console
      if (_link == "" || _link == "index") {
        _link = "index.html" // Adds support for going back to just site_URL
      }
      if (!(getComputedStyle(document.getElementById("toggler"), null).display == "none")) {
        $('.navbar-collapse').collapse('hide') // Closes nav toggler before loading past or future content
      }
      loadContent(_link) // Runs the load content function using the history href/_link
    })

  } // else {History is not supported, so nothing fancy here.}
})
$(document).ready(function () { // Closes nav toggler if opened on mobile and you dont press on it
  $(document).click(function (event) {
    let clickover = $(event.target)
    let _opened = !$(".navbar-toggler").hasClass("collapsed")
    if (_opened === true && !clickover.parent().hasClass("navbar-toggler")) {
      document.getElementById("toggler").click()
    }
  })
})

function navRightCut() {
  if ($('#navbarSupportedContent').find('.active')[0].children[0].id == "navbarDropdown") {
    document.getElementById("right").style.display = "none"
  } else {
    document.getElementById("right").style.display = "block"
  }
}

// End Navigation



// Start Basic Page Setup
let indexResponse = new Array()
$(document).ready(async function () {
  let link = document.querySelector("link[rel*='icon']") || document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'shortcut icon'
  link.href = `https://github.com/${owner}.png`
  document.getElementsByTagName('head')[0].appendChild(link)
  document.getElementById("embelem").src = `https://github.com/${owner}.png`
  document.getElementById("owner").innerHTML = `${owner.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}'s Work`
  document.getElementById("owner").setAttribute('title', `${owner.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}'s Work`)
  let fixedName1Var = fixedName1.replace(/_|-/g, ' ')
  fixedName1Var = fixedName1Var.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
  let fixedName2Var = fixedName2.replace(/_|-/g, ' ')
  fixedName2Var = fixedName2Var.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())


  // Quick and dirty way to calculate number of pages without using github API
  let countingRepos = true
  let page = 1

  while (countingRepos) {
    // fetch the github repo page using the cors bypass then convert to text aka a usable string to be able to then parse it into the DOM
    await fetch(cors + `https://github.com/${owner}?tab=repositories&page=${page}`).then(res => {
      // The API call was successful!
      if (res.status == 404) {
        document.getElementById("err").style.display = "block"
        document.getElementById("err-home").href = site_url
        $(".loader").fadeOut("slow")
        return
      }
      return res.text()
    }).then(function (repoPage) {
      // Convert the HTML string into a document object
      let parser = new DOMParser()
      let doc = parser.parseFromString(repoPage, 'text/html')
      // Check if there is a next page button
      if (doc.querySelector("a.next_page") != null) { // If there is a next page then increase the total page count
        page++
      }
      else {
        // if not a next page then set to false to finish the while loop
        countingRepos = false
      }
      // Process the data and add it to indexResponse to create the repo cards
      for (let j = 0; j < doc.querySelectorAll("a[itemprop='name codeRepository']").length; j++) {
        let tempName = {
          "name": doc.querySelectorAll("a[itemprop='name codeRepository']")[j].innerText.replace(/\s+/g, ''),
          "description": doc.querySelectorAll("li[itemprop='owns']")[j].querySelector("p[itemprop='description']") ? doc.querySelectorAll("li[itemprop='owns']")[j].querySelector("p[itemprop='description']").innerText : "No Description",
          "html_url": `https://github.com/${owner}/${(doc.querySelectorAll("a[itemprop='name codeRepository']")[j].innerText).replace(/\s+/g, '')}`
        }
        indexResponse.push(tempName)
      }
    }).catch(function (error) {
      document.body.innerHTML = "An error occured please check your internet connection and try again.<br><br>If it fails to load for after trying a few times with an internet connection the API may be down sorry for any inconvenience.<br><br><br>If the site hasnt started working again within an hour add a new issue <a href='https://github.com/futurelucas4502/futurelucas4502.github.io/issues'>here</a>"
      console.log(error)
      countingRepos = false
    })// TODO: add catch block
  }


  if (document.location.href == `${site_url}/index.html` || document.location.href == `${site_url}/index` || document.location.href == `${site_url}/` || document.location.href == "http://localhost/futurelucas4502.github.io/index.html" || document.location.href == "http://localhost/futurelucas4502.github.io/index" || document.location.href == "http://localhost/futurelucas4502.github.io/") {
    indexReady()
  } else {
    otherReady(location.href.split("=")[1])
  }
  for (let i = 0; i < indexResponse.length; i++) { // Add links to dropdown
    let name = indexResponse[i]["name"].replace(/_|-/g, ' ')
    name = name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
    if (name == fixedName1Var) {
      document.getElementById("fixedName1").innerHTML = `<i class="far ${fixedName1FA}"></i>${fixedName1Var}`
      document.getElementById("fixedName1").href = `index.html?page=${indexResponse[i]["name"]}`
    } else if (name == fixedName2Var) {
      document.getElementById("fixedName2").innerHTML = `<i class="far ${fixedName2FA}"></i>${fixedName2Var}`
      document.getElementById("fixedName2").href = `index.html?page=${indexResponse[i]["name"]}`
    } else {
      document.getElementById("navDropdownInner").innerHTML += `<a href="index.html?page=${indexResponse[i]["name"]}" class="dropdown-item">${name}</a>`
    }
  }
  if (location.href.split("?")[1] != undefined) {
    $('#navbarSupportedContent ul li').removeClass("active")
    if ($('#navbarSupportedContent ul li a[href="' + decodeURI("index.html?" + location.href.split("?")[1]) + '"]').parent()[0].id == "navDropdownInner") {
      $('#navbarSupportedContent ul li a[href="' + decodeURI("index.html?" + location.href.split("?")[1]) + '"]').parent().parent().addClass("active")
    } else {
      $('#navbarSupportedContent ul li a[href="' + decodeURI("index.html?" + location.href.split("?")[1]) + '"]').parent().addClass("active")
    }
  }
  firstLoad()
})

function firstLoad() {
  if (first) {
    // Animate loader off screen
    document.getElementsByTagName("page")[0].style.display = "block"
    setTimeout(function () { init() }, 1000)
    setTimeout(function () { $(".loader").fadeOut("slow") }, 400)
    first = false
  }
}


async function indexReady() {
  document.title = `${owner}'s Work`
  document.getElementById("main-content").innerHTML = `<div style="margin:20px 0px" class="text-center">
  <h1>Welcome to my work and personal projects!</h1>
  <h6 class="text-muted">Only my Open-Source work and projects are shown as some work needs to be kept
      Closed-Source.</h6>
  <div class="container">
      <div id="content">
        <div class="row" id="cards"></div>
      </div>
  </div>
  <h6 style="margin:20px 0px" class="text-muted">Disclaimer: All work shown here is owned or maintained by ${full_name} (<a href="https://github.com/${owner}">${owner}</a>)</h6>
</div>`
  for (let i = 0; i < indexResponse.length; i++) {
    let name = indexResponse[i]["name"].replace(/_|-/g, ' ')
    name = name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
    document.getElementById("cards").innerHTML += `
    <div class="col-sm d-flex justify-content-center">
      <div class="card" style="width: 18rem;margin-top:20px">
        <img style="height:180px" id="${indexResponse[i]["name"]}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text card-text-bottom-fix">${indexResponse[i]["description"] ? indexResponse[i]["description"] : "No Description"}</p>
          <div class="vertical card-button-bottom-fix">
            <a style="display: block!important;" href="index.html?page=${indexResponse[i]["name"]}" class="viewBtn btn btn-primary">View</a>
            <a style="display: block!important;" href="${indexResponse[i]["html_url"]}" class="btn btn-dark"><i class="fab fa-github"></i> View on GitHub</a>
            <a style="display: block!important;" href="${site_url}/docs/index.html?docs=${indexResponse[i]["name"]}" class="btn btn-primary">View Documentation</a>
          </div>
        </div>
      </div>
    </div>
    `
    document.getElementById(indexResponse[i]["name"]).style.backgroundImage = `url(https://raw.githubusercontent.com/${owner}/${indexResponse[i]['name']}/master/assets/screenshot.png),url(./assets/images/404.png)`
  }
  firstLoad()
}
// End Basic Page Setup

// Start Other Pages Loading
let otherResponse = Array()
async function otherReady(name) { // this would be location.href.split("=")[1] so whatever is after equals s some page value?
  document.getElementById("err").style.display = "none"
  if (document.location.href.includes("?page=") == false) {
    window.location.replace(`${site_url}`) // Load something like ? or ?page or ?page= without any values just redirect to index
  }
  document.title = `${owner}'s Work | ${(name.replace(/_|-/g, ' ')).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}`
  let html
  let htmlInner
  let description
  await fetch(`${site_url}/docs/index.html`).then(res => {
  // await fetch(`http://localhost/futurelucas4502.github.io/docs/index.html`).then(res => {
    return res.text()
  }).then(data => {
    html = data
  })

  if (otherResponse[name] == undefined) { // Method where I fetch the file contents of the readme manually
    await fetch(`https://raw.githubusercontent.com/${owner}/${name}/master/README.md`).then(res => {
      if (res.status == 404) {
        document.getElementById("err").style.display = "block"
        document.getElementById("err-home").href = site_url
        $(".loader").fadeOut("slow")
        return
      }
      return res.text()
    }).then(data => {
      otherResponse[name] = data
    }).catch(function (error) {
      document.body.innerHTML = "An error occured please check your internet connection and try again.<br><br>If it fails to load for after trying a few times with an internet connection the API may be down sorry for any inconvenience.<br><br><br>If the site hasnt started working again within an hour add a new issue <a href='https://github.com/futurelucas4502/futurelucas4502.github.io/issues'>here</a>"
      console.log(error)
    })
  }
  htmlInner = converter.makeHtml(otherResponse[name])
  document.getElementById("main-content").innerHTML = html
  let link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `./assets/css/style.css`
  document.getElementById("main-content").appendChild(link)
  document.getElementById("content").innerHTML = htmlInner ? htmlInner : ""
  for (let i = 0; i < indexResponse.length; i++) {
    if (indexResponse[i]["name"] == name) description = indexResponse[i]["description"]
  }
  document.getElementsByClassName("project-name")[0].textContent = (name.replace(/_|-/g, ' ')).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
  document.getElementsByClassName("project-tagline")[0].textContent = description
  $('main').append(`<footer style="padding-left: 0px;display: inline-block;" class="main-content site-footer">
    <span class="site-footer-owner"><a href="https://github.com/${owner}/${name}">${name}</a> is owned or maintained by <a href="https://github.com/${owner}">${owner}</a>.</span>
    <span class="site-footer-credits">This page was generated by <a href="https://pages.github.com">GitHub Pages</a> and <a href="https://github.com/futurelucas4502">futurelucas4502</a>.</span>
  </footer>`)
  document.getElementById("github-view").style.display = "inline-block"
  document.getElementById("download-zip").style.display = "inline-block"
  document.getElementById("download-tar").style.display = "inline-block"
  document.getElementById("github-view").href = `https://github.com/${owner}/${name}`
  document.getElementById("download-zip").href = `https://github.com/${owner}/${name}/zipball/master`
  document.getElementById("download-tar").href = `https://github.com/${owner}/${name}/tarball/master`
  firstLoad()
}
// End Other Pages Loading
