var changeLeft = document.querySelector(".homePage .changeLeft");
var changeRight = document.querySelector(".homePage .changeRight");
var resetBtn = document.querySelector(".homePage .reset");
const root = document.documentElement;
const loginPage = document.querySelector(".login");
const homePage = document.querySelector(".homePage");
const signUpPage = document.querySelector(".signUp");
var mails = [];

var isNameValid = /\w{3,}/;
var isMailValid = /^\w+@\w+\.(co|com)$/;

function colorChanger(probName){
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    root.style.setProperty(probName, `rgb(${red},${green},${blue})`);
}
changeLeft.addEventListener("click",function(){
    colorChanger("--main-color")
});
changeRight.addEventListener("click",function(){
    colorChanger("--sec-color")
});

resetBtn.addEventListener("click", function(){
    root.style.setProperty("--main-color", `#F6B253`);
    root.style.setProperty("--sec-color", `#333`);
})

//Log out 
document.querySelector(".homePage .navbar-collapse .log-out").addEventListener("click", function(){
    homePage.classList.replace("show","hide");
    loginPage.classList.replace("hide","show");
})

//Sign Up Page

var signBtn = document.querySelector(".signUp .sign-btn");
signBtn.addEventListener("click", function(){
    var Sign = {
        FirstName : document.querySelector("#signFirstName").value,
        LastName : document.querySelector("#signLastName").value,
        Mail : document.querySelector("#signMail").value,
        Pass : document.querySelector("#signPass").value,
    }

    function isAllValid(){
        if(!isNameValid.test(Sign.FirstName) || !isNameValid.test(Sign.LastName) ){
            document.querySelector(".signUp .warningText").innerHTML = "Your first name or last name must be more than 3 characters."
        }
        else{
            document.querySelector(".signUp .warningText").innerHTML = null;
        }
        if(!isMailValid.test(Sign.Mail)){
            document.querySelector(".signUp .warningMail").innerHTML = "Your Mail must be like this structure name@emaple.com."
        }
        else{
            document.querySelector(".signUp .warningMail").innerHTML = null;
        }
        if(Sign.Pass === ''){
            document.querySelector("#signPass").style.border = "3px solid rgba(220,53,69 , 0.6)";
        }
        else{
            document.querySelector("#signPass").style.border = "";
        }
        if (isNameValid.test(Sign.FirstName) && isNameValid.test(Sign.LastName) && isMailValid.test(Sign.Mail) && Sign.Pass !== '') {
            mails.push(Sign);
            signUpPage.classList.replace("show","hide");
            loginPage.classList.replace("hide","show");
        }
    }
    
    isAllValid();
    localStorage.setItem("allMails" , JSON.stringify(mails));

})
// link login page with sign page
    document.querySelector(".signUp .inputs .row p .login-page").addEventListener("click",function(){
    signUpPage.classList.replace("show","hide");
    loginPage.classList.replace("hide","show");
})

document.querySelector(".login .inputs .sign-page").addEventListener("click",function(){
    loginPage.classList.replace("show","hide");
    signUpPage.classList.replace("hide","show");
})

// login page validation 

//check whether the eMail is exist or not 
var loginBtn = document.querySelector(".login .login-btn");
loginBtn.addEventListener("click", function(){
    var loginMail = document.querySelector("#loginMail").value;
    var loginPass = document.querySelector("#loginPass").value;

    var localMails = localStorage.getItem("allMails");
    var returnMails = JSON.parse(localMails) || [];
    if(isMailValid.test(loginMail)){
        document.querySelector(".login .box-login .warningMail").innerHTML = null;
        var isMailExist = false;
        if(loginMail === '' || loginPass === ''){
            document.querySelector(".login .box-login .warningPass").innerHTML = "Please enter email and password.";
        }
        else{
            document.querySelector(".login .box-login .warningPass").innerHTML = null
        }
        for (let i = 0; i < returnMails.length; i++) {
            if(loginMail === returnMails[i].Mail){
                if(returnMails[i].Pass !== loginPass){
                    document.querySelector(".login .box-login .warningPass").innerHTML = "This Password is not correct, please try again.";
                }
                else{
                    isMailExist = true;
                    document.querySelector(".login .box-login .warningPass").innerHTML = null;
                    document.querySelector(".homePage .box-header").innerHTML += ` ${returnMails[i].FirstName} ${returnMails[i].LastName}`;
                }
                document.querySelector(".login .box-login .warningMail").innerHTML = null;
            }
            else{
                document.querySelector(".login .box-login .warningMail").innerHTML = "This email does not exist in our system.";
            }
        }
    
        if(isMailExist){
            
            loginPage.classList.replace("show","hide");
            homePage.classList.replace("hide","show");
        } 
    }
    else{
        document.querySelector(".login .box-login .warningMail").innerHTML = "Email must be in this structure name@example.com";
    }
})