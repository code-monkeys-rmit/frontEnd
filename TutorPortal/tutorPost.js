const reqID = null;
const userID = 12353;

function footerAlign() {
	$("footer").css("display", "block");
	$("footer").css("height", "auto");
	var footerHeight = $("footer").outerHeight();
	$("body").css("padding-bottom", footerHeight);
	$("footer").css("height", footerHeight);
}

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

$(function(){

    $("#bigButn").click(function(event) {
        $(this).prop("disabled", true);
        $("#tutHead").hide('slow/400/fast', function() {
          
        });
        var txtSearch = '<h3 class="text-primary">Searching for student...</h3>';
        var imgSearch = '<img id="imgloading" src="../media/loading.gif" height="80" width="80" align="center">';
        var txtWarning = '<h3 class="text-warning">Please do not close this window</h3>'
        $("#divImgLoading").append(txtSearch+imgSearch+txtWarning);
    });
});

function onSearchingEnd(){
        var txtSearch = '<h3 class="text-primary">Searching for student...</h3>';
        var imgSearch = '<img id="imgloading" src="../media/loading.gif" height="80" width="80" align="center">';
        $("#divImgLoading").prepend(txtSearch+imgSearch);
}

$(document).ready(()=>{
    footerAlign();
})