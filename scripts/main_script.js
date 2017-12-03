
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
var id = "BE00012314";
var st_name = document.getElementById("st_name");
var money = document.getElementById("money");
var st_pic = document.getElementById("st_pic");
var menu = [];

//firebase code 
  firebase.database().ref('users/' + id).on('value', function(snapshot) {
    var userInfo = snapshot.val();
    if(userInfo) {
        if(snapshot.hasChild('name')) {
          st_name.innerHTML = userInfo.name;
         } else {
          window.alert("Oops ! \n Your name has not been properly added into our database \n  Please get in touch with school authorities");
        }

        if(snapshot.hasChild('balance')) {
          money.innerHTML = userInfo.balance;
        } else {
        window.alert("Oops ! \n Your wallet money has not been properly configured into our database \n  Please get in touch with school authorities");
        }
        if(snapshot.hasChild('pic')) {
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
    var feedback = document.getElementById('feedback');
    var c_amt =document.getElementById("c_amt");
    var crt_user = document.getElementById("crt_user");
    var crt_userbutton = document.getElementById("crt_user").getElementsByTagName('button'); 
    var proceed  = document.getElementById("payment");
    var price=0; //needed,  may conflict do not chnage internal mechanism will break
    /*Loop to automatically populate the array comes here 
     source of the array could be in firebase ??
     prices.forEach(getFromFirebase)
    */
    var d = new Date(); // time do not change may break code.
    var state = 0;
    var visits = 0;
    //state 0 is menu 
    //state 1 is custom amt 
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
                  feedback.disabled =true;
                  if(state == 1) {
                    crt_user.style="color:black;";
                    state =0;
                    clear.style = "color:black";
                    c_amt.style = "color:black";
                    document.getElementById('c_form').reset();
                  }
                  if(visits != 0) {
                    hideSuccess();
                  }
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

   //custom amount on the summary tab
   c_amt.addEventListener("click",function() {
     current =0 ;
     state = 1;
     crt_user.style="color:grey";
     crt_userbutton.disabled =true;
     dpay.style="color:black";
     dpayinputs[0].disabled =false;
     feedback.disabled = false;
     this.style = "color:grey";
     clear.style="color:grey";
     for(var i=0;i<item.length;i++) {
      item[i].style="color:white"
      price = 0;
      screen.innerHTML = "0";
      // item[i].disabled = false;
    }
   })
    function menuUpdate(id,items,price) {
      console.log(d);
      firebase.database().ref('users/' + id +'/transactions/'+ d).set({
          "bill_amt":  price,
          "items_bought": items,
           "status": "Pending Order"
      });
    }

    function customUpdate(id,price) {
      console.log(d);
      firebase.database().ref('users/' + id +'/transactions/'+ d).set({
          "bill_amt":  price,
           "status": "Funds transferred-Transaction Incomplete"
      });
    }
    function hideSuccess() {
      var element = document.getElementById('success');
      if(element) {
        element.style = "display:none";
      }
    }
   /* function checkOverwrite(id,d,state) {
      var user;
      var t_history;
      
      firebase.database().ref('users/' + id).once('value').then(function(snapshot) {
            user = snapshot.val();      
            firebase.database().ref('users/' + id +'/transactions/').once('value').then(function(datasnapshot) {
              t_history = datasnapshot.val();
          /*    var count=-1;
              var keys = [];
              for(var key in t_history) {
                count++;
                keys[count] = key;
              }
              var lastItem = keys[count];
              var userAmt = user.balance;
            var confirm = window.confirm("Do you wish to rewrite your previous order");
            if(confirm) {
               firebase.database().ref('users/' + id +'/transactions/'+lastItem).once('value').then(function(snapshot) {
                  var transaction = snapshot.val();
                  var lastPurchase = transaction.bill_amt;
                  var money = parseInt(document.getElementById('money').innerHTML);
                  console.log(lastPurchase);
                  console.log(money);
                  var amount = money + lastPurchase;
                 update(id,amount);
                 var money = parseInt(document.getElementById('money').innerHTML);
                 var bill_amt_temp = parseInt(document.getElementById("tags").innerHTML);
                 var current =money-bill_amt_temp;
                 if(current < 0) {
                  var temp  = -1 * current;
                  window.alert(temp+ " must be topped in the wallet");
                  current = 0;
                  window.open("https://paytm.com", 'paytm',"height=700,width=1000,left='10%',top='20%'" );
                } else {
                  for(var i=0;i<item.length;i++) {
                    item[i].style="color:white"
                    price = 0;
                    screen.innerHTML = "0";
                    // item[i].disabled = false;
                  }
                  if(transaction.items_bought) {
                    menuUpdate(id,items,current);
                    
                   } else {
                    customUpdate(id,current);
                   }
                   window.alert("Purchase Successful :-)");
                } */
                
            //   });
              
               // the reset is done at this point.
          //  if(lastItem.items_bought){
           //     var confirmation  = window.confirm("Do you wish to override your previous order ?");
            //    if(confirmation){
               //   var reset = userAmt + t_history.lastItem;
              //    firebase.databse().ref('users/' + id).update({
          //           balance: userAmt
            //      });  
            //    }
           //    }
      //   }   // end of if statement     
     //   });       
 //   }); 
 //  }
   
   //procceed to payment
   function createTransactionresult(message,bgcolor,color) {
     var box  = document.createElement('div');
     var text = document.createTextNode(message) //'TransactionSuccessful!!' #dff0d8 #3c763d
     box.appendChild(text);
     box.id = 'success';
     box.style = 'color:'+color+' ; \
     background-color: '+bgcolor +'; \
     border-color: #d6e9c6; \
     margin-bottom: 1%; \
     border: 1px solid transparent; \
     box-sizing: border-box; \
     border-radius: 2%; \
     height:3.5%; \
     padding-left:3% \
    width:30%; \
    position:absolute; \
    top:95.5%; \
    left:75%; \
    width:20%; \
    font-family:"Comic Sans MS"; \
    font-size:0.8rem; '
    document.body.appendChild(box); 
   }
  
   proceed.addEventListener("click",function() {
        var money = parseInt(document.getElementById('money').innerHTML);
        var bill_amt = parseInt(document.getElementById("tags").innerHTML);
        var custom_amt = parseInt(dpayinputs[0].value);
        //there are two seprate states and therefore two seperate variable sets
        var current =money-bill_amt;
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
        if(visits == 0) {
          if(isNaN(custom_amt) ) {
            update(id,current);
            menuUpdate(id,items,bill_amt);
          } else {
            current = money - custom_amt;
            update(id,current);
            customUpdate(id,custom_amt);
          }
        //reseting the entire interface
        createTransactionresult('TransactionSuccessful!!','#dff0d8','#3c763d')
        } else {
          checkOverwrite(id,d,state);
        }
        visits++;
        crt_user.style="color:black";
        crt_userbutton.disabled =false;
        dpay.style="color:black";
        dpayinputs[0].disabled =false;
        feedback.disabled =false;
        this.style = "color:black";
        clear.style="color:black";
        items.length = 0;
        document.getElementById('c_form').reset();
        for(var i=0;i<item.length;i++) {
          item[i].style="color:white"
          price = 0;
          screen.innerHTML = "0";
          // item[i].disabled = false;
        }
   });
   //the transaction history modal
  

