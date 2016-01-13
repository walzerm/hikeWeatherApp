var validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var isEmpty = function(string) {
    return string.length === 0;
}

var emailValidator = function(email) {
    var errorMessage = "";
    var emailValid = {valid:true, errors:[]};


    if (!isEmpty(email)) {
        if(!validateEmail(email)){
            emailValid.valid = false;
            errorMessage = 'Dear Idiot: Do you not have hands? Can you not type? That email is invalid.';
            emailValid.errors.push(errorMessage);
        }

    }
    else{
        emailValid.valid = false;
        errorMessage = 'Did the cat eat your tongue? Please follow email direction this time.';
        emailValid.errors.push(errorMessage);
    }

    return emailValid;
}

var passwordValidator = function(password, passwordConfirm) {
    var errorMessage = "";
    var passValid = {valid: true, errors: []};

    if (!isEmpty(password)) {
        if (password !== passwordConfirm) {
            passValid.valid = false;
            errorMessage = 'They dont match. Like your socks. And your soul.'

        } 
        else if (password.length < 8) {
            passValid.valid = false;
            errorMessage = 'You belong in preschool, where they teach you to count.'
            passValid.errors.push(errorMessage);
        }
    }
    else{
        passValid.valid = false;
        errorMessage = 'Did the cat eat your tongue? Please follow password direction this time.';
        passValid.errors.push(errorMessage);
    }

    return passValid;
}

var ErrorGenerator = function(user){
    var errors = [];

    var email_Validator = emailValidator(user.email);
    var password_Validator = passwordValidator(user.password,user.passwordConfirm);

    if(email_Validator.valid && (password_Validator.valid)){
        errors = [];
    }
    else{
        errors = email_Validator.errors.concat(password_Validator.errors);
    }


    return errors;
}

module.exports = {error: ErrorGenerator};