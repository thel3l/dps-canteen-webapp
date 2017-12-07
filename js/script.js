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

var billAmount = 0;
var loadingMenu = 0;
var menu = [];
var preRest = [];
var menIdt = 1;
var trig = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var prices = [50,50,50,50,50,50,50,50,100,50,50,50,50,50,50,50,50,50,50,50];
var currentBal = 0;
var menuItems = document.getElementsByClassName("menuItems");
var priceTool = document.getElementsByClassName("priceTool");
$(document).ready(function(){
  $("#billAmount").text(billAmount);
  $('#currentWalletBal').text(currentBal);
  for(var i = 0; i < 20; i++){
    menuItems[i].innerHTML = "Loading..."
  }
  priceToolTip();
});
function priceToolTip(){
  var i = 0;
    $(".priceTool").each(function(){
      $(this).attr("title",prices[i]);
      i++;
  });
}
$(document).ready(function() {
  setTimeout(function(){
    $('#wrapper').fadeOut(function() { $(this).detach(); });
    $('#slideshow').fadeOut( function() { $(this).detach(); });
}, 1500);
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

//signOut

function signOut(){
  //Rithvik prepend not working...
  console.log("Hello");
  $("#theBody").html("Sign Out Successful");
}


function updateMenu(){
  firebase.database().ref().child("menu").once("value").then(function(snapshot) {
    var i = 0;
    console.log("hello world");
    while(i < 20){
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        menu[i] = childData;
        menuItems[i].innerHTML = childData;
        i++;
});
}

  });
}
// Firebase
var database = firebase.database();
var userRef = database.ref().child("users").child("BE00012314");
var restRef = database.ref().child("users").child("BE00012314").child("restrictions");
// Update student info
restRef.once("value").then(function(snapshot){
  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    preRest.push(childData);
});
});
userRef.on('value', function(snapshot){
  var userInfo = snapshot.val();
  $('#studentName span').text(userInfo.name);
  $('#walletBal span').text(userInfo.balance);
  $('#profileImage').attr('src', userInfo.photo);
  currentBal = userInfo.balance;
  setCurrentBal();
  $('#headerProfilePic').attr('src', userInfo.photo);
  $('#dropdownName').text(userInfo.name);
  $('#dropdownWallet span').text(userInfo.balance);
});
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
    userRef.child("restrictions").transaction(function(){
      var restriction = preRest.concat(restrictions);
      return restriction
    });
  }
  userRef.child('balance').transaction(function(balance) {
    return balance + amount
  }).then(function() {
    window.alert('Recharge successful');

  });
}

function transUpdate(){
  var admNo = 'BE00012314';
  var limit = parseInt($('#transPrec').val());

  database.ref('transactions').child(admNo).orderByChild('timestamp').limitToLast(limit).once('value').then(function(snapshot) {
    var html = '';
    snapshot.forEach(function(transaction) {
      var trans = transaction.val();
      var date = moment(trans.timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a');
      var row = `<tr><td>${date}</td>'+'<td>${trans.amount}</td>'+'<td>${trans.gateway}</td></tr>`;
      html += row;
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
