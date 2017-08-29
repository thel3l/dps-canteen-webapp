 //sign in page
 document.getElementById("adminCheck").onclick= function(){portalConnect()};


 function portalConnect(){
    window.location.href = "dpsecanteen.html"
 }
 //main dpse canteen portal
 function options() {
     var menu=document.getElementById('options');
     menu.innerHTML = "<ul><li><a href='topup.html' target='screen' onclick='st_info()'>Wallet Topup</a></li><li><a href='transactionhistory.html' target='screen' onclick='st_info()'>Transaction <br> History</a></li><li><a href='menu.html' target='screen' onclick='st_info()'>Menu</a></li></ul>";
     menu.style = "color: #45922A;font-family:'Tangerine','Comic Sans MS','Sans Serif';font-size: 50px;padding-left:10px;";
 }
 function st_info() {
     var img = new Image();
     var div = document.getElementById('options');
     img.onload = function() {
     div.appendChild(img);
     }
img.src ="http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/A-G/gray-wolf-closeup.adapt.945.1.jpg";
img.style = "height:200px;width:200px;position:absolute;top:115px;left:25px;";

    var screen = document.getElementById("options");
    screen.innerHTML = "<br><span id='info'><p>Name:Gokul.J.kurup <br> Section: XI <br>Wallet-Balance: 1234<br>*Sample Data<br><br><br><br><a href='javascript:void(0);' onclick='options();'>Back To dashboard</a></p><span>";
    screen.style = "font-size:20px;";
 }