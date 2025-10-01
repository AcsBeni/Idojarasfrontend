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
    let Tempfield = document.querySelector('#maxRange')
    let Mintemp = document.querySelector("#minRange")
    let date = new Date(Datefield)



    if(Datefield =="" || Weatherfield==""){
        Alert("warning","Kérem írja be az adatokat", "Minden adat kitöltése kötelező");
        return;
    }
    if(((date.getMonth() <=9 &&date.getMonth() <=11) && ((Mintemp.value<0 || Tempfield.value<0)|| Weatherfield =="Havazás"))){
        alert("Kicsit fura ez az időjárás őszhöz képest")
    }
    if((date.getMonth() <=12 &&date.getMonth() <=2) && (Mintemp.value>15 || Tempfield.value>15)){
        alert("Kicsit fura ez az időjárás télhez képest")
    }
    if(((date.getMonth() <=3 &&date.getMonth() <=5) && ((Mintemp.value<10 || Tempfield.value<10)|| Weatherfield =="Havazás"))){
        alert("Kicsit fura ez az időjárás tavaszhoz képest")
    }
    if(((date.getMonth() <=6 &&date.getMonth() <=8) && ((Mintemp.value<20 || Tempfield.value<20)|| Weatherfield =="Havazás"))){
        alert("Kicsit fura ez az időjárás nyárhoz képest")
    }
    console.log(selecteddate)
    if(selecteddate != Datefield){
        let idx = weathers.findIndex(weather => weather.date === Datefield && weather.userid === loggeduser.id);
        if(idx != -1){
            Alert("Warning","Próbálja meg", "Az adott napra már van adat!");
            if(confirm("Szeretné módosítani a meglévő adatot?")){
                try {
                    let res = await fetch(`${Server}/weather/${weathers[idx].id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            date: Datefield,
                            weather: Weatherfield,
                            mintemp: Mintemp.value,
                            temp: Tempfield.value,
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
                        mintemp: Mintemp.value,
                        temp: Tempfield.value,
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
                    mintemp: Mintemp.value,
                    temp: Tempfield.value,
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
    let Tempfield = document.querySelector('#maxRange')
    let Mintemp = document.querySelector("#minRange")
    let Weatherfield = document.querySelector('#Weatherfield').value
    let date = new Date(Datefield)

    if(Datefield ==""|| Weatherfield==""){
        Alert("warning", "Kérem töltse ki a mezőket", "Az összes mező kitöltése nélkül nem mehetünk tovább!")
        return;
    }
    if(((date.getMonth() <=9 &&date.getMonth() <=11) && ((Mintemp.value<0 || Tempfield.value<0)|| Weatherfield =="Havazás"))){
        alert("Kicsit fura ez az időjárás őszhöz képest")
    }
    if((date.getMonth() <=12 &&date.getMonth() <=2) && (Mintemp.value>15 || Tempfield.value>15)){
        alert("Kicsit fura ez az időjárás télhez képest")
    }
    if(((date.getMonth() <=3 &&date.getMonth() <=5) && ((Mintemp.value<10 || Tempfield.value<10)|| Weatherfield =="Havazás"))){
        alert("Kicsit fura ez az időjárás tavaszhoz képest")
    }
    if(((date.getMonth() <=6 &&date.getMonth() <=8) && ((Mintemp.value<20 || Tempfield.value<20)|| Weatherfield =="Havazás"))){
        alert("Kicsit fura ez az időjárás nyárhoz képest")
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
                    mintemp: Mintemp.value,
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
                console.log(res.status)
                console.log(loggeduser.id)
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
                    mintemp:Mintemp.value,
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
        let td6 = document.createElement("td")
        let editBtn = document.createElement("button");
        let delBtn = document.createElement("button");

        editBtn.classList.add("btn", "btn-sm", "btn-warning", "me-2", "buttonscale");
        editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
        delBtn.classList.add("btn", "btn-sm", "btn-danger","buttonscale");
        delBtn.innerHTML = '<i class="bi bi-trash"></i>';   
        delBtn.addEventListener("click", async () => {
            if(confirm("Biztosan törli az adatot?")){
               Deletebutton(weather.id); 
            }
        });
    
        editBtn.addEventListener("click", () => {
            document.querySelector("#Datefield").value = weather.date;
            document.querySelector("#Weatherfield").value = weather.weather;
            document.querySelector('#maxRange').value = Number(weather.temp);
            document.querySelector("#minRange").value = Number(weather.mintemp)
            selectedindex = weather.id;
            selecteddate = weather.date;
            updateevent();
        });
                
        td1.innerHTML = (index+1) + '.';
        td2.innerHTML = weather.date;
        td3.innerHTML = weather.mintemp;
        td4.innerHTML = weather.temp;
        td5.innerHTML = weather.weather;
        td6.appendChild(editBtn);
        td6.appendChild(delBtn);

        td3.classList.add("text-end");
        td4.classList.add("text-end");
        td5.classList.add("text-end");
        td6.classList.add("text-end");

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6)
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
            await Deletebutton(selectedindex); 
            selectedindex = -1;
            document.querySelector("#Datefield").value = "";
            document.querySelector('#maxRange').value = 20;
            document.querySelector("#minRange").value = 0;
            updateTrack()
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
    updateTrack()
}
function cancel(){
    document.querySelector("#Addbtn").classList.remove("hide");
    document.querySelector('#Updatebtn').classList.add("hide");
    document.querySelector('#Delbtn').classList.add("hide");
    document.querySelector('#Cancelbtn').classList.add("hide");
    document.querySelector("#Datefield").value = "";
    document.querySelector('#maxRange').value = 20;
    document.querySelector("#minRange").value = 0;
    selectedindex = -1;
    selecteddate = [];
    updateTrack()
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
    updateTrack()
}
