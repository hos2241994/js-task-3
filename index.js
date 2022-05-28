const usersArr = [];
let customer;
const logIn = document.querySelector('#log-in');
const signUp = document.querySelector('#sign-up');
const userName = document.querySelector('#name');
const userPassword = document.querySelector('#password');

//Delete input Value
function deleteValue () {
    userName.value = "";
    userPassword.value = "";
}

class User {
    constructor(name, password) {
        this.name = name;
        let userPassword = password;
        this.balanceAmount = 1000;
        this.loginPage= document.getElementById('main-log');
        this.processPage = document.getElementById('process');
        //Withdraw
        this.withdraw = document.getElementById('withdraw');
        this.withdraw.onclick =  () => {
            this.balanceProcess('withdraw');
        };
        //Deposite
        this.deposite = document.getElementById('deposite');
        this.deposite.onclick = () =>{
            this.balanceProcess('deposite');
        };
        //Balance
        this.balance = document.getElementById('balance');
        this.balance.onclick =  this.showBalance;
        //Exit Process Page
        this.exit = document.getElementById('exit');
        this.exit.onclick =  this.exitProcessPage;
        //Check Password
        this.checkPassword = (pass) => {
            if(userPassword === pass){
                return true;
            }
            else{
                return false;
            }
        } 
    }


    showProcess() {
        this.loginPage.style.display = 'none';
        this.processPage.style.display = 'flex';
    }

    balanceProcess (process) {
        let value = prompt(`Please Enter ${process} Value`, 0);
        value = parseInt(value);
        if(isNaN(value)){
            value = 0;
        }
        if(process === 'deposite'){
            customer.balanceAmount += value;
            this.showBalance();
            this.updateUserData();
        }else{
            if(this.balanceAmount >= value){
                customer.balanceAmount -= value;
                this.showBalance();
                this.updateUserData();
            }else{
                alert('Your Balance Is Less Than The Value Entered')
            }
        }
    }

    showBalance ()  {
        alert(`Your Balance is ${customer.balanceAmount}`);
    }

    exitProcessPage = () => {
        this.loginPage.style.display = 'flex';
        this.processPage.style.display = 'none';
        customer = "";
    }

    updateUserData() {
        for(let x in usersArr){
            if(usersArr[x].name === customer.name){
                usersArr[x].balanceAmount = customer.balanceAmount;
            }
        }
    }
}

//SignUP
signUp.addEventListener('click',() =>{
    if(userName.value.trim() && userPassword.value.trim()){
        let user = new User(userName.value.trim(), userPassword.value.trim());
        usersArr.push(user);
        deleteValue();
    }
})

//LogIn
logIn.addEventListener('click',() =>{
    for(let x in usersArr){
        if(usersArr[x].name === userName.value && usersArr[x].checkPassword(userPassword.value.trim())) {
            customer = usersArr[x];
            deleteValue();
            customer.showProcess();
        }
    }
})
