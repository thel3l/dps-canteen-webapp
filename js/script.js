﻿﻿//initializeApp
var config = {
  apiKey: "AIzaSyCas9WSzPdCvatx7ODWMTquCCwiuZEj-UI",
  authDomain: "dpsemca-1f00a.firebaseapp.com",
  databaseURL: "https://dpsemca-1f00a.firebaseio.com",
  projectId: "dpsemca-1f00a",
  storageBucket: "dpsemca-1f00a.appspot.com",
  messagingSenderId: "696186948502"
}
firebase.initializeApp(config);

var database = firebase.database();
var userRef, userInfo;
var adNo;
var temp_adno;
function changeErrorMessage(msg) {
  setTimeout(() => {
    var error_board = document.getElementById("UserNotRegistered");
    var loading_thing = document.querySelector(".loader");
   error_board.innerHTML = msg;
   error_board.style="display:block";
   loading_thing.style = "display:none";
  },100);
}
// start dev code
// setTimeout(function(){
//     $('#wrapper').fadeOut(function() { $(this).remove(); });
//     $('#slideshow').fadeOut( function() { $(this).remove(); });
//    }, 1500);
//auth starts
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    adNo = user.uid;
    userRef = database.ref().child('users').child(user.uid);
       firebase.database().ref('users/'+adNo).once('value').then( (snap) => {
       userInfo = snap.val();
       if(userInfo){
        console.log(adNo);
        temp_adno = adNo;
        userInfo['admid'] = snap.key;
        setUser(userInfo);
        $('#wrapper').fadeOut(function() { $(this).remove(); });
        $('#slideshow').fadeOut( function() { $(this).remove(); });
       }
       else{
        changeErrorMessage("You shall not pass :-)");
      }
    });
  } else {
    console.log('logged out');
    if (!$.urlParam('token')) {
      changeErrorMessage('You are not logged in :-(');
    }
  }
});
//auth end
  // Vertical tabs
var billAmount = 0;
var loadingMenu = 0;
var admNo = 'BE00012314';
var menu = [];
var menu_count ;
var preRest = [];
var menIdt = 1;
var c_user_menu = [];
var trig = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var prices = [50,50,50,50,50,50,50,50,100,50,50,50,50,50,50,50,50,50,50,50];
var currentBal = 0;
var menuItems = document.getElementsByClassName('menuItems');
var priceTool = document.getElementsByClassName("priceTool");
var countback = 0;
//offline
setTimeout(function(){
  var connectedRef = firebase.database().ref(".info/connected");
  connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
      toast("Connection Established");
    } else {
      toast("Oh No! \n \
      You are no longer connected to the internet.");
    }
  });
},5000);
//database verification
firebase.database().ref('users/' + admNo).on('value', function(snapshot) {
  var userInfo = snapshot.val();
  if(userInfo) {
      if(!(snapshot.hasChild('name'))) {
        window.alert("Oops !  \n \
        Your name has not been properly added into our database \n \
        Please get in touch with school authorities");
      }

      if(!(snapshot.hasChild('balance'))) {
      window.alert("Oops ! \n \
       Your wallet money has not been properly configured into our database \n \
       Please get in touch with school authorities");
      }
      if(!(snapshot.hasChild('photo'))) {
      window.alert("Oops ! \n \
      Your profile pic has not been properly configured into our database \n \
      Please get in touch with school authorities");
      }
  } else {
    window.alert("Oops ! \n \
    You have not been registered with our database.\n \
    Please contact school autorities");
  }
});
firebase.database().ref('menu_count').once('value').then(function(snapshot){
   menu_count = snapshot.val();
});
function ehs() {
  firebase.database().ref().once('value').then( function(snapshot) {
          console.log(snapshot.val());
  });
}
$(document).ready(function(){
  $("#billAmount").text(billAmount);
  $('#currentWalletBal').text(currentBal);
  for(var i = 0; i < 20; i++){
    menuItems[i].innerHTML = "Loading..."
  }
  priceToolTip();
  if($(window).width() < 768){
    toast("Double Tap to select the menu options(If on iPhone)");
    setWalletBalanceDiv();
  }
});
function setWalletBalanceDiv(){
  $("#walletBalResp").remove();
  $("#lastRow").append("<div id = 'walletBalResp'><a data-toggle='tooltip' title='Wallet Balance'><div class = 'col-sm-1' id = 'currentBal'><span>₹</span><span id = 'currentWalletBal'></span></div></a></div>");
  setCurrentBal();
}
function priceToolTip(){
  var i = 0;
    $(".priceTool").each(function(){
      $(this).attr("title","₹"+prices[i]);
      i++;
  });
}
$(document).ready(function() {
  // Login user with token
  var token = $.urlParam('token');
  console.log('token:', token);
  if (token) {
    localStorage['customToken'] = token;
    history.replaceState({}, "DPSE Canteen", "/");
    firebase.auth().signInWithCustomToken(token).catch(function(err) {
      console.log(err);
    });
  }

  $('#parentVerticalTab').easyResponsiveTabs({
    type: 'vertical',
    width: 'auto',
    fit: true,
    closed: 'accordion',
    tabidentify: 'hor_1',
    activate: function() {
      var $tab = $(this);
      var $info = $('#nested-tabInfo2');
      var $name = $('span', $info);
      $name.text($tab.text());
      $info.show();
    }
  });

  // Switch horizontal tabs (under Whallet Topop)
  $(".tabs-menu a").click(function(){
    var $tab = $(this).attr("href");
    $(".tab-grid").not($tab).hide();
    $($tab).fadeIn("slow");
    return false
  });

  // Scroll from slider to content below
  // Scroll to top button
});



