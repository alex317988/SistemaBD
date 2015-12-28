var botaoinst = function(){
	$(document).on('click','.instbut',function(){
		window.location.href = 'IndexInstituto.php';
	});
}

var botaodept = function(){
	$(document).on('click','.deptbut',function(){
		window.location.href = 'IndexDepartamento.php';
	});
}

var botaocurs = function(){
	$(document).on('click','.cursbut',function(){
		window.location.href = 'IndexCurso.php';
	});
}

$(document).ready(botaoinst);
$(document).ready(botaodept);
$(document).ready(botaocurs);

