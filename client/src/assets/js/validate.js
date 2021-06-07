

export const validate = (info,validation,setValidation) => {
       
    let newValidate= validation;

    for (const key in info) {
        
        if (key.toString() === "email") {

            const regexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            let valid = regexp.test(info[key]);
            newValidate[key]=valid
           
        }
        else if(key.toString==="password"){

            const regexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            let valid = regexp.test(info[key]);
            newValidate[key]=valid
        }
        else {

            const regexp = /^[A-Za-z0-9_]{5,25}$/;
            let valid = regexp.test(info[key]);
            newValidate[key]=valid
            
           
        }
        
    }
    setValidation(newValidate);

    


}


