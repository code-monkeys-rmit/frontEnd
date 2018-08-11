const reqID = null;
const userID = 12353;
$('#ready').click(()=>{
    let UserID = 189213;
    let postURL = '/api/tutorReady/'+userID;
    $.get(postURL,(data) => {
        reqID = data.requestId;
        let popUp = "<div class='popup' id='reqPopup'><h2>You have a request</h2><div class='userInfo'>"+data.userName+"</div><div class='userInfo>"+data.subject+"</div><div class='userInfo'>"+data.desc+"</div><div><button class='btn btn-secondary' id='accept'>Accept</button><button class='btn btn-secondary' id='decline'>Decline</button></div></div>";
        $('#contentWrapper').append(popUp);
    });
});

function hide() {
    var div = document.getElementyById('buttonB');
    div.style.display = 'none';
}

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
$('#accept').click(()=>{
    $.get('/api/acceptReq?req='+reqID+'&userID='+userID);
});

$('#decline').click(()=>{
    $('#reqPopup').remove();
});
