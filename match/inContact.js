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
$(document).ready(()=>{
	let cook = JSON.parse(readCookie('tutorLink'));
	let name = cook.tutor.user.name;
    console.log(cook);
	let skype_id = cook.tutor.user.skype_user;
	let sessionID = cook.chat_session.id;
	$('#userName').html(name);
	$('#skypeCall').data('contact-id',skype_id);
    $('#done').click(()=>{
        $.post('http://localhost:3000/api/end_session','id='+sessionID,(data)=>{
			document.location.replace('../final/final.html');
		},'jsonp')
    });
});
