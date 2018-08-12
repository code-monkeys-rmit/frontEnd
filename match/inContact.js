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
	let cook = JSON.parse(readCookie('tutorLink'));
	console.log(cook);
	let name = cook.tutor.user.name;
	let skype_id = 'abir.ishtiaque';
	let sessionID = cook.chat_session.id;
	$('#skypeCall').data('contact-id',skype_id);
    $('#done').click(()=>{
        $.post('http://backend-dev.ap-southeast-2.elasticbeanstalk.com/api/end_session','id='+sessionID,(data)=>{
			document.location.replace('../final/final.html');
		},'jsonp')
    });
});
