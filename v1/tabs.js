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

	//load and layout buttons
	$.ajax({
		url: "buttons.json",
		success: function(tabs){
			//alert(JSON.stringify(json));

			var html = "";
			$.each(tabs, function(){
				//alert(JSON.stringify(this.buttons));
				html_tab = '<div class="tab" id="tab-5"><span class="tab-text">'+this.tab+'</span></div>';
				var html_buttons = "";
				$.each(this.buttons, function(){
					//generates button html
					html_buttons += '<div class="button resizable draggable"><div class="drop-zone"></div><span class="button-text">'+this.name+'</span></div>';
				});
				html_content = '<div id="content-5" class="tab-content-actual">'+html_buttons+'</div>';
				//append to html
				$(".menu-tabs").append(html_tab);
				$(".tab-content").append(html_content);
			});

			//$(".tab-content").html(data)
		}
	});
});
