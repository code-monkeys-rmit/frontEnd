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
	let cook = JSON.parse(readCookie(tutorLink));
	let name = 'x';
	let skype_id = 'y';
	let sessionID = '1';
    $('#done').click(()=>{
        $.get('/api/done/'+sessionID,(data)=>{
			if (data.confirm == 'true'){
				document.location.replace('../final/final.html');
			}
		})
    });
});
