
function overlap(elem1, elem2){
	rect1 = elem1.getBoundingClientRect();
	rect2 = elem2.getBoundingClientRect();
	var overlap = !(rect1.right < rect2.left || 
			rect1.left > rect2.right || 
			rect1.bottom < rect2.top || 
			rect1.top > rect2.bottom);
	return overlap;
}

function check_for_intersect(grids, buttons){
	for(var i = 0; i<buttons.length; i++){//foreach button
		var btn = buttons[i];
		var grids_to_check = btn.grids;
		for(var j = 0; j<grids_to_check.length; j++){//foreach grid
			var grid = grids_to_check[j];
			var x = grid[0];
			var y = grid[1];
			for(var h = 0; h<grids.length; h++){//forech new grid
				var grid_new = grids[h];
				var x_new = grid_new[0];
				var y_new = grid_new[1];
				if(x == x_new && y == y_new){
					return true;
				}
			}
			
		}
	}
	return false;
}
function setGridDimensions(){
	var form = $("#grid-setter");
	$("button_grid").html("");
	var x = $("#grid_x").val();
	var y = $("#grid_y").val();
	var rows = "";
	for(i = 1; i<=y; i++){
		var cells = "";
		for(j=1; j<=x; j++){
			cells += "<td class='grid_cell'><div data-x='"+j+"' data-y='"+i+"' class='drop-zone'></div></td>";	
		}
		rows += "<tr>"+cells+"</tr>";
	}
	$("#button_grid").html(rows);
	$(".drop-zone").droppable({
		over: function(event,ui){
			var x = $(this).attr("data-x");
			var y = $(this).attr("data-y");
			window.gridmodel.setBtnLocation(x,y);
		},
		out: function(event,ui){
			var x = $(this).attr("data-x");
			var y = $(this).attr("data-y");
			window.gridmodel.clearBtnLocation(x,y);
		},
		tolerance: "touch"
	});
	window.gridmodel = new GridModel(x,y);
}
