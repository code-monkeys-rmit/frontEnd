$(document).ready(()=>{
    
    footerAlign();
    
    
});

function footerAlign() {
	$("footer").css("display", "block");
	$("footer").css("height", "auto");
	var footerHeight = $("footer").outerHeight();
	$("body").css("padding-bottom", footerHeight);
	$("footer").css("height", footerHeight);
}