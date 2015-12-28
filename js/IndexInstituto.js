var criarregistro = function(){
	$(document).on('click','.criar',function(){
		var nomeinst = $("#criarinst").val();
		$.ajax({
			type: "POST",
			url: "controle/ControllerInstituto.php",
			data: {funcao: 'criar', nomeinst: nomeinst},
			success: function(data){
				if(data!="null"){
					dadosretornados = JSON.parse(data);
					var colocarnapagina = "<tr id='tr";
					colocarnapagina += dadosretornados['idinst'];
					colocarnapagina += "'><td>";
					colocarnapagina += dadosretornados['nomeinst'];
					colocarnapagina += "</td>";
					colocarnapagina += "<td><button id='e";
					colocarnapagina += dadosretornados['idinst'];
					colocarnapagina += "' class='excluir'>Excluir</button>";
					colocarnapagina += "</td>";
					colocarnapagina += "<td><button id='a";
					colocarnapagina += dadosretornados['idinst'];
					colocarnapagina += "' class='atualizar'>Atualizar</button>";				
					colocarnapagina += "</td>";
					colocarnapagina += "<td style='display:none'>";
					colocarnapagina += "<form><input id='atualizar";
					colocarnapagina += dadosretornados['idinst'];
					colocarnapagina += "' class='atualizarinst' type='text'> </form>";
					colocarnapagina += "</td>";
					colocarnapagina += "<td style='display:none'>";
					colocarnapagina += "<button id='c";
					colocarnapagina += dadosretornados['idinst'];
					colocarnapagina += "' class='confirmar'>Confirmar</button>";
					colocarnapagina += "</td>";
					colocarnapagina += "<td style='display:none'>";
					colocarnapagina += "<button id='can";
					colocarnapagina += dadosretornados['idinst'];
					colocarnapagina += "' class='cancelar'>Cancelar</button>";
					colocarnapagina += "</td>";
					colocarnapagina += "</tr>";
					$('table tr:last').after(colocarnapagina);
				}
				else{
					alert("Já existe um instituto com esse nome.");
				}
			}
		});
	});
}

var mostraratualizarregistro = function(){
	$(document).on('click','.atualizar',function(){
		var idbotao = $(this).attr('id').slice(1);
		$('#atualizar'+idbotao).parent().parent().css('display','inline-block');
		$('#c'+idbotao).parent().css('display','inline-block');
		$('#can'+idbotao).parent().css('display','inline-block');
	});
}

var confirmaratualizacao = function(){
	$(document).on('click','.confirmar',function(){
		var idbotao = $(this).attr('id').slice(1);
		var idbotaoint = parseInt(idbotao);
		var novonome = $('#atualizar'+idbotao).val();
		$.ajax({
			type: "POST",
			url: 'controle/ControllerInstituto.php',
			data: {funcao:'atualizar',idinst:idbotaoint,novonome:novonome},
			success: function(data){
				if(data!="null"){
					dadosretornados = JSON.parse(data);
					console.log(dadosretornados);
					$('#tr'+dadosretornados['idinst']+" td:first-child").text(dadosretornados['novonome']);
					$('#atualizar'+dadosretornados['idinst']).parent().parent().css('display','none');
					$('#atualizar'+dadosretornados['idinst']).val("");
					$('#c'+dadosretornados['idinst']).parent().css('display','none');
					$('#can'+dadosretornados['idinst']).parent().css('display','none');
				}
				else{
					$('#atualizar'+idbotao).parent().parent().css('display','none');
					$('#atualizar'+idbotao).val("");
					$('#c'+idbotao).parent().css('display','none');
					$('#can'+idbotao).parent().css('display','none');
					alert("Já existe um instituto com esse nome.");
				}
			}
		});
	});	
}

var excluirregistro = function(){
	$(document).on('click','.excluir',function(){
		var idinststr = $(this).attr('id').slice(1);
		var idinstint = parseInt(idinststr);
		$.ajax({
			type: "POST",
			url: 'controle/ControllerInstituto.php',
			data: {funcao:'deletar',idinst:idinstint},
			success: function(data){
				$("#tr"+idinstint).remove();
			}
		});
	});
}

var exibirinstitutos = function(){
	$.ajax({
		type: "GET",
		url: 'controle/ControllerInstituto.php',
		success: function(data){
			$("body").append(data);
		}
	});
}

var cancelarbotao = function(){
	$(document).on('click','.cancelar',function(){
		var idbotao = $(this).attr('id').slice(3);
		$('#atualizar'+idbotao).parent().parent().css('display','none');
		$('#c'+idbotao).parent().css('display','none');
		$('#can'+idbotao).parent().css('display','none');
	});
}

$(document).ready(exibirinstitutos);
$(document).ready(mostraratualizarregistro);
$(document).ready(excluirregistro);
$(document).ready(criarregistro);
$(document).ready(confirmaratualizacao);
$(document).ready(cancelarbotao);
//$(document).ready(enterimpedir);