async function Registeruser(){
    let Emailfield = document.querySelector('#Emailfield');
    let Namefield = document.querySelector('#Namefield');
    let Passwordfield = document.querySelector('#Passwordfield');
    let Confpassfield = document.querySelector('#ConfirmPasswordfield');

    if(Emailfield.value ==""|| Namefield.value==""|| Passwordfield.value== ""||Confpassfield.value==""){
        Alert("warning", "Üres mezők", "Kérem töltsön ki minden üres mezőt")
       return;
    }
    if(Passwordfield.value!=Confpassfield.value)
    {
        Alert("warning", "Nem megegyező jelszók", "Kérem legyen ugyanolyan mind a kettő jelszó")
        return;
    }
    try{
        const res= await fetch(`${Server}/users`,{
            method: "Post",
            headers:{
                'Content-type':"application/json"
            },
            body: JSON.stringify(
                {
                    name: Namefield.value,
                    email: Emailfield.value,
                    password: Passwordfield.value
                })
        })
        const data = await res.json();
        if(res.status ===200){
            Alert("success", "Sikeres regisztráció", "Sikeresen létrehozott egy fiókot")
            Emailfield.value =""
            Namefield.value = ""
            Passwordfield.value =""
            Confpassfield.value= ""
            return;
        } 
        Alert("danger","Sikertelen regisztráció",data.msg)
    }
    catch(err){
        Alert("danger","HIBA",err)
    }
}
async function logout() {
    sessionStorage.removeItem("loggeduser");
    await getloggeduser();
}
async function Loginuser(){
    let Emailfield = document.querySelector('#Emailfield');
    let Passwordfield = document.querySelector('#Passwordfield');
    if(Emailfield.value ==""|| Passwordfield.value== ""){
        Alert("warning", "Üres mezők", "Kérem töltsön ki minden üres mezőt")
        return;
    }
    if(Emailfield.value !="ember@gmail.com"|| Passwordfield.value!="123"){
        Alert("warning", "Sikertelen bejelentkezés", "Rossz az Emailfield cím vagy a jelszó")
    }
    let user ={};
    try{
        const res= await fetch(`${Server}/users/login`,{
            method: "Post",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    email: Emailfield.value,
                    password: Passwordfield.value
            })
        })
        user= await res.json(); 
        if(user.id){
            loggeduser=user;
        }
        if(!loggeduser){
            Alert("warning", "Sikertelen bejelentkezés", "Hibás jelszó vagy Emailfield")
            return;
        }
        sessionStorage.setItem("loggeduser", JSON.stringify(loggeduser))
        Emailfield.value =""
        Passwordfield.value =""
        await getloggeduser()
        Alert("success", "Sikeres bejeltkezés", "Sikeresen bejelentkezett")
        return;
    }
    catch(err){
        Alert("danger","HIBA",err)
    }   
}
async function Changenameemail(){
    let Emailfield = document.querySelector('#Emailfield');
    let Namefield = document.querySelector('#Namefield');
    if(Emailfield.value ==""|| Namefield.value==""){
        Alert("warning", "Kérem töltse ki a mezőket", "Az összes mező kitöltése nélkül nem mehetünk tovább!")
        return;
    }
    let user={}
    try{
        const res = await fetch(`${Server}/users/profile/${loggeduser.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: Emailfield.value,
                name: Namefield.value
            })
        })
        
        user = await res.json();
        console.log(user)
        if(res.status !== 200) {
            Alert(user.msg || "Hiba történt!", "alert-danger");
            return;
        }
        if(user && user.id){
            loggeduser = user;
        }
        sessionStorage.setItem("loggeduser", JSON.stringify(loggeduser));
        await getloggeduser()
        Alert("success","Sikeres Adatmódosítás!", "Sikeresen módosítottad az email cím/ nevedet")
       
    }
    catch(err){
        Alert( "danger","Hiba történt!",user.msg );
    }


}
async function Changepassword() {
    let Emailfield = document.querySelector('#Emailfield');
    let Namefield = document.querySelector('#Namefield');
    let Passwordfield = document.querySelector('#Passwordfield');
    let Confpassfield = document.querySelector('#ConfirmPasswordfield');
    let Oldpassfield = document.querySelector('#oldPasswordfield')
    if(Emailfield.value ==""|| Namefield.value=="" || Oldpassfield.value=="" || Passwordfield.value=="" ||Confpassfield.value==""){
        Alert("warning", "Kérem töltse ki a mezőket", "Az összes mező kitöltése nélkül nem mehetünk tovább!")
        return;
    }
    if(Oldpassfield.value == Passwordfield.value){
        Alert("warning","Ugyanaz a régi és az új jelszó", "A régi és az új jelszó nem lehet ugyanaz!")
        return;
    }
    if(Passwordfield.value != Confpassfield.value){
        Alert("warning", "Új jelszó és megerősítő jelszó hiba","Az új jelszó és a megerősítő jelszó nem ugyanaz!")
        return;
    }
    let user = {};
    try {
       const res = await fetch(`${Server}/users/password/${loggeduser.id}`, {
           method: 'PATCH',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               oldpass: Oldpassfield.value,   
               newpass: Passwordfield.value       
           })
       });
       user = await res.json();
       if(res.status !== 200) {
           Alert( "danger","Hiba történt!",user.msg );
           return;
       }
       if(user.id){
           loggeduser = user;
       }
       sessionStorage.setItem("loggeduser", JSON.stringify(loggeduser));
       Alert("success","Sikeres jelszómódosítás!","Sikeresen megváltoztattad a jelszavad" )
   } catch (error) {
       console.log('Error:', error);
   }


}
function getProfile(){
    let Emailfield = document.querySelector('#Emailfield');
    let Namefield = document.querySelector('#Namefield');
    let user= typeof loggeduser !== "undefined" && loggeduser? loggeduser: null;
    if(!user){
        const stored = sessionStorage.getItem("loggeduser")
        if(stored) user =JSON.parse(stored)
    }
    if(user){
        Emailfield.value = user.email ||""
        Namefield.value = user.name||""
    }
    else{
        Emailfield.value = ""
        Namefield.value = ""
        Alert("warning", "Nincs bejelentkezve a felhasználó","Ide hogy kerültnük?")
    }
}