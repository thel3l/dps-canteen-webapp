        
        //printing out initial value
        var fvalue = firebase.database().ref().child('User1').child('Wallet');
           fvalue.on('value',function(snapshott) {
             var sm1 = document.getElementById('screen');
             sm1.innerHTML = snapshott.val() ;
           });
        //incrementing new one
        function submit() {
        var ref = firebase.database().ref().child('User1').child('Wallet');
        ref.on('value',function(datasnap) {
         var output = document.getElementById('screen');
         var input = parseInt(document.getElementById('input').value,10);
         console.log("The txt field" + input);
         console.log(typeof input);
         var up_val =  parseInt(datasnap.val()) ;
         console.log(up_val);
         console.log(typeof up_val);
         var result = up_val + input;
         console.log(result);
         console.log(typeof result);
          final = result.toString();
         console.log(final);
         console.log(typeof final)
         output.innerHTML =  datasnap.val() ;
        });
        
        if(isNaN(final)) {        
             window.alert("Input a value");
        }
        else {
        var fref = firebase.database().ref().child('User1').child('Wallet');
        fref.set(final);
        }
    }