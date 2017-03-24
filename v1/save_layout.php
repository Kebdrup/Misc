<?php
error_reporting(E_ALL);
ini_set('xdebug.var_display_max_depth', 5);
ini_set('xdebug.var_display_max_children', 256);
ini_set('xdebug.var_display_max_data', 1024);
$buttons = json_decode($_POST["buttons"], true);
$dimensions = $_POST["dimensions"];

$button_xml = "";
foreach($buttons as $button){
	$button_id = $button["id"];
	$button_grids = $button["grids"];
	$button_text = $button["text"];
	$button_action = $button["action"];

	//calculate button height and width
	$x_arr = array();
	$y_arr = array();
	foreach($button_grids as $grid){
		//use union to get non-duplicates
		$x = $grid[0];	
		$y = $grid[1];
		array_push($x_arr,$x);
		array_push($y_arr,$y);
	}
	$dimension_x = array_unique($x_arr);
	$dimension_y = array_unique($y_arr);
	$width = count($dimension_x);
	$height = count($dimension_y);
	//find button location
	$start_x = min($dimension_x);
	$start_y = min($dimension_y);
	//generate button xml
	$button_xml .=  "<button id=\"$button_id\" text=\"$button_text\" action=\"$button_action\" p1=\"\" color=\"1\" font=\"1\" enabled=\"1\">".
						"<location x=\"$start_x\" y=\"$start_y\"/>".
						"<size width=\"$width\" height=\"$height\"/>".
						"<message popup=\"0\" popuptime=\"2000\"><![CDATA[]]></message>".
						"<tag><![CDATA[]]></tag>".
					"</button>";	
}

//combine xml
$xml = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>".
			"<buttons x_units=\"".$dimensions["x"]."\" y_units=\"".$dimensions["y"]."\">".
				$button_xml.
			"</buttons>";

echo $xml;