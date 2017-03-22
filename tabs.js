function set_tab(current_tab){
	//set click css
	$(current_tab).css("background-color", "#ffffff");
	$(current_tab).css("border-bottom", "0");

	//set un-clicked css
	$(".tab").not(current_tab).css("background-color", "#deeff5");
	$(".tab").not(current_tab).css("border-bottom", "1px solid grey");

	//change tab content
	var tab_id = current_tab.id;
	var id = tab_id.substring(tab_id.indexOf("-")+1, tab_id.length);
	$(".tab-content-actual").hide();
	$("#content-"+id).show();
}

$(document).ready(function(){
	$(".tab").on("click", function(){
		set_tab(this);
	});
	set_tab($("#tab-1")[0]);
});