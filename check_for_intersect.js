var buttons = 
	[{
		"function": "Kontant",
		"text": "hello",
		"grids": [
			[2, 2],
			[2, 3]
		]
	},
	{
		"function": "Dankort",
		"text": "world",
		"grids": [
			[3, 4],
			[3, 5],
			[4, 4],
			[4, 5]
		]
	}];

var grids = 
	[
		[1, 1],
		[1, 2],
		[2, 1],
		[2, 2]
	];

check_for_intersect(grids, buttons);

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
					//there is intersection
					alert("x: "+x+", y: "+y);
				}
			}
			
		}
	}
}