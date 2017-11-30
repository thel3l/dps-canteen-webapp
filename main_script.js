
//initializeFirebase
var config = {
    apiKey: "AIzaSyA5mYI6Aqnh7IhVcnPUIzhUiMMJmB-3dKQ",
    authDomain: "dpsetab.firebaseapp.com",
    databaseURL: "https://dpsetab.firebaseio.com",
    projectId: "dpsetab",
    storageBucket: "dpsetab.appspot.com",
    messagingSenderId: "960247580281"
};
firebase.initializeApp(config);

//firebase declarations
var id = "BE000111";
var st_name = document.getElementById("st_name");
var money = document.getElementById("money");
var st_pic = document.getElementById("st_pic");
//firebase code
  firebase.database().ref('users/' + id).on('value', function(snapshot) {
    var userInfo = snapshot.val();
    st_name.innerHTML = userInfo.name;
    money.innerHTML = userInfo.balance;
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
    var price=0;
    
    /*Loop to automatically populate the array comes here 
     source of the array could be in firebase ??
     prices.forEach(getFromFirebase)
    */ 
    var prices = [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50];

    for(var i=0;i<item.length;i++) {
          item[i].addEventListener("click",function() {
               var e = parseInt(this.getAttribute('id'));
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

   function openmodal()
   {
       
       window.open("https://paytm.com", 'paytm',"height=700,width=1000,left='10%',top='20%'" );
   }
    function update(id,price) {
        firebase.database().ref('users/'+id).update({
           balance: price  
       });
    }
   //procceed to payment
   proceed.addEventListener("click",function() {
        var money = parseInt(document.getElementById('money').innerHTML);
        var price = parseInt(document.getElementById("tags").innerHTML);
        var current =money-price;
        if(current < 0) {
          var temp  = -1 * current;
          window.alert(temp+ " must be topped in the wallet");
          current = 0;
          window.open("https://paytm.com", 'paytm',"height=700,width=1000,left='10%',top='20%'" );
        } else {
          window.alert("Purchase Successful :-)");
        }

        console.log(current);
        update(id,current);
   });
}
