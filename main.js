// Start Bullits

let section = document.querySelectorAll("section");
let nav_bullit = document.createElement("div");
nav_bullit.className = "nav-bullit";

for (let i = 0; i < section.length; i++) {
    // build bullit
    let bullit = document.createElement("div");
    bullit.classList.add("bullit");
    bullit.setAttribute("data-section",`.${section[i].className}`);
    nav_bullit.append(bullit);

    let tooltip = document.createElement("div");
    let tooltipText = document.createTextNode(section[i].getAttribute("data-name"));
    tooltip.className = "tooltip";
    tooltip.append(tooltipText);
    bullit.append(tooltip);
    document.body.prepend(nav_bullit);
}

let AllBullit = document.querySelectorAll(".bullit");
scrillToSection(AllBullit);

// Show Bullits with local storage

let show_bullit = document.querySelectorAll(".show-bullit span");

if (window.localStorage.getItem("show-bullits")) {
    // remove class active
    show_bullit.forEach((span) => {
        span.classList.remove("active");
    })
    // check if local storage has data and add class active
    if (window.localStorage.getItem("show-bullits") === "true") {
        nav_bullit.style.display = "block";
        document.querySelector(".show-bullit .yes").classList.add("active");
    } else {
        nav_bullit.style.display = "none";
        document.querySelector('.show-bullit .no').classList.add("active");
    }
}

show_bullit.forEach((span) => {
    span.addEventListener("click", function(e) {
        // add class active and remove class active
        show_bullit.forEach((span) => {
            span.classList.remove("active");
        })
        span.classList.add("active");

        // show bulit and hidd it
        if (e.target.dataset.show === "true") {
            nav_bullit.style.display = "block";
            window.localStorage.setItem("show-bullits", "true")
        } else {
            nav_bullit.style.display = "none";
            window.localStorage.setItem("show-bullits", "false")
        }
    })
})
// End Bullits

// start setting box
let setting = document.querySelector(".setting");
let toggelButton = document.querySelector(".toggel-btn");
let btn_setting = document.querySelector(".btn-setting");
let colors = document.querySelectorAll(".colors li");

// open and close settings box
toggelButton.addEventListener("click", function() {
    setting.classList.toggle("open");
    btn_setting.classList.toggle("fa-spin");
});

document.addEventListener("click", function(e) {
    if (e.target !== setting && e.target !== toggelButton && e.target !== btn_setting) {
        setting.classList.remove("open");
        btn_setting.classList.remove("fa-spin");
    }
})

// to cheack the color in local storage
if (window.localStorage.getItem("color")) {
    document.documentElement.style.setProperty("--main-color", window.localStorage.getItem("color"));
    // Or // document.styleSheets[0].rules[1].style.setProperty("--main-color", window.localStorage.getItem("color"));
    colors.forEach((ele) => {
        ele.classList.remove("active");
        if (ele.dataset.color === window.localStorage.getItem("color")) {
            ele.classList.add("active");
        }
        // Or // document.querySelector(`[data-color = "${window.localStorage.getItem("color")}"]`).classList.add("active");
    });
}

// to choose color and set to local storage
colors.forEach((ele) => {
    ele.addEventListener("click", function(e) {
        colors.forEach((ele) => {
            ele.classList.remove("active");
        });
        ele.classList.add("active");
        window.localStorage.setItem("color", ele.getAttribute("data-color"));
        document.documentElement.style.setProperty("--main-color", window.localStorage.getItem("color"));
        // OR // document.styleSheets[0].rules[1].style.setProperty("--main-color", window.localStorage.getItem("color"));
    })
});

//// to run background and stop it  ////
let ran_bg = document.querySelectorAll(".ran-bg span");
let backgroundObtion = true;
let randomInterval;

// to check if local storage Contains key random-background
// and remove or add class active and stop and run background random
if (window.localStorage.getItem("random-background")) {
    ran_bg.forEach((ele) => {
        ele.classList.remove("active");
        if (ele.getAttribute("data-background") === window.localStorage.getItem("random-background")) {
            ele.classList.add("active");
        }
    });
    if (window.localStorage.getItem("random-background") === "yes") {
        backgroundObtion = true;
    } else {
        backgroundObtion = false;
    }
}

// on click at random button and add or remove class active 
// and check if ele has attrebute = yes 
// and turn on and off background random
ran_bg.forEach((ele) => {
    ele.addEventListener("click", function() {
        ran_bg.forEach((ele) => {
            ele.classList.remove("active")
        });
        ele.classList.add("active");
        
        if (ele.dataset.background === "yes") {
            backgroundObtion = true;
            randomBackground();
            window.localStorage.setItem("random-background", ele.getAttribute("data-background"));
        } else {
            backgroundObtion = false;
            clearInterval(randomInterval);
            window.localStorage.setItem("random-background", ele.getAttribute("data-background"));
        }
    });
})

document.querySelector(".reset_option").addEventListener("click", function() {
    // window.localStorage.clear();
    // Or 
    // تستخدم في حال لدينا بيانات في اللوكل لا نريد ان تحذف
    window.localStorage.removeItem("color");
    window.localStorage.removeItem("random-background");
    window.localStorage.removeItem("show-bullits");
    window.location.reload();
})