function signOut(){
  firebase.auth().signOut().then(function() {
  console.log('Signed Out');
}, function(error) {
  console.error('Sign Out Error', error);
});
    localStorage.removeItem('customToken');
  window.location.href = "http://api.dpscanteen.ml/entrar/login";

}


function updateMenu(){

  firebase.database().ref().child("menu").once("value").then(function(snapshot) {
    var i = 0;
    try {
    while(i < menu_count){
      snapshot.forEach(function(childSnapshot) {
        var menuItems = document.querySelectorAll('.menuItems');
        var childData = childSnapshot.val();
        menu[i] = childData;
          menuItems[i].innerHTML = childData;

        i++;
      });
}
    } catch(e) {
      console.log("There is no bug.");
    }
  });
}


// Firebase



var userRef = database.ref().child("users").child("BE00012314");

function setUser(){
  userRef.on('value', function(snapshot){
    var userInfo = snapshot.val();
    $('#studentName span').text(userInfo.name);
    $('#walletBal span').text(userInfo.balance+userInfo.menuBalance);
    $('#profileImage').attr('src', userInfo.photo);
    $('#admNumber span').text(adNo);
    currentBal = userInfo.balance+userInfo.menuBalance;
    setCurrentBal();
    $('#headerProfilePic').attr('src', userInfo.photo);
    $('#dropdownName').text(userInfo.name);
    $('#dropdownWallet span').text(userInfo.balance+userInfo.menuBalance);
  });
  var database = firebase.database();
}
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
function setCurrentBal(){
      $('#currentWalletBal').text(currentBal);
}

//On recharge btn click
function topUp(type) {
  toast("Redirecting to billing..");
  var admNo = $('#idNum').val();
  //For the menu
  if (type == 'menu') {
    var amount = billAmount;
    menIdt = 0;
    var restrictions = [];
    for(var i = 0; i < 20; i++){
      if(trig[i] == 1){
        c_user_menu[i] = menu[i];
        restrictions.push(menu[i]);
      }
    }
// menuitems array refining for data transafer
    var temp_menu = [];
    for(var x in c_user_menu) {
      if(c_user_menu[x] != " " && c_user_menu != null) {
        temp_menu.push(c_user_menu[x]);
      }
    }
      //sending to the billiing page
    var user_profile = {
      name: $('#studentName span').text(),
      id : $('#user_id').text(),
      TXN_AMOUNT: billAmount,
      type: type,
      menu_items: temp_menu,
    }
    console.log(user_profile);
    updateStats(user_profile["TXN_AMOUNT"],"menu",temp_menu);  
//menu end

//custom start
  } else  if (type == 'custom') {
    var wantedAmount = parseInt($('#customMon').val());
    if(wantedAmount < 10){
      toast("Too low of a denomination");
    }else if(wantedAmount >2000){
      toast("Too high of a denomination");
    }else{
      var amount = wantedAmount;
      var user_profile = {
        name: $('#studentName span').text(),
        id : $('#user_id').text(),
        TXN_AMOUNT: amount,
        type: type
      }
      console.log(user_profile);
       //increment stats
  updateStats(user_profile["TXN_AMOUNT"],"custom",null);  
    }
  //custom end
  } else {
    console.log("error");
  }

  //check if menu items have not been selcted
  if (!amount) {
    console.error('Food plan not selected or amount not entered');
    return
  }

//serializing obj and creating the parameters
    var str = "";
    for (var key in user_profile) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + user_profile[key];
    }
