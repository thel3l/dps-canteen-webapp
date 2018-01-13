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
window.addEventListener("load",main);
window.addEventListener("scroll",debug);
var globalID ;
var color = 1 ;
function main() {

}
function fadeOut(element){
 var opacity = 1;
 while(opacity !=0 ) {
    opacity = opacity - 0.1;

 }
}
function debug() {
	window.alert("This works");
}
$(document).ready(function() {
  if(document.body.scrollTop = 35){
    console.log("Hello World!")
  }
  //Vertical Tab
  $('#parentVerticalTab').easyResponsiveTabs({
    type: 'vertical',
    width: 'auto',
    fit: true,
    closed: 'accordion',
    tabidentify: 'hor_1',
    activate: function(event) {
      var $tab = $(this);
      var $info = $('#nested-tabInfo2');
      var $name = $('span', $info);
      $name.text($tab.text());
      $info.show();
    }
  });
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

    walletRef.on("value",function(snapshot) {
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
