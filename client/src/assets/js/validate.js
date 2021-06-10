

export const validate = (info,validation,setValidation) => {
       
    let newValidate= validation;
    // console.log(newValidate);
    // console.log(info);
   

    for (const key in info) {
        
        if (key.toString() === "email") {

            // console.log("inside email")

            const regexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            let valid = regexp.test(info[key]);
            newValidate[key]=valid
           
        }
        else if(key.toString()==="password"){

            // 
            // console.log("inside password")

            const regexp = /^[A-Za-z\d@$!%*#?&]{8,}$/;
            let valid = regexp.test(info[key]);
            // console.log(valid);
            newValidate[key]=valid;

  
        }

        else if(key.toString()==="loginPassword"){
            // console.log("inside loginPassword")

            if(info[key] || info[key]==""){
                const regexp = /^(\s*)$/;
    
                let valid = regexp.test(info[key]) ;
                // console.log("inside valid ", valid)
                newValidate.password=!valid;
            }    
            
    }
        else {
            // console.log("inside else")


            const regexp = /^[A-Za-z0-9_]{5,60}$/;
            let valid = regexp.test(info[key]);
            newValidate[key]=valid
            
           
        }
        
    }
    delete newValidate.loginPassword;
    setValidation(newValidate);

    


}


