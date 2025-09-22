function Registeruser(){
    let Email = document.querySelector('#Emailfield').value;
    let Name = document.querySelector('#Namefield').value;
    let Password = document.querySelector('#Passwordfield').value;
    let Confpass = document.querySelector('#ConfirmPasswordfield').value;

    if(Email ==""|| Name==""|| Password== ""||Confpass==""){
        Alert("warning", "Üres mezők", "Kérem töltsön ki minden üres mezőt")
       return;
    }
    if(Password!=Confpass)
    {
        Alert("warning", "Nem megegyező jelszók", "Kérem legyen ugyanolyan mind a kettő jelszó")
        return;
    }
}
function Loginuser(){
    let Email = document.querySelector('#Emailfield').value;
    let Password = document.querySelector('#Passwordfield').value;
    if(Email ==""|| Password== ""){
        Alert("warning", "Üres mezők", "Kérem töltsön ki minden üres mezőt")
        return;
    }
    if(Email !="ember@gmail.com"|| Password!="123"){
        Alert("warning", "Sikertelen bejelentkezés", "Rossz az email cím vagy a jelszó")
    }
}