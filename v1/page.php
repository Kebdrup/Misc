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
	<div class="menu">
		<div class="menu-tabs">		
		</div>
		<div class="tab-content">
		</div>
	</div>
		<div style="position:relative">
			<form action="javascript:setGridDimensions(this)" method="POST">
				<div class="input_grid_wrapper">
					<input id="grid_x" type="number" min="1" max="5" step="1" value="5" />
					<input id="grid_y" type="number" min="1" max="5" step="1" value="5" />
					<input type="submit" value="Go!" />
				</div>
			<form>
			<table id="button_grid" class="droppable"></table>
			<div id="1" class="draggable resizable button" style="position:absolute"  data-function="cash"  onmousedown="window.gridmodel.button_grid = [];">
				<div class="drag_zone"></div>
			</div>
			<!--<div class="button draggable resizable" onmousedown="window.gridmodel.button_grid = [];">
				<img class="remove-button" src="close2.png"></button>
				<div class="drag_zone"></div>
				<div class="text-wrapper">
					<span class="button-text">Kontant</span>
				</div>
			</div>-->
			<div id="2" class="button draggable resizable" data-function="card" onmousedown="window.gridmodel.button_grid = [];">
				<div class="drag_zone"></div>
			</div>
		<div>
	</body>
</html>