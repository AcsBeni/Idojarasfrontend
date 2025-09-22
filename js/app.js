let main = document.querySelector('main')
let body = document.querySelector('body')
let lighticon = document.querySelector('#lightmode')
let darkicon = document.querySelector('#darkmode')



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