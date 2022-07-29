exports.noteNewValid = function(params){

    let validator = new Object();
    validator.error = new Array();
    validator.status = true;

    if (!params.title){
        validator.status = false;
        validator.error.push({name:'title', message:"Please add a title"});
    }

    if (!params.description){
        validator.status = false;
        validator.error.push({name:'description', message:"Please add a description"});
    }

    /*if (!params.title){
        validator.status = false;
        validator.error.push({name:'title', message:"Please add a title"});
    }*/

    return validator;
}