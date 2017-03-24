
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
	$(".tab-content-actual").css("visibility", "hidden");
	$("#content-"+id).css("visibility", "visible");
}

$(document).ready(function(){
	//load and layout buttons absolute
	$.ajax({
		url: "buttons.json",
		success: function(tabs){
			var html = "";
			var margin = 10;
			var menu_width = 500;
			var button_height = 80;
			var tab_index = 1;
			//foreach tab
			$.each(tabs, function(){
				html_tab = '<div class="tab" id="tab-'+tab_index+'"><span class="tab-text">'+this.tab+'</span></div>';
				var top = margin;
				var left = margin;
				var html_buttons = "";
				$.each(this.buttons, function(){
					//generates button html
					var button_width = parseInt(this.width); 
					var position_css = 'left:'+left+';top:'+top+';';
					html_buttons += '<div id="button-'+this.id+'" class="button resizable draggable" style="position:absolute;'+position_css+'" data-action="'+this.action+'" data-default-height="'+button_height+'" data-default-width="'+button_width+'" data-default-top="'+top+'" data-default-left="'+left+'"><div class="drag-zone"><span class="button-text">'+this.name+'</span></div></div>';
					//set position of the next button
					left += (margin+button_width);
					if((left+button_width+margin) > menu_width){//if true the button will overflow the container
						top += (margin+button_height);
						left = margin;
					}
				});
				html_content = '<div id="content-'+tab_index+'" class="tab-content-actual" style="visibility:hidden">'+html_buttons+'</div>';
				//append to html
				$(".menu-tabs").append(html_tab);
				$(".tab-content").append(html_content);
				tab_index++;
			});

			//set drag, drop and resizablility for buttons
			$(".draggable").draggable({
				handle: ".drag-zone",
				stop: function(event, ui){
					//this should detect if element needs to be moved back to its start position (outside droppable)					
					var dragged_to_rect = {"left": ui.position.left, "right" : ui.position.left+ui.helper.width(), "top" : ui.position.top, "bottom" : ui.position.top+ui.helper.height()};
					var isover = overlap(dragged_to_rect, $("#button_grid")[0], 1);
					if(!isover){
						//set offset and size to default 
						this.style.top = this.attributes["data-default-top"].value;
						this.style.left = this.attributes["data-default-left"].value;
						this.style.width = this.attributes["data-default-width"].value;
						this.style.height = this.attributes["data-default-height"].value;
					}
				}
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

			//remove button from grid
			$(".button").on("mousedown", function(){
				var id_attr = this.id;
				var current_id = id_attr.substring(id_attr.indexOf("-")+1, id_attr.length);
				window.gridmodel.button_grid = [];
				//check all buttons for this button
				$.each(window.gridmodel.buttons, function(index, button){
					if(button.id == current_id){
						gridmodel.buttons.splice(index,1);
					}
				});
			});

			//load grid
			setGridDimensions();
		}
	});

	//save button bind
	$("#save-layout").on("click", function(){
		if(window.gridmodel.buttons.length > 0){
			$.ajax({
				method: "POST",
				url: 'save_layout.php',
				data: {"buttons" : JSON.stringify(window.gridmodel.buttons), "dimensions" : {"x": 5, "y": 5}},			
				success: function(data){
					$("#feedback").html(data);
				}
			});
		}
	});
});

