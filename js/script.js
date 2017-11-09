<<<<<<< HEAD
var img = new Image();
var div = document.getElementById('profileImage');

function goToHome(){
  location.href = "index.html"
}
$(document).ready(function() {
  $("#tab2").hide();
  $("#tab3").hide();
  $("#tab4").hide();
  $(".tabs-menu a").click(function(event){
    event.preventDefault();
    var tab=$(this).attr("href");
    $(".tab-grid").not(tab).css("display","none");
    $(tab).fadeIn("slow");
  });
});

$(document).ready(function() {

  //Vertical Tab
=======
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

$(document).ready(function() {
  setTimeout(function(){
    $('#wrapper').fadeOut(function() { $(this).remove(); });
    $('#slideshow').fadeOut( function() { $(this).remove(); });
}, 1500);
  // Vertical tabs
>>>>>>> 139a4b34b63f977383bdc9b4cdaf5e9d769df5cf
  $('#parentVerticalTab').easyResponsiveTabs({
    type: 'vertical',
    width: 'auto',
    fit: true,
    closed: 'accordion',
    tabidentify: 'hor_1',
<<<<<<< HEAD
    activate: function(event) {
=======
    activate: function() {
>>>>>>> 139a4b34b63f977383bdc9b4cdaf5e9d769df5cf
      var $tab = $(this);
      var $info = $('#nested-tabInfo2');
      var $name = $('span', $info);
      $name.text($tab.text());
      $info.show();
    }
  });
<<<<<<< HEAD
});

//responsiveSlides

$(function () {
  $("#slider").responsiveSlides({
    auto: true,
    speed: 500,
    namespace: "callbacks",
    pager: true,
  });
});
img.onload = function() {
  div.appendChild(img);
}

$(document).ready(function () {
  var mySelect = $('#first-disabled2');

  $('#special').on('click', function () {
    mySelect.find('option:selected').prop('disabled', true);
    mySelect.selectpicker('refresh');
  });

  $('#special2').on('click', function () {
    mySelect.find('option:disabled').prop('disabled', false);
    mySelect.selectpicker('refresh');
  });

  $('#basic2').selectpicker({
    liveSearch: true,
    maxOptions: 1
  });
});

jQuery(document).ready(function($) {
  $(".scroll").click(function(event){
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);

  });
});
$(document).ready(function() {
  $().UItoTop({ easingType: 'easeOutQuart' });
});

//firebase
var screen = document.getElementById("options");
var userRef = firebase.database().ref().child("users").child("BE0001234");
var walletRef = userRef.child("balance");
var studentNameRef = userRef.child("name");
var studentIDRef = userRef.child("photo");
img.setAttribute("class", "img-responsive");

walletRef.on("value",function(snapshot) {
  var w_val = snapshot.val();
  var wval = document.getElementById("walletBal");
  wval.setAttribute("value", w_val);
});
studentNameRef.on("value", function(snapshot){
  var n_val = snapshot.val();
  var nameS = document.getElementById("studentName");
  nameS.setAttribute("value", n_val);
});
studentIDRef.on("value", function(snapshot){
  var id_val = snapshot.val();
  img.style.position = "relative";
  img.style.margin = "auto";
  img.style.width = "50%";
  img.style.height = "50%";
  img.style.webkitUserDrag = "none";
  img.style.msUserDrag = "none";
  img.style.mozUserDrag = "none";
  img.style.webkitUserSelect = "none";
  img.style.mozUserSelect = "none";
  img.style.msUserSelect = "none";
  img.classList.add("img-responsive");
  img.src = id_val;
});
var money = 0;
function topUpPre(){
  if(document.getElementById("idNum").value == ""){
      console.log("TF?");
  }else if(document.getElementById("idNum").value == "BE/00012314"){
    var ddl = document.getElementById("foodPlans");
    var selectedPlan = ddl.options[ddl.selectedIndex].value;
    if (selectedPlan == "day"){
      money += 50;
    }else if(selectedPlan == "week"){
      money += 250;
    }else if(selectedPlan == "month"){
      money += 1000;
    }else{
      $("#selectValue").modal("show");
    }

    walletRef.once("value",function(snapshot) {
      var w_val = snapshot.val();
      money += w_val;
    });
    console.log(money);
    walletRef.set(money);
  }
}
function topUp(){
  if(document.getElementById("idNum2").value == ""){
      console.log("TF?");
  }else if(document.getElementById("idNum2").value == "BE/00012314"){
    var customMon = document.getElementById("customMon");
    money = parseFloat(customMon.value);
    console.log(money);
    walletRef.on("value",function(snapshot) {
      var w_val = snapshot.val();
      money += w_val;
    });
    console.log(money);
    walletRef.set(money);
  }
}
function transUpdate(){
  var ddl = document.getElementById("transPrec");
  var query = firebase.database().ref().child("transactions").child("BE0001234");
  var selectedTrans = ddl.options[ddl.selectedIndex].value;
  if (selectedTrans == "day"){
    var trans = query.orderByChild("timestamp").limitToLast(1);
  }else if(selectedTrans == "ten"){
    var trans = query.orderByChild("timestamp").limitToLast(10);
  }else if(selectedTrans == "thirty"){
    var trans = query.orderByChild("timestamp").limitToLast(30);
  }else if(selectedTrans == "fifty"){
    var trans = query.orderByChild("timestamp").limitToLast(50);
  }else{
    $("#selectValue").modal("show");
  }
    document.getElementById("tranHist").innerHTML = "";
  trans.on("child_added", function(snap){
    var timestamp = snap.val().timestamp;
    var amount = snap.val().amount;
    var payment = snap.val().gateway;
    document.getElementById("tranHist").innerHTML += "<tr><td>"+timestamp+"</td>"+"<td>"+amount+"</td>"+"<td>"+payment+"</td>"+"</tr>";
    console.log(timestamp);
=======

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
var userRef = database.ref().child("users").child("BE0001234");

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
  var admNo = 'BE0001234';
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
>>>>>>> 139a4b34b63f977383bdc9b4cdaf5e9d769df5cf
  });
}
