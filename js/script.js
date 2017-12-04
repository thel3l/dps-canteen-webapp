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
var trig = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


$(document).ready(function() {
  setTimeout(function(){
    $('#wrapper').fadeOut(function() { $(this).detach(); });
    $('#slideshow').fadeOut( function() { $(this).detach(); });
}, 1500);
  // Vertical tabs
  $("#billAmount").text(billAmount);
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
}



// Firebase
var database = firebase.database();
var userRef = database.ref().child("users").child("BE00012314");

// Update student info
userRef.on('value', function(snapshot) {
  var userInfo = snapshot.val();
  $('#studentName span').text(userInfo.name);
  $('#walletBal span').text(userInfo.balance);
  $('#profileImage').attr('src', userInfo.photo);
  $('#currentWalletBal span').text(userInfo.balance);
  $('#headerProfilePic').attr('src', userInfo.photo);
  $('#dropdownName').text(userInfo.name);
  $('#dropdownWallet span').text(userInfo.balance);
});
function topUp(type) {
  var admNo = $('#idNum').val();
  if (type == 'package') {
    var amount = parseInt($('#foodPlans').val());
  } else  if (type == 'custom') {
    var amount = parseInt($('#customMon').val());
  }
  if (!admNo) {
    console.error('Empty admission number');
    return
  }
  if (!amount) {
    console.error('Food plan not selected or amount not entered');
    return
  }
  userRef.child('balance').transaction(function(balance) {
    return balance + amount
  }).then(function() {
    console.log('Recharge successful');
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
    document.getElementById(x).style.backgroundColor = "#BCEBCB";
    billAmount += 50;
    $('#billAmount').text(billAmount);
    trig[y] = 1;
  }else if(trig[y] == 1){
    document.getElementById(x).style.backgroundColor = "#8491A3";
    billAmount -= 50;
    $('#billAmount').text(billAmount);
    trig[y] = 0;
  }
}
