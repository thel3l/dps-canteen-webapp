<<<<<<< HEAD
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
=======
//initializeApp
>>>>>>> 92cede5b73e897ee22bec8590e1e7855ef9eecd4
var config = {
  apiKey: "AIzaSyCas9WSzPdCvatx7ODWMTquCCwiuZEj-UI",
  authDomain: "dpsemca-1f00a.firebaseapp.com",
  databaseURL: "https://dpsemca-1f00a.firebaseio.com",
  projectId: "dpsemca-1f00a",
  storageBucket: "dpsemca-1f00a.appspot.com",
  messagingSenderId: "696186948502"
<<<<<<< HEAD
};
firebase.initializeApp(config);

$(document).ready(function() {
  setTimeout(function(){
    $('#wrapper').fadeOut(function() { $(this).remove(); });
    $('#slideshow').fadeOut( function() { $(this).remove(); });
}, 1500);
  // Vertical tabs
>>>>>>> 139a4b34b63f977383bdc9b4cdaf5e9d769df5cf
=======
}
firebase.initializeApp(config);
var database = firebase.database();
var userRef, userInfo;
var adNo = 'BE00012314';
//start dev code
// setTimeout(function(){
//     $('#wrapper').fadeOut(function() { $(this).remove(); });
//     $('#slideshow').fadeOut( function() { $(this).remove(); });
//   }, 1500);

//end dev code
/*firebase.auth().onAuthStateChanged(function(user) {
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
<<<<<<< HEAD
});
  setTimeout(function(){
     $('#wrapper').fadeOut(function() { $(this).remove(); });
     $('#slideshow').fadeOut( function() { $(this).remove(); });
  }, 1500);
  // Vertical tabs
=======
});*/

>>>>>>> parent of 165b3eb... LEssgo
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

<<<<<<< HEAD
>>>>>>> 92cede5b73e897ee22bec8590e1e7855ef9eecd4
=======

  // Vertical tabs
>>>>>>> parent of 165b3eb... LEssgo
  $('#parentVerticalTab').easyResponsiveTabs({
    type: 'vertical',
    width: 'auto',
    fit: true,
    closed: 'accordion',
    tabidentify: 'hor_1',
<<<<<<< HEAD
<<<<<<< HEAD
    activate: function(event) {
=======
    activate: function() {
>>>>>>> 139a4b34b63f977383bdc9b4cdaf5e9d769df5cf
=======
    activate: function() {
>>>>>>> 92cede5b73e897ee22bec8590e1e7855ef9eecd4
      var $tab = $(this);
      var $info = $('#nested-tabInfo2');
      var $name = $('span', $info);
      $name.text($tab.text());
      $info.show();
    }
  });
<<<<<<< HEAD
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
=======

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
<<<<<<< HEAD
  firebase.auth().signOut().then(function() {
  console.log('Signed Out');
}, function(error) {
  console.error('Sign Out Error', error);
});
    localStorage.removeItem('customToken');
  window.location.href = "http://api.dpscanteen.ml/entrar/login";

=======
  //Rithvik prepend not working...
  window.location.href = "http://api.dpscanteen.ml/entrar/login";
>>>>>>> parent of 165b3eb... LEssgo
}


function updateMenu(){

  firebase.database().ref().child("menu").once("value").then(function(snapshot) {
    var i = 0;
    while(i < menu_count){
      snapshot.forEach(function(childSnapshot) {
        var menuItems = document.querySelectorAll('.menuItems');
        var childData = childSnapshot.val();
        menu[i] = childData;
<<<<<<< HEAD
          menuItems[i].innerHTML = childData;
      
=======
        menuItems[i].innerHTML = childData;
>>>>>>> parent of 165b3eb... LEssgo
        i++;
      });
}
  });
}


// Firebase



<<<<<<< HEAD
var userRef = database.ref().child("users").child("BE00012314");
=======
//var userRef = database.ref().child("users").child("BE00012314");
>>>>>>> parent of 165b3eb... LEssgo

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
  getPreRest();
}
function getPreRest(){
  var restRef = database.ref('users/'+adNo+'/items_bought');
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
    menIdt = 0;
    var restrictions = [];
    for(var i = 0; i < 20; i++){
      if(trig[i] == 1){
        c_user_menu[i] = menu[i];
        restrictions.push(menu[i]);
      }
    }
  } else  if (type == 'custom') {
    var wantedAmount = parseInt($('#customMon').val());
    if(wantedAmount < 10){
      toast("Too low of a denomination");
    }else if(wantedAmount >2000){
      toast("Too high of a denomination");
    }else{
    var amount = wantedAmount;
    }
>>>>>>> 92cede5b73e897ee22bec8590e1e7855ef9eecd4
  }
  if (!amount) {
    console.error('Food plan not selected or amount not entered');
    return
  }
<<<<<<< HEAD
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
=======
  if(menIdt == 0){
    var restRef = database.ref('users/'+adNo+'/items_bought');
    restRef.transaction(function(){
      var restriction = preRest.concat(restrictions);
      return restriction
    });
<<<<<<< HEAD

        firebase.database().ref('users/'+adNo+'/menuBalance').transaction(function(menuBalance) {
          return menuBalance + amount
        }).then(function() {
          preRest.length = 0;
          toast('Recharge successful');
          clearSelection();
          getPreRest();
        });
       }else{
       firebase.database().ref('users/'+adNo+'/balance').transaction(function(balance) {
        console.log("i happpen");
        return balance + amount
      }).then(function() {
        toast('Recharge successful');
        });
      }
    
   
  var obj = {
   name: "sampleboi",
   id: 1234,
   array: ["this works","hopefully"]
  }
  console.log(obj);
  //redirects to billing
  //userprofile

    userRef.child('menuBalance').transaction(function(menuBalance) {
      return menuBalance + amount
    }).then(function() {
      //sending to the billiing page 

=======
    userRef.child('menuBalance').transaction(function(menuBalance) {
      return menuBalance + amount
    }).then(function() {
      //sending to the billiing page
>>>>>>> parent of 165b3eb... LEssgo
   var user_profile = {
    name: document.getElementById("studentName").value,
    id: adNo,
    bill: billAmount,
    type: type, 
    menu_items: c_user_menu,
 }
 console.log(user_profile);
//serializing obj and creting the parameters
 var str = "";
 for (var key in user_profile) {
     if (str != "") {
         str += "&";
     }
     str += key + "=" + encodeURIComponent(obj[key]);
 }
 //sending the link with the parameters
 window.location = "https://api.dpscanteen.ml/paytm?" + str;
      preRest.length = 0;
      toast('Recharge successful');
      clearSelection();
      getPreRest();
    });
  }else{
  userRef.child('balance').transaction(function(balance) {
    console.log("i happpen");
    return balance + amount
  }).then(function() {
    toast('Recharge successful');

<<<<<<< HEAD
      preRest.length = 0;
      toast('Recharge successful');
      clearSelection();
      getPreRest();
    });
  }else{
  userRef.child('balance').transaction(function(balance) {
    console.log("i happpen");
    return balance + amount
  }).then(function() {
    toast('Recharge successful');

  });
}

=======
  });
}
>>>>>>> parent of 165b3eb... LEssgo


}

function transUpdate(){
  var limit = parseInt($('#transPrec').val());
  database.ref('transactions').child(adNo).orderByChild('timestamp').limitToLast(limit).once('value').then(function(snapshot) {
>>>>>>> 92cede5b73e897ee22bec8590e1e7855ef9eecd4
    var html = '';
    snapshot.forEach(function(transaction) {
      var trans = transaction.val();
      var date = moment(trans.timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a');
      var row = `<tr><td>${date}</td>'+'<td>${trans.amount}</td>'+'<td>${trans.gateway}</td></tr>`;
<<<<<<< HEAD
      html += row;
    });
    $('#tranHist').html(html);
>>>>>>> 139a4b34b63f977383bdc9b4cdaf5e9d769df5cf
  });
}
=======
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
<<<<<<< HEAD

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


=======
>>>>>>> parent of 165b3eb... LEssgo
function toast(toast) {
    // Get the snackbar DIV
    $("#snackbar").html(toast);
    var x = document.getElementById("snackbar")

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


>>>>>>> 92cede5b73e897ee22bec8590e1e7855ef9eecd4
