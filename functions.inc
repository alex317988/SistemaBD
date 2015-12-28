<?php
function __autoload($strClass){	
	if(!__findClass($strClass,"../../")) {
		echo "<h1>Class Not Found: $strClass !!</h1>";
		exit(0);
	}
}

function __findClass($class,$dir) {
	$ponteiro = opendir($dir);
	while($file = readdir($ponteiro)) {
		$file_path = $dir."/".$file ;
		
		if($file == "." or $file == "..") {
			continue ;
		} else if(is_dir($file_path)) {
			if(__findClass($class,$file_path)) {
				return true ;
			}
		} else if($file == $class.".php") {
			require_once($file_path);
			return true ;
		}
	}
	return false ;
}

?>