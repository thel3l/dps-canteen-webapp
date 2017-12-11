//initializeApp
var config = {
  apiKey: "AIzaSyCas9WSzPdCvatx7ODWMTquCCwiuZEj-UI",
  authDomain: "dpsemca-1f00a.firebaseapp.com",
  databaseURL: "https://dpsemca-1f00a.firebaseio.com",
  projectId: "dpsemca-1f00a",
  storageBucket: "dpsemca-1f00a.appspot.com",
  messagingSenderId: "696186948502"
};
firebase.initializeApp(config);
var database = firebase.database();
var userRef, userInfo;
var adNo;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    adNo = user.uid;
    userRef = database.ref().child('users').child(user.uid);
    userRef.on('value', function(snap) {
      userInfo = snap.val();
      if(userInfo != null){
        console.log(adNo);
        userInfo['admid'] = snap.key;
        setUser(userInfo);
        $('#wrapper').fadeOut(function() { $(this).remove(); });
        $('#slideshow').fadeOut( function() { $(this).remove(); });
    }else{
      alert("Unregistered User");
    }
    });
  } else {
    console.log('logged out');
    if (!$.urlParam('token')) {
      alert('You are not logged in');
    }
  }
});

var billAmount = 0;
var loadingMenu = 0;
var admNo = 'BE00012314';
var menu = [];
var menu_count ;
var preRest = [];
var menIdt = 1;
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
      console.log("Firebase Connection established");
    } else {
      window.alert("Oh No! \n \
      You are no longer connected to the internet :-( \n \
      Plz refresh the page once you reconnect");
    }
  });
},2000);
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
    window.alert("Double Tap to select the menu options(If on iPhone)");
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

  // setTimeout(function(){
  //   $('#wrapper').fadeOut(function() { $(this).remove(); });
  //   $('#slideshow').fadeOut( function() { $(this).remove(); });
  // }, 1500);
  // Vertical tabs
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
  //Rithvik prepend not working...
  window.location.href = "http://api.dpscanteen.ml/entrar/login";
}


function updateMenu(){

  firebase.database().ref().child("menu").once("value").then(function(snapshot) {
    var i = 0;
    while(i < menu_count){
      snapshot.forEach(function(childSnapshot) {
        var menuItems = document.querySelectorAll('.menuItems');
        var childData = childSnapshot.val();
        menu[i] = childData;
        menuItems[i].innerHTML = childData;
        i++;
      });
}
  });
}


// Firebase



//var userRef = database.ref().child("users").child("BE00012314");

function setUser(){
  userRef.on('value', function(snapshot){
    var userInfo = snapshot.val();
    $('#studentName span').text(userInfo.name);
    $('#walletBal span').text(userInfo.balance);
    $('#profileImage').attr('src', userInfo.photo);
    $('#admNumber span').text(adNo);
    currentBal = userInfo.balance;
    setCurrentBal();
    $('#headerProfilePic').attr('src', userInfo.photo);
    $('#dropdownName').text(userInfo.name);
    $('#dropdownWallet span').text(userInfo.balance);
  });
  var database = firebase.database();
  var restRef = database.ref('users/'+adNo+'/items_bought');
  // Update student info
  restRef.once("value").then(function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      preRest.push(childData);
  });
});
}
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
function setCurrentBal(){
      $('#currentWalletBal').text(currentBal);
}
function topUp(type) {
  var admNo = $('#idNum').val();
  if (type == 'menu') {
    var amount = billAmount;
    console.log(amount);
    menIdt = 0;
    var restrictions = [];
    for(var i = 0; i < 20; i++){
      if(trig[i] == 1){
        restrictions.push(menu[i]);
      }
    }
  } else  if (type == 'custom') {
    var wantedAmount = parseInt($('#customMon').val());
    if(wantedAmount < 10){
      window.alert("Too low of a denomination");
    }else if(wantedAmount >2000){
      window.alert("Too high of a denomination");
    }else{
    var amount = wantedAmount;
    }
  }
  if (!amount) {
    console.error('Food plan not selected or amount not entered');
    return
  }
  if(menIdt == 0){
    var restRef = database.ref('users/'+adNo+'/items_bought');
    restRef.transaction(function(){
      var restriction = preRest.concat(restrictions);
      return restriction
    });
  }
  userRef.child('balance').transaction(function(balance) {
    console.log("i happpen");
    return balance + amount
  }).then(function() {
    window.alert('Recharge successful');

  });
}

function transUpdate(){
  var limit = parseInt($('#transPrec').val());
  database.ref('transactions').child(userInfo.admid).orderByChild('timestamp').limitToLast(limit).once('value').then(function(snapshot) {
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