// End setting box

// Start header
let bar = document.querySelector(".bars");
let ul = document.querySelector("nav ul");
let linksHead = document.querySelectorAll("ul li a");

// to open and close nav bar
bar.addEventListener("click", function() {
    bar.classList.toggle("fa-xmark");
    ul.classList.toggle("show");
});

document.onclick = function(e) {
    if (e.target !== bar && e.target !== ul) {
        bar.classList.remove("fa-xmark");
        ul.classList.remove("show");
    }
}
// click to links nav and colse nav bar
linksHead.forEach((ele) => {
    ele.addEventListener("click", function() {
        ul.classList.remove("show");
        linksHead.forEach((ele) => {
            ele.classList.remove("active");
        })
        ele.classList.add("active");
    });
})
scrillToSection(linksHead);
// End header

// End Function to bullits and header Links
function scrillToSection(elements) {
    elements.forEach((ele) => {
        ele.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        })
    })
}
// Start Function to bullits and header Links

//to change background with randoming
// Start landign change background
let landingImgArr = ["landing0.jpg", "landing1.jpg", "landing2.jpg", "landing3.jpg", "landing4.jpg"];
let landing = document.querySelector(".landing");

// // change bg with click for Me(Ali);
// let leftChange = document.querySelector(".change-bg.left");
// let rightChange = document.querySelector(".change-bg.right");
// let bulits = document.querySelectorAll(".bulits span");
// let count = 0;
// leftChange.addEventListener("click", function() {
//     if (count > 0) {
//         i = --count;
//         landing.style.backgroundImage = `url("../images/landing${i}.jpg")`;
//         // change bulits color
//         bulits.forEach((ele) => {
//             ele.classList.remove("active");
//             bulits[i].classList.add("active");
//         });
//     }
// })
// rightChange.addEventListener("click", function() {
//     if (count < 4) {
//         i = ++count;
//         landing.style.backgroundImage = `url("../images/landing${i}.jpg")`;
//         // change color bulits
//         bulits.forEach((ele) => {
//             ele.classList.remove("active");
//             bulits[i].classList.add("active");
//         })
//     }
// });


function randomBackground() {
    // funtion to change background and set number of random to local storage
    if (backgroundObtion === true) {
        randomInterval = setInterval(function() {
            let randomNumber = Math.trunc(Math.random() * landingImgArr.length);
            window.localStorage.setItem("number-random", randomNumber);
            landing.style.backgroundImage = `url(../images/${landingImgArr[randomNumber]})`;
        }, 10000);
    }
}
randomBackground();
// check for local storage if contain key number random and 
// change background landing to the number of ran
if (window.localStorage.getItem("number-random")) {
    landing.style.backgroundImage = `url(../images/landing${window.localStorage.getItem("number-random")}.jpg)`;
}
// End landign change bg

// Start skills
let our_skills = document.querySelector(".skills");
let skills_projerss = document.querySelectorAll(".content-box div span");

window.addEventListener("scroll", function() {
    // 1 - محتاج ارجع الاوف سيت توب مال السكشن الخاص بال سكلز هذا 
    // وهو الجزء الذي فوق السكشن سكلز
    // skills offset top
    let skillsOffsetTop = our_skills.offsetTop;

    // 2 - محتاج ارجع الاوتر هايت 
    // هو عباره عن الهايت مال السكلز
    // skills outer height
    let outer_height = our_skills.offsetHeight;
    
    // 3 - محتا ارجع الويندو هايت نفسها
    // window height
    let window_height = this.innerHeight;

    // 4 - اخر حاجه محتاج ارجعها هي السكرول توب مال الويندو
    // هذا الجزء الذي اعمل به سكرول
    let window_scroll_top = window.scrollY;

    skills_projerss.forEach((span) => {
        if (window_scroll_top > (skillsOffsetTop + outer_height - window_height)) {
            span.style.width = span.dataset.width;
        } else {
            span.style.width = "0%";
        }
    })
})
// End skills

// Start Our Gallery
// let gallery = document.querySelector(".gallery");
let images_gallery = document.querySelectorAll(".gallery-box .card img");

images_gallery.forEach((img) => {
    img.addEventListener("click", function() {
        let overlay = document.createElement("div");
        overlay.classList.add("overlay");
        document.body.appendChild(overlay);

        let popup = document.createElement("div");
        popup.classList.add("popup");

        let popupImage = document.createElement("img");
        popupImage.src = img.src;

        popup.appendChild(popupImage);
        document.body.append(popup);

        if (img.alt !== "") {
            let img_heading = document.createElement("h1");
            let img_text = document.createTextNode(img.alt);
            img_heading.appendChild(img_text);
            popup.prepend(img_heading);
        }

        let close_Button = document.createElement("span");
        close_Button.classList.add("close-button");
        close_Button.classList.add("fa-solid");
        close_Button.classList.add("fa-xmark");
        
        popup.append(close_Button);
    })
})

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("close-button")) {
        document.querySelector(".popup").remove();
        document.querySelector(".overlay").remove()
    }
})
// End Our Gallery

// Start Contact
// Not Found Now
// End Contact
