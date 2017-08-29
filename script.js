    //sign in page
    document.getElementById("adminCheck").onclick= function(){
        portalConnect()
    };
    function portalConnect(){
        window.location.href = "dpsecanteen.html"
    }
    //main dpse canteen portal
    function options(){
        var menu = document.getElementById('options');
        menu.innerHTML = "<ul><li><a href='topup.html' target='screen' onclick='st_info()'>Wallet Topup</a></li><li><a href='transactionhistory.html' target='screen' onclick='st_info()'>Transaction <br> History</a></li><li><a href='menu.html' target='screen' onclick='st_info()'>Menu</a></li></ul>";
        menu.style = "color: #45922A;font-family:'Tangerine','Comic Sans MS','Sans Serif';font-size: 50px;padding-left:10px;";
    }
    function st_info(){
        var img = new Image();
        var div = document.getElementById('options');
        img.onload = function() {
            div.appendChild(img);
        }
        var screen = document.getElementById("options");
        var userRef = firebase.database().ref().child("users").child("BE0001234");
        var walletRef = userRef.child("balance");
        var studentNameRef = userRef.child("name");
        var studentIDRef = userRef.child("photo");
        screen.innerHTML = "<br><span id='info'><p>Name: <span id = 'studentName'></span> <br> Section: XI <br>Wallet-Balance: <span id = 'wval'></span><br>*Sample Data<br><br><br><br><a href='javascript:void(0);' onclick='options();'>Back To dashboard</a></p><span>";
        screen.style = "font-size:20px;";
        img.style = "height:200px;width:200px;position:absolute;top:115px;left:25px;";
        walletRef.on("value",function(snapshot) {
            w_val = snapshot.val();
            console.log(w_val);
            var wval = document.getElementById("wval");
            wval.innerHTML = w_val;
        });
        studentNameRef.on("value", function(snapshot){
            n_val = snapshot.val();
            var nameS = document.getElementById("studentName");
            nameS.innerHTML = n_val;
        });
        studentIDRef.on("value", function(snapshot){
            id_val = snapshot.val();
            img.src = id_val; 
        }); 
    }
