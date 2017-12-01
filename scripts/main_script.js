
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
var st_name = document.getElementById("st_name");
var money = document.getElementById("money");
var st_pic = document.getElementById("st_pic");
var menu = [];
//firebase code 
  firebase.database().ref('users/' + id).on('value', function(snapshot) {
    var userInfo = snapshot.val();
    if(userInfo) {
        if(userInfo.name) {
          st_name.innerHTML = userInfo.name;
         } else {
          window.alert("Oops ! \n Your name has not been properly added into our database \n  Please get in touch with school authorities");
        }

        if(userInfo.balance) {
          money.innerHTML = userInfo.balance;
        } else {
        window.alert("Oops ! \n Your wallet money has not been properly configured into our database \n  Please get in touch with school authorities");
        }
        if(userInfo.pic) {
          st_pic.src = userInfo.pic ;
        } else {
        window.alert("Oops ! \n Your profile pic has not been properly configured into our database \n  Please get in touch with school authorities");
        }
    } else {
      window.alert("Oops ! \n You have not been registered with our database.\n please contact school autorities");
    }
 });
 if(firebase.database().ref('menu/')) {
 firebase.database().ref('menu/').on('value', function(snapshot) {
     var menuref = snapshot.val();
     for(var item in menuref) {
       menu[item] = menuref[item]
     }
 });
}
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
    //bill
    var items = [];
    var c = 0;
    for(var i=0;i<item.length;i++) {
          item[i].addEventListener("click",function() {
               var e = parseInt(this.getAttribute('id'));
                // document.getElementById(this.getAttribute('id')).disabled =true;
                price += prices[e];
                items[c] = menu[e];
                c++;
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

    function update(id,price) {
      firebase.database().ref('users/'+id).update({
         balance: price  
     });
  }

   //custom amount on the summart tab
   c_amt.addEventListener("click",function() {
     current =0 ;
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
    var d = new Date();
    function menuUpdate(id,items) {
      firebase.database().ref('users/' + id +'/transactions/'+ d).set({
          "time of purchase":  new Date(),
          "items_bought": items,
           "status": "Pending Order"
      });
    }
   //procceed to payment
   proceed.addEventListener("click",function() {
        var money = parseInt(document.getElementById('money').innerHTML);
        var price = parseInt(document.getElementById("tags").innerHTML);
        var custom_amt = parseInt(dpayinputs[0].value);
        var current =money-price;
        if(current < 0) {
          var temp  = -1 * current;
          window.alert(temp+ " must be topped in the wallet");
          current = 0;
          window.open("https://paytm.com", 'paytm',"height=700,width=1000,left='10%',top='20%'" );
        } else {
          window.alert("Purchase Successful :-)");
          for(var i=0;i<item.length;i++) {
            item[i].style="color:white"
            price = 0;
            screen.innerHTML = "0";
            // item[i].disabled = false;
          }
        }
        if(isNaN(custom_amt)) {
          update(id,current);
          menuUpdate(id,items);
        } else {
          current = money - custom_amt;
          update(id,current);
        }
        crt_user.style="color:black";
        crt_userbutton.disabled =false;
        dpay.style="color:black";
        dpayinputs[0].disabled =false;
        dpayinputs[1].disabled =false;
        this.style = "color:black";
        clear.style="color:black";
   });
   

