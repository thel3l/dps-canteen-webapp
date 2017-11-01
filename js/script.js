// Initialize Firebase
var config = {
  apiKey: "AIzaSyCas9WSzPdCvatx7ODWMTquCCwiuZEj-UI",
  authDomain: "dpsemca-1f00a.firebaseapp.com",
  databaseURL: "https://dpsemca-1f00a.firebaseio.com",
  projectId: "dpsemca-1f00a",
  storageBucket: "dpsemca-1f00a.appspot.com",
  messagingSenderId: "696186948502"
};
firebase.initializeApp(config);

$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (!results) return ''
  return results[1] || 0;
}

$(document).ready(function() {

  var token = $.urlParam('token');
  console.log('token:', token);
  if (token) {
    localStorage['customToken'] = token;
    history.replaceState({}, "DPSE Canteen", "/");
  }

  setTimeout(function(){
    $('#wrapper').fadeOut(function() { $(this).remove(); });
    $('#slideshow').fadeOut( function() { $(this).remove(); });
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
  $(".scroll").click(function(){
      $('html, body').animate({
          scrollTop: $( $(this).attr('href') ).offset().top
      }, 500);
      return false;
  });

  // Scroll to top button
  $('#scrollToTop').click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

});

// Firebase
var database = firebase.database();
var userRef = database.ref().child("users").child("BE00012314");

// Update student info
userRef.on('value', function(snapshot) {
  var userInfo = snapshot.val();
  $('#studentName span').text(userInfo.name);
  $('#walletBal span').text(userInfo.balance);
  $('#profileImage').attr('src', userInfo.photo);
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
