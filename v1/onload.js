
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
	//load and layout buttons absolute
	$.ajax({
		url: "buttons.json",
		success: function(tabs){
			//alert(JSON.stringify(json));

			var html = "";
			var margin = 10;
			var menu_width = 500;
			var button_height = 80;
			var tab_index = 1;
			$.each(tabs, function(){
				//alert(JSON.stringify(this.buttons));
				html_tab = '<div class="tab" id="tab-'+tab_index+'"><span class="tab-text">'+this.tab+'</span></div>';
				var top = margin;
				var left = margin;
				var html_buttons = "";
				$.each(this.buttons, function(){
					//generates button html
					var button_width = parseInt(this.width); 
					var position_css = 'left:'+left+';top:'+top+';';
					html_buttons += '<div class="button resizable draggable" style="position:absolute;'+position_css+'"><div class="drag-zone"><span class="button-text">'+this.name+'</span></div></div>';
					//set position of the next button
					left += (margin+button_width);
					if((left+button_width+margin) > menu_width){//if true the button will overflow the container
						top += (margin+button_height);
						left = margin;
					}
				});
				html_content = '<div id="content-'+tab_index+'" class="tab-content-actual" style="display:none">'+html_buttons+'</div>';
				//append to html
				$(".menu-tabs").append(html_tab);
				$(".tab-content").append(html_content);
				tab_index++;
			});

			//set drag, drop and resizablility for buttons
			$(".draggable").draggable({
				revert: function(){
					var position = $(this).position();
					var x = position.left;
					var y = position.top;
				},
				handle: ".drag-zone"
			});

			$(".droppable").droppable({
				drop: function(event, ui){
					window.gridmodel.addButton(ui.draggable);
				}
			});

			$(".resizable").resizable({
				stop: function(event, ui){
					var obj = ui.element;
					$(".drop-zone").each(function(){
						var isover = overlap(this,obj[0]);
						if(isover){
							var over = $(this).droppable("option","over");
							over.call($(this));
						}		
					});
					var drop = $(".droppable").droppable("option", "drop");
					drop(0,{"draggable" : ui.element});
				},
				minWidth: 100,
				minHeight: 80
			});

			//bind tab clicks
			$(".tab").on("click", function(){
				set_tab(this);
			});
			//start at tab 2, hide all tabscontent
			set_tab($("#tab-1")[0]);
		}
	});
});

