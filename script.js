const logbtn = document.getElementById("log-btn");
const main = document.getElementById("main-section");
const requestbtn = document.getElementById("requestbtn");
const transfertbtn = document.getElementById("transfertbtn");
const closebtn = document.getElementById("closebtn");
const movements = document.getElementById("movements")
const sortbtn = document.getElementById("sort-btn")
let username = document.getElementById("username");
let user = document.getElementById("inputuser");
let pin = document.getElementById("inputpin").value;
let users = [
  { user: "hamza", pin: "1111", budget: "300000", id:"1" },
  { user: "bouhdidi", pin: "0000", budget: "1000000", id:"2" },
  { user: "yasmine", pin: "07052003", budget: "2000000000000000000", id:"3" },
];
let actions = []


//Adding the current date
let today = new Date();
let date =
  today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
let hours = today.getHours();
let minutes = today.getMinutes();
let time = hours + ":" + minutes;
let dateTime = date + ", " + time;
let timer = document.getElementById("timeout");
function displayDateTime() {
  document.getElementById("date-time").textContent = dateTime;
}
console.log(dateTime);

// logging out function
let tenMinutes = 10 * 60 * 1000;
let timerElement = document.getElementById("timeout");
let remainingTimeElement = document.createElement("div");
remainingTimeElement.innerHTML = "You will be logged out in 10:00 ";
timerElement.appendChild(remainingTimeElement);
let startTime = new Date();
let timerInterval = setInterval(function () {
  let remainingTime = tenMinutes - (new Date() - startTime);
  let minutes = Math.floor(remainingTime / 1000 / 60);
  let seconds = Math.floor(remainingTime / 1000) % 60;
  let timeString =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  remainingTimeElement.innerHTML = "You will be logged out in " + timeString;
  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    main.style.display = "none";
    location.reload();
  }
}, 1000);

// checking function
function checkUser(users) {
  const user = document.getElementById("inputuser").value;
  const pin = document.getElementById("inputpin").value;
  const budgetoutput = document.getElementById("budgetoutput");
  for (let i = 0; i < users.length; i++) {
    if (users[i].user === user && users[i].pin === pin) {
      console.log("user exist");
      budgetvalue = users[i].budget;
      console.log(budgetvalue);
      return true;
    }
  }
  return false;
}

//logbtn function
logbtn.addEventListener("click", function () {
  console.log("display none");
  if (checkUser(users)) {
    main.style.display = "block";
    console.log("Login successful.");
    console.log(user.value);
    let welcomemsg = "Good Day" + ", " + user.value.toUpperCase() + "!";
    username.innerHTML = welcomemsg;
    budgetoutput.textContent = budgetvalue;
    movements.textContent = ""
    
    
  } else {
    console.log("Login failed");
    main.style.display = "none";
  }
  conter = 1  
  document.getElementById("inputuser").value = ""
  document.getElementById("inputpin").value = ""
  
});

//request function
let count = 0;
let counter = actions.length + 1 ;
let soldeinvalue = 0 
requestbtn.addEventListener("click", function () {
  const soldein = document.getElementById("solde-in")
  const request = document.getElementById("Requestoutput").value;
  count = Number(request);
  console.log(count);
  budgetvalue = parseFloat(budgetvalue) + count;
  console.log(budgetvalue);
  budgetoutput.textContent = budgetvalue;
  const deposit = `<div class="item">
    <p class ="deposit-text">${counter} deposit<p>
    <p>today<p>
    <p>${request} $</p>
  </div>`
  movements.innerHTML += deposit;
  counter++;
  actions.push({type : "deposit",value :request})
  soldeinvalue += Number(request)
  console.log(soldeinvalue)
  soldein.textContent = soldeinvalue + "$"
  
});



//transfert function
let soldeoutvalue = 0
transfertbtn.addEventListener("click", function () {
  const transfertto = document.getElementById("transfertto").value;
  const taransfertamount = document.getElementById("taransfertamount").value;
  const soldeout = document.getElementById("solde-out")
  for (let i = 0; i < users.length; i++) {
    if (users[i].user === transfertto) {
      console.log("the user has been founded");
      console.log(taransfertamount);
      budgetvalue = budgetvalue - taransfertamount;
      users[i].budget = Number(users[i].budget) + Number(taransfertamount);
      console.log(users[i].budget);
      console.log(budgetvalue);
      budgetoutput.innerHTML = budgetvalue;
      const WITHDRAWAL = `<div class="item">
      <p class ="WITHDRAWAL-text">${counter}WITHDRAWAL<p>
      <p>today<p>
      <p> -${taransfertamount} $</p>
      </div>`
      movements.innerHTML += WITHDRAWAL;
      actions.push({type : "WITHDRAWAL",value :-taransfertamount})
      counter = actions.length +1
      soldeoutvalue += Number(taransfertamount)
      soldeout.textContent = soldeoutvalue + "$"
    }
  }

});

// close account function
let actualid
closebtn.addEventListener("click", function () {
  const deleteuser = document.getElementById("deleteuser").value;
  const deletepin = document.getElementById("deletepin").value;
  for (let i = 0; i < users.length; i++) {
    if (users[i].user === deleteuser && users[i].pin === deletepin) {
     if (users[i].budget === budgetvalue) {
        main.style.display = "none";
        username.textContent = "Log in to get started";
        console.log(users.length) 
      }
      actualid = users[i].id
      console.log(actualid);
      users = users.filter(user => user.id !== actualid);
      console.log(users)
    }
  }
});



sortbtn.addEventListener('click', () => {
  actions.sort(function(a, b){return b.value - a.value});
  console.log(actions)
  let depositDiv = movements.querySelector('.deposit-text').parentNode;
  let WITHDRAWALDiv = movements.querySelector('.WITHDRAWAL-text').parentNode;
  for (let i = 0; i < actions.length; i++){
    if(actions[i].type !== "deposit"){
      movements.insertBefore(depositDiv, WITHDRAWALDiv);
    } else {
      movements.insertBefore(depositDiv, WITHDRAWALDiv);
    }
  }
  
})
