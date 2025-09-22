function Registeruser(){
    let Email = document.querySelector('#Emailfield').value;
    let Name = document.querySelector('#Namefield').value;
    let Password = document.querySelector('#Passwordfield').value;
    let Confpass = document.querySelector('#ConfirmPasswordfield').value;

    if(Email ==""|| Name==""|| Password== ""||Confpass==""){
       alert("nem adta meg minden adatot")
       return;
    }
    if(Password!=Confpass)
    {
        alert("Nem ugyanaz a kettő jelszó")
        return;
    }
}
function Loginuser(){
    let Email = document.querySelector('#Emailfield').value;
    let Password = document.querySelector('#Passwordfield').value;
    if(Email ==""|| Password== ""){
        alert("nem adta meg minden adatot")
        return;
    }
    if(Email !="ember@gmail.com"|| Password!="123"){
        Alert("success", "hello", "bello")
    }
}