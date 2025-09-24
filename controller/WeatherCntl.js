let weathers =[];
let selectedindex =-1;
let selecteddate = []

function setDate(){
    let today = new Date().toISOString().split('T')[0];
    let Datafield = document.querySelector('#Datefield')

    Datafield.setAttribute("min", today)
    Datafield.value = today
}
//időjárás összes adat frissítése
async function Weatherupdate(){
    let Datefield = document.querySelector("#Datefield").value;
    let Weatherfield = document.querySelector("#Weatherfield").value;
    let Tempfield = document.querySelector("#Tempsfield").value;

    if(Datefield =="" || Weatherfield=="" || Tempfield==""){
        Alert("warning","Kérem írja be az adatokat", "Minden adat kitöltése kötelező");
        return;
    }
    console.log(selecteddate)
    if(selecteddate != Datefield){
        let idx = weathers.findIndex(weather => weather.date === Datefield && weather.userid === loggeduser.id);
        if(idx != -1){
            Alert("danger","Hiba", "Az adott napra már van lépés adat!");
            if(confirm("Szeretné módosítani a meglévő adatot?")){
                document.querySelector("#Datefield").value = weathers[idx].date;
                document.querySelector("#Tempsfield").value = weathers[idx].temp;
                document.querySelector("#Weatherfield").value = weathers[idx].weather;
                selectedindex = weathers[idx].id;
                selecteddate = weathers[idx].date;
                updateevent();
            }
        }
        else{
            try {
                let res = await fetch(`${Server}/weather/${selectedindex}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        date: Datefield,
                        weather: Weatherfield,
                        temp: Tempfield,
                        userid: loggeduser.id
                    })
                });
                Alert("success","Sikeres adatmentés", "Sikeresen megváltozott az adott napra az időjárás");
                await Sortbydates();
                Renderweather();
            }
            catch (error) {
                Alert("danger","Hiba",error);
            }
        }
    }
    //ha nem ugyanaz a dátum akkor is változtasson
    else{
        try {
            let res = await fetch(`${Server}/weather/${selectedindex}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date: Datefield,
                    weather: Weatherfield,
                    temp: Tempfield,
                    userid: loggeduser.id
                })
            });
            Alert("success","Sikeres adatmentés", "Sikeresen megváltozott az adott napra az időjárás");
            await Sortbydates();
            Renderweather();
        }
        catch (error) {
            Alert("danger","Hiba",error);
        }
    }
}
async function Weatheradd() {
    let Datefield = document.querySelector('#Datefield').value
    let Tempfield = document.querySelector('#Tempsfield')
    let Weatherfield = document.querySelector('#Weatherfield').value

    if(Datefield ==""|| Tempfield.value==""|| Weatherfield==""){
        Alert("warning", "Kérem töltse ki a mezőket", "Az összes mező kitöltése nélkül nem mehetünk tovább!")
        return;
    }
    //Adat frissítése, ha ugyanaz a dátum
    let idx= weathers.findIndex(weather => weather.date === Datefield && weather.userid === loggeduser.id)
    console.log(idx)
    if(idx== -1){
        try{
            let res= await fetch(`${Server}/weather`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: Datefield,
                    temp: Tempfield.value,
                    weather: Weatherfield,
                    userid: loggeduser.id
                })
            })
            let data = await res.json();
            if(res.status===200){
                Alert("success","Siker!","Sikeresen jegyzetelted az időjárást" )
                await Sortbydates();
                Renderweather();
            }
            else{
                Alert("danger", "Hiba", "Az időjárást nem sikerült jegyzetelni")
            }
        }
        catch(err){
            Alert("danger", "Hiba",err)
        }
    }
    //adat frissítése
    else{
        try{
            let res = await fetch(`${Server}/weather/${weathers[idx].id}`,{
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: Datefield,
                    temp: Tempfield.value,
                    weather: Weatherfield,
                    userid: loggeduser.id
                })
            })
            Alert("success","Siker!","Sikeresen módosítottad az időjárást" )
            await Sortbydates();
            Renderweather();
        }
        catch(err){
            Alert("danger", "Hiba",err)
        }
    }
}
//tartalom behelyezése
async function Renderweather(){
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    weathers.forEach((weather, index) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let editBtn = document.createElement("button");
        let delBtn = document.createElement("button");

        editBtn.classList.add("btn", "btn-sm", "btn-warning", "me-2");
        editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
        delBtn.classList.add("btn", "btn-sm", "btn-danger");
        delBtn.innerHTML = '<i class="bi bi-trash"></i>';   
        delBtn.addEventListener("click", async () => {
            if(confirm("Biztosan törli az adatot?")){
               Deletebutton(weather.id); 
            }
        });
        editBtn.addEventListener("click", () => {
            document.querySelector("#Datefield").value = weather.date;
            document.querySelector("#Weatherfield").value = weather.weather;
            document.querySelector('#Tempsfield').value = Number(weather.temp)
            selectedindex = weather.id;
            selecteddate = weather.date;
            updateevent();
        });
                
        td1.innerHTML = (index+1) + '.';
        td2.innerHTML = weather.date;
        td3.innerHTML = weather.temp;
        td4.innerHTML = weather.weather;
        td5.appendChild(editBtn);
        td5.appendChild(delBtn);

        td3.classList.add("text-end");
        td4.classList.add("text-end");
        td5.classList.add("text-end");

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
    });
}
async function Sortbydates() {
    try{
        let res = await fetch(`${Server}/weather/user/${loggeduser.id}`)
        weathers = await res.json() 
        weathers = weathers.sort((a,b)=> new Date(b.date)- new Date(a.date))
    }
    catch(err){
        Alert( "danger","Hiba történt!",err );
        return;
    }
}
async function Weatherdelete(){
   
    if(selectedindex != -1){
        if(confirm("Biztosan törli az adatot?")){
            Deletebutton(selectedindex); 
            selectedindex = -1;
            document.querySelector("#Datefield").value = "";
            document.querySelector("#Tempsfield").value = "";
            cancel();
        }
    }
    else{
        Alert("warning","Nincs kijelölve adat!", "Kérem jelöljön ki egy adatot a folytasáshoz");
    }
    

}
function updateevent(){
    document.querySelector("#Addbtn").classList.add("hide");
    document.querySelector('#Updatebtn').classList.remove("hide");
    document.querySelector('#Delbtn').classList.remove("hide");
    document.querySelector('#Cancelbtn').classList.remove("hide");
}
function cancel(){
    document.querySelector("#Addbtn").classList.remove("hide");
    document.querySelector('#Updatebtn').classList.add("hide");
    document.querySelector('#Delbtn').classList.add("hide");
    document.querySelector('#Cancelbtn').classList.add("hide");
    document.querySelector("#Datefield").value = "";
    document.querySelector("#Tempsfield").value = 0;
    selectedindex = -1;
    selecteddate = [];
}
async function Deletebutton(id){
    fetch(`${Server}/weather/${id}`, {
        method: "DELETE"
    }).then(res => {
        if (res.ok) {
            Alert("success","Sikeres törlés!", "Az időpont és az időjárás törölve lett");
            Sortbydates().then(() => Renderweather());
        } else {
            Alert("danger","Hiba", res.msg);
        }
    });
}