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
		<span class="title">Rediger Knapplacering</span>
		<div id="options-wrapper">
			<div class="options">
				<form action="javascript:setGridDimensions()" method="POST" id="grid-setter">
					<div class="input_grid_wrapper">
						<input id="grid_x" type="number" min="1" max="20" step="1" value="7" />
						<input id="grid_y" type="number" min="1" max="20" step="1" value="6" />
						<input type="submit" value="Go!" />
					</div>
				</form>
			</div>
			<button type="button" id="save-layout">Gem</button>
			<div class="menu">
				<div class="menu-tabs">		
				</div>
				<div class="tab-content">
				</div>
			</div>
		</div>
		<div class="grid-menu">
			<table id="button_grid" class="droppable"></table>
		</div>
		<span id='feedback'></span>
	</body>
</html>
