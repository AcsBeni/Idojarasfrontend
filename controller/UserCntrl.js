async function Registeruser(){
    let Emailfield = document.querySelector('#Emailfield');
    let Name = document.querySelector('#Namefield').value;
    let Password = document.querySelector('#Passwordfield').value;
    let Confpass = document.querySelector('#ConfirmPasswordfield').value;

    if(Emailfield.value ==""|| Name==""|| Password== ""||Confpass==""){
        Alert("warning", "Üres mezők", "Kérem töltsön ki minden üres mezőt")
       return;
    }
    if(Password!=Confpass)
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
                    name: Name,
                    email: Emailfield.value,
                    password: Password
                })
        })
        const data = await res.json();
        if(res.status ===200){
            Alert("success", "Sikeres regisztráció", "Sikeresen létrehozott egy fiókot")
            Emailfield.value =""
            Name = ""
            Password =""
            Confpass= ""
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

}
async function Changepassword() {
    
}