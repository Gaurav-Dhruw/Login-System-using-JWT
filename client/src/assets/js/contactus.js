export const validate = (info,validation,setValidation) => {
       
    let newValidate= validation;

    for (const key in info) {
        
        if (key.toString() === "email") {

            const regexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            let valid = regexp.test(info[key]);
            console.log(`Inside`, key, valid);
            newValidate[key]=valid
           
        }
        else {

            const regexp = /^[A-Za-z0-9_]{5,25}$/;
            let valid = regexp.test(info[key]);
            console.log(`Inside`, key, valid)
            newValidate[key]=valid
            
           
        }
        
    }
    setValidation(newValidate);

    


}


export const contactStatus=(status)=>{
    let elem= document.querySelector(".msg-status");
    if(status){
        elem.innerText= "Message sent successfully";
        elem.className+=" msg-success";

    }

    else{
        elem.innerText= "Message not sent";
        elem.className +=" msg-failure";

    }
    setTimeout(()=>{
        elem.innerText=""
        elem=null;
            
    },4000)


}

export const warning=(status)=>{

    for(let key in status){
        console.log("inside warning loop",status)
        
        if (!status[key]) {
            console.log(status[key], key)
                document.getElementById(`contact_${key}_warning`).style.display="block";
                document.getElementById(`${key}`).addEventListener("focus",()=>{
                    document.getElementById(`contact_${key}_warning`).style.display = "none";
                })
            }
        } 
   


}