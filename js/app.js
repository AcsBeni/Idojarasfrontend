let main = document.querySelector('main')
let body = document.querySelector('body')
let lighticon = document.querySelector('#lightmode')
let darkicon = document.querySelector('#darkmode')
let alertpop = document.querySelector("#alertpopup")
let alerttitle = document.querySelector("#alerttitle")
let alertmsg = document.querySelector("#alertmessage")

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
    }
    
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

    alertpop.classList.remove("hide")
    alertpop.classList.add(`Alert-${type}`)
    alertmsg.innerHTML = msg
    alerttitle.innerHTML = title
    setTimeout(500,()=>{
        alertpop.classList.add("hide")
    })
    alertpop.classList.remove(`Alert-${type}`)
}