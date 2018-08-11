

/*form key
	course_name
	description
	fileUpload
*/

$(function(){
	$('#search').click(()=>{
	    let popUp = "<div class='popup'><h2>Searching for your tutor</h2><div class='loader'>Loading...</div></div>";
		$('#contentWrapper').append(popUp);
	});
});

