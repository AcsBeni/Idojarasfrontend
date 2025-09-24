let main = document.querySelector('main')
let body = document.querySelector('body')
let lighticon = document.querySelector('#lightmode')
let darkicon = document.querySelector('#darkmode')
let alertpop = document.querySelector("#alertpopup")
let alerttitle = document.querySelector("#alerttitle")
let alertmsg = document.querySelector("#alertmessage")
let loggedinmenu = document.querySelector(".loggedinnav")
let loggedoutmenu = document.querySelector(".loggedoutnav")

const Appcím = "Időjárásmutató"
const Server = "http://localhost:3000"
const Készítő = "Ács Benjámin"

let loggeduser =null;


darkicon.addEventListener("click",()=>{
    savetheme("dark")
    switchtheme("dark")
})
lighticon.addEventListener("click",()=>{
    savetheme("light")
    switchtheme("light")
})

async function render(view) {
    
    main.innerHTML = await(await fetch(`view/${view}.html`)).text();
    switch(view){
        case("calendar"):
            await GetCalendardate();
            initCalendar();
            break;
        case("profile"):
            getProfile()
            break;
        case("weather"):
            setDate();
            await Sortbydates();
            Renderweather();
            break;
        case("chart"):
            await getchartdata()
            initChart()
            break;
        
    }
} 
function Loadtheme(){
    theme="dark"
    if(localStorage.getItem('SCtheme')){
        theme = localStorage.getItem('SCtheme')
    }
    switchtheme(theme)
}
function savetheme(theme){
    localStorage.setItem('SCtheme', theme)
}
function switchtheme(theme){
    
    document.documentElement.setAttribute('data-bs-theme', theme);
    switch(theme){
        case "light":
            lighticon.classList.add("hide");
            darkicon.classList.remove("hide");
            break;
        case "dark":
            lighticon.classList.remove("hide");
            darkicon.classList.add("hide");
            break;
    }
};
function Alert(type,title, msg){
    alertpop.classList.remove("alert-danger","alert-warning","alert-success");
    alertpop.classList.remove("hide")
    alertpop.classList.add(`alert-${type}`)
    alertmsg.innerHTML = msg
    alerttitle.innerHTML = title
    setTimeout(() => {
        alertpop.classList.add("fade-out");
        setTimeout(() => {
            alertpop.classList.add("hide");
        }, 1000);
    }, 3000);
}
async function getloggeduser() {
    if(sessionStorage.getItem("loggeduser")){
        loggeduser = JSON.parse(sessionStorage.getItem("loggeduser"))
        loggedinmenu.classList.remove("hide")
        loggedoutmenu.classList.add("hide")
        await render("calendar")
    }
    else{
        loggeduser =null;
        loggedinmenu.classList.add("hide")
        loggedoutmenu.classList.remove("hide")
        await render("login")
    }
}
Loadtheme();
getloggeduser();
