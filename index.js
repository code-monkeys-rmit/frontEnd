function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function footerAlign() {
	$("footer").css("display", "block");
	$("footer").css("height", "auto");
	var footerHeight = $("footer").outerHeight();
	$("body").css("padding-bottom", footerHeight);
	$("footer").css("height", footerHeight);
}
$(document).ready(()=>{
	footerAlign();
	$('#search').click(()=>{
	    let popUp = "<div class='popup'><h2 id='statusText'>Searching for your tutor</h2><div class='loader'>Loading...</div></div>";
		$('#contentWrapper').append(popUp);
		$.post('/api/reqPost',($('#userform').serialize() + '&student_id=3'),(data)=>{
			$('#statusText').html('Tutor Found!<br>Redirecting...');
			createCookie(tutorLink, data);
			setTimeout(()=>{document.location.replace('redirect.html') }, 3000);
		})
	});
});