//  sending the link with the parameters
     window.location = "https://api.dpscanteen.ml/paytm?" + str;
}

function updateStats(amount,type,mi) {
  firebase.database().ref('stats_admin/general').once("value").then((snap) => {
     let  stats = snap.val();
     //handle visit counter
     let v = stats.visits;
     let i = v + 1;
     console.log(i);
     //handle total_revenue counter
     let r = stats.total_revenue;
     let ri = r + amount;
     //handle segregated revenue by moth and year 
     let date = new Date();
     let year = date.getFullYear().toString();
     var monthNames = ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"
    ];
    let month = monthNames[date.getMonth()];
    firebase.database().ref('stats_general').once("value").then((snap) => {
        var stats_general = snap.val();
        if(snap.hasChild(year)) {
            console.log("this");
        } else {
          firebase.database().ref(`stats_general/${year}/${month}`).set({
             revenue: amount
          });
        }
    });
    if(type == "menu") {
      console.log("menu");
        // menu items count 
        let menu_counter = {
          "Pani Puri": 0,
          "Rasgulla": 0,
          "Dosa":0,
          "Meals":0,
          "Chappati":0,
          "Noodles":0,
          "Chicken Dinner":0,
          "Burger":0,
          "Biriyani":0,
          "Fried Rice":0,
          "Ravai":0,
          "Ganesh":0,
          "Puri":0,
          "Chat":0,
          "Soup":0,
          "Soan Papadi":0,
          "Nuggets":0,
          "Veg Meals":0,
          "Crispers":0,
          "Chocolate Pudding":0
        };
        //taking count
        mi.forEach((item,index) => {
          menu_counter[item] = menu_counter[item] +1;
        });

      
        firebase.database().ref('stats_item').once("value").then((snap) => {
            var menu_items = snap.val();
            Object.keys(menu_items).map(function(key, index) {
              menu_items[key] += menu_counter[key];
           });
           firebase.database().ref('stats_item').set(menu_items);
           console.log(menu_items);
        });
       
     } //end menu stat handling 
   
   

     let updates = {};
     updates["stats_admin/general/visits"] =  i;
     updates["stats_admin/general/total_revenue"] = ri;
     firebase.database().ref().update(updates);
  });
}


function transUpdate(){
  var limit = parseInt($('#transPrec').val());
  database.ref('transactions').child(adNo).orderByChild('timestamp').limitToLast(limit).once('value').then(function(snapshot) {
    var html = '';
    snapshot.forEach(function(transaction) {
      var trans = transaction.val();
      var date = moment(trans.timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a');
      var row = `<tr><td>${date}</td>'+'<td>${trans.amount}</td>'+'<td>${trans.gateway}</td></tr>`;
      html = row + html;
    });
    $('#tranHist').html(html);
  });
}
function highlight(x, y){
  if(trig[y] == 0){
    $("#" + x).css("background-color", "#BCEBCB");
    //document.getElementById(x).style.backgroundColor = "#BCEBCB";
    billAmount += 50;
    $('#billAmount').text(billAmount);
    trig[y] = 1;
  }else if(trig[y] == 1){
    $("#" + x).css("background-color", "#8491A3");
    //document.getElementById(x).style.backgroundColor = "#8491A3";
    billAmount -= 50;
    $('#billAmount').text(billAmount);
    trig[y] = 0;
  }
}
function clearSelection(){
  for(var i = 0; i<20; i++){
    if(trig[i] == 1){
      menuItems[i].style.backgroundColor = "#8491A3";
      //document.getElementById(x).style.backgroundColor = "#BCEBCB";
      billAmount -= 50;
      $('#billAmount').text(billAmount);
      trig[i] = 0;
    }
  }
}

$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (!results) return ''
  return results[1] || 0;

}

//firebase offline handling
setTimeout(() => {
  var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    console.log("Connection with firebase live")
  } else {
    toast("Connection lost");
  }
});

},5000)


function toast(toast) {
  // Get the snackbar DIV
  $("#snackbar").html(toast);
  var x = document.getElementById("snackbar")

  // Add the "show" class to DIV
  x.className = "show";
  x.style.backgroundColor = "#333";
  x.style.color = "#fff";
  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
