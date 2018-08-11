//is session active checker
let activeCheck = setInterval(()=>{
    let sessionID = 1;
    let getURL = '/api/sessionCheck/'+sessionID;
    $.get(getURL,(data)=>{
        if (data ==='finished'){
            //redirect
        }
    });  
}, 20000)
