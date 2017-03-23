
function GridModel(x,y){
	this.width = x;
	this.height = y;
	this.buttons = [];
	this.button_grids = [];
	this.addButton = function(button){
		var intersect = check_for_intersect(this.button_grids, this.buttons);
		this.button_grids.sort(function(a,b){
			return (a[0]+a[1])-(b[0]+b[1]);
		});
		var start_grid = $(".drop-zone[data-x='"+this.button_grids[0][0]+"'][data-y='"+this.button_grids[0][1]+"']").parent("td");
		var padding_top = (start_grid.outerWidth()-start_grid.width())/2;
		var padding_left = (start_grid.outerHeight()-start_grid.height())/2;
		var start_top = start_grid.offset().top-padding_top;
		var start_left = start_grid.offset().left-padding_left;
		//set new button offset
		button.offset({
			top: start_top,
			left: start_left
		});
		//calculate new button dimensions
		var new_width = 0;
		var new_height = 0;
		var x_dim = [];
		var y_dim = []; 
		for(i=0; i<this.button_grids.length; i++){
			var grid = this.button_grids[i];
			var x = grid[0];
			var y = grid[1];
			if(x_dim.includes(x) == false){
				x_dim.push(x);
				var grid_element = $(".drop-zone[data-x='"+x+"'][data-y='"+y+"']").parent("td");
				new_width += grid_element.outerWidth();
			}
			if(y_dim.includes(y) == false){
				y_dim.push(y);
				var grid_element = $(".drop-zone[data-x='"+x+"'][data-y='"+y+"']").parent("td");
				new_height += grid_element.outerHeight();
			}
		}
		//create and add new button
		var button_id = button.prop("id")
		var new_button ={
			"id" : button_id.substring(button_id.indexOf("-")+1, button_id.length),
			"function" : button.prop("data-function"),
			"grids" : this.button_grids
			};
		this.buttons.push(new_button);
		//set new button dimensions
		button.width(new_width);
		button.height(new_height);
		//reset temporaries
		x_dim = [];
		y_dim = []; 
		this.button_grids = [];
	};
	this.setBtnLocation = function(x,y){
		this.button_grids.push([x,y]);
	};
	this.clearBtnLocation = function(x,y){
		for(i=0; i<this.button_grids.length; i++){
			grid = this.button_grids[i];
			if(grid[0] == x && grid[1] == y){
				this.button_grids.splice(i,1);
			}
		}
	}
}
