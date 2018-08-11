$('#done').click(()=>{
    $.get('/api/done/'+sessionID)
});