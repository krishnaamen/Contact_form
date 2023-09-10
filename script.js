const form = document.getElementById("contact-form");

form.addEventListener("submit",function(event){
   event.preventDefault();
   const sender_name = document.getElementById("name_id").value.trim();
   const sender_email = document.getElementById("email_id").value.trim();
   const sender_message = document.getElementById("message_id").value.trim();
   const pname = document.getElementById("pname");
   let messageToUser = "";


   // This function validates the email address 
   function Emailvalidator(text){
    var RegexValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (text.match(RegexValidator)) {
        const postionofAt = text.indexOf("@");
        const textafterAt = text.substr(postionofAt + 1).trim();
        if(textafterAt === "cphbusiness.dk"){
        //alert("Valid email address!");
         return true;

        }else{
            messageToUser = messageToUser + " CPH Business email is required";
            return false;

        }  
        }else{
            messageToUser = messageToUser + "  Invalid Email";
            return false;
        }
    }
// This function is to check if the day is friday or saturday or sunday
    function validateDate(){
        var days = ['Sun','Mon','Tues','Wed','Thrus','Fri','Sat'];
        const today = new Date().getDay();
        console.log(days[today]);

       return days[today];

    }



    if(Emailvalidator(sender_email) && sender_name.length>3 && sender_message.length>8){
       // alert(" Validate date is   "+validateDate())

        if(validateDate()!== "Fri" && validateDate()!== "Sat" && validateDate()!== "Sun"){
            const payload = {
                from_name: sender_name,
                email_id: sender_email,
                message: sender_message,
            }
            
        
                emailjs.send("service_507eq7m","template_6et3594",payload)
                                .then(function(res){
                                //alert("Email sent successfully"  + res.status);
        
                            })
    
    


        }else{
            messageToUser = `${messageToUser} , Date is weekend you can not send the contact form.`
        }

        }else{
        if(sender_message.length<8){
            messageToUser = messageToUser + " ,Message must have minimum 8 character long";
        } else if (sender_name.length<3){
            messageToUser = messageToUser + " ,user name should have at least 3 characters long";
        }else if (Emailvalidator(sender_email) === false){
            messageToUser = messageToUser + " ,valid cphbusiness email is required";
        }
       
    }
    
if(messageToUser.length > 0){
    pname.innerHTML = messageToUser;
}else{
    pname.innerHTML = "Message sent successfully";
    pname.style.color = "green";

}



                
})