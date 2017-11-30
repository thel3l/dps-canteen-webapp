
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
var st_name = document.getElementById("st_name");
var money = document.getElementById("money");
var st_pic = document.getElementById("st_pic");
//firebase code
try {
  userRef.on('value', function(snapshot) {
    var userInfo = snapshot.val();
    var name = userInfo.name;
    var count =0;
    var countspaces =0;
    var index ;
    //to stop the interface from breaking on input of long names
     for (var i = 0;(i < name.length) || (count!=12); i++) {
        count++;
        if(name[i] == " ") {
         countspaces++;
      }
      if(countspaces == 2) {
        index = i;
        break; 
      }
    }
    st_name.innerHTML = name.substring(0,++index);
    money.innerHTML = userInfo.balance;
    st_pic.setAttribute("src",userInfo.photo);
  
  });
} catch(e) {
  window.alert("Your data appears to be unavialable \n Please contact the school authorities")
}

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
    var price=0;
    
    /*Loop to automatically populate the array comes here 
     source of the array could be in firebase ??
     prices.forEach(getFromFirebase)
    */ 
    var prices = [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50];

    for(var i=0;i<item.length;i++) {
          item[i].addEventListener("click",function() {
               var e = parseInt(this.getAttribute('id'));
               console.log(prices[e]); 
                // document.getElementById(this.getAttribute('id')).disabled =true;
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
          // item[i].disabled = false;
        }
    })


   //custom amount
   c_amt.addEventListener("click",function() {
     crt_user.style="color:grey";
     crt_userbutton.disabled =true;
     dpay.style="color:black";
     dpayinputs[0].disabled =false;
     dpayinputs[1].disabled =false;
     this.style = "color:grey";
     clear.style="color:grey";
     for(var i=0;i<item.length;i++) {
      item[i].style="color:white"
      price = 0;
      screen.innerHTML = "0";
      // item[i].disabled = false;
    }
   })

   

   //procceed to payment
   proceed.addEventListener("click",function() {
    window.open("https://paytm.com", 'paytm',"height=700,width=1000,left='10%',top='20%'" );
    var money = parseInt(document.getElementById('money').innerHTML);
    var price = parseInt(document.getElementById("tags").innerHTML);
    console.log("Wallet:" +money);
    console.log("price:" + price);
    console.log(typeof money);
    console.log(typeof price);
     var current = money-price; 
     if(current >=0) {
       return current;
     } else {
       window.alert(Math.abs(current) + " needs to be toped up");
       current =0;
     }
     console.log(current);
     userRef.child('balance').update({
       balance: current
     });
   });   
}
