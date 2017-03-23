<html>
	<head>
		<link rel="stylesheet" href="style.css">
		<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script src="GridModel.class.js"></script>
		<script src="util.js"></script>
		<script src="onload.js"></script>
	</head>
	<body>
		<div class="menu" style="float:left">
			<div class="menu-tabs">		
			</div>
			<div class="tab-content">
			</div>
		</div>
		<div style="position:relative;float:left">
			<form action="javascript:setGridDimensions()" method="POST" id="grid-setter">
				<div class="input_grid_wrapper">
					<input id="grid_x" type="number" min="1" max="5" step="1" value="5" />
					<input id="grid_y" type="number" min="1" max="5" step="1" value="5" />
					<input type="submit" value="Go!" />
				</div>
			<form>
			<table id="button_grid" class="droppable"></table>
			<button type="button" id="save-layout">Save</button>
		</div>
		<span id='feedback'></span>
	</body>
</html>
