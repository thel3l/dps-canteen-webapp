//initializeFirebase
var config = {
  apiKey: "AIzaSyCas9WSzPdCvatx7ODWMTquCCwiuZEj-UI",
  authDomain: "dpsemca-1f00a.firebaseapp.com",
  databaseURL: "https://dpsemca-1f00a.firebaseio.com",
  projectId: "dpsemca-1f00a",
  storageBucket: "dpsemca-1f00a.appspot.com",
  messagingSenderId: "696186948502"
};
firebase.initializeApp(config);

//firebase declarations
var id = "BE000111";
var database = firebase.database();
var userRef = database.ref().child("users").child(id);
//firebase code
userRef.on('value', function(snapshot) {
  var userInfo = snapshot.val();
  st_name.innerHTML = userInfo.name;
  /*
  $('#studentName span').text(userInfo.name);
  $('#walletBal span').text(userInfo.balance);
  $('#profileImage').attr('src', userInfo.photo);
  $('#currentWalletBal span').text(userInfo.balance);
  $('#headerProfilePic').attr('src', userInfo.photo);
  $('#dropdownName').text(userInfo.name);
  $('#dropdownWallet span').text(userInfo.balance);
  */
});


window.addEventListener("load",main);
function main() {

    //Death to frameworks !! 
    var item=document.getElementsByClassName('items');
    var screen = document.getElementById("tags");
    var clear = document.getElementById("clear");
    var dpay = document.getElementById("direct_pay");
    var dpayinputs = document.getElementById("direct_pay").getElementsByTagName('input');
    var c_amt =document.getElementById("c_amt");
    var crt_user = document.getElementById("crt_user");
    var crt_userbutton = document.getElementById("crt_user").getElementsByTagName('button'); 
    var proceed  = document.getElementById("payment");
    var st_name = document.getElementById("st_name");
    var price=0;
    
    /*Loop to automatically populate the array comes here 
     source of the array could be in firebase ??
     prices.forEach(getFromFirebase)
    */ 
    var prices = [1,2,3,4,5,6,7,8,9,11,12,13,14,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42];

    for(var i=0;i<item.length;i++) {
          item[i].addEventListener("click",function() {
               var e = parseInt(this.getAttribute('id'));
               console.log(prices[e]); 
                document.getElementById(this.getAttribute('id')).disabled =true;
                price += prices[e];
                  screen.innerHTML = price;
                  this.style = "color:#27FF00 ";
                  //custom amount sidebox mods
                  dpay.style="color:grey";
                  dpayinputs[0].disabled =true;
                  dpayinputs[1].disabled =true;
         }); //end EventListener functionality
    }


    //clear
    
    clear.addEventListener("click",function() {
        for(var i=0;i<item.length;i++) {
          item[i].style="color:white"
          price = 0;
          screen.innerHTML = "0";
          item[i].disabled = false;
        }
    })


   //custom amount
   c_amt.addEventListener("click",function() {
     crt_user.style="color:grey";
     crt_userbutton.disabled =true;
     dpay.style="color:black";
     dpayinputs[0].disabled =false;
     dpayinputs[1].disabled =false;
     crt_userbutton = "color:grey";
   })

   function openmodal()
   {
       var x = screen.width/2 - 700/2;
       var y = screen.height/2 - 450/2;
       console.log(x);
       window.open("https://paytm.com", 'paytm','height=100%,width=100%,left='+x+',top='+y);
   }

   //procceed to payment
   proceed.addEventListener("click",openmodal);   
}