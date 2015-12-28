<?php

class InstitutoView{
	public static function exibeInstitutos(){

		$institutos = InstitutoService::getInstitutos();

		$table = "";
		$table .= "<form> Nome do Instituto <br> <input class='noEnter' id='criarinst' type='text'> </form>";
		$table .= "<button class='criar'> Criar </button><br><br>";
		
		$table .= "<table>";
			
		$table .= "<tr>";
		$table .= "<th>Nome</th>";
		$table .= "<th>Excluir</th>";
		$table .= "<th>Atualizar</th>";
		$table .= "</tr>";

		if($institutos != null){
			for($i=0;$i<sizeof($institutos);$i++){
				$table .= "<tr id='tr".$institutos[$i]->getId()."'>";

				$table .= "<td>";
				$table .= $institutos[$i]->getNome(); 
				$table .= "</td>";

				$table .= "<td>";
				$table .= "<button id='e".$institutos[$i]->getId()."' class='excluir'>Excluir</button>"; 
				$table .= "</td>";

				$table .= "<td>";
				$table .= "<button id='a".$institutos[$i]->getId()."' class='atualizar'>Atualizar</button>"; 
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<form><input id='atualizar".$institutos[$i]->getId()."' class='atualizarinst' type='text'> </form>";
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<button id='c".$institutos[$i]->getId()."' class='confirmar'>Confirmar</button>";
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<button id='can".$institutos[$i]->getId()."' class='cancelar'>Cancelar</button>";
				$table .= "</td>";

				$table .= "</tr>";
			}
		}
		
		$table .= "</table>";
		$table .= "<br>";
		$table .= "<button class='instbut nav'>Institutos</button>";
		$table .= "<button class='deptbut nav'>Departamentos</button>";
		$table .= "<button class='cursbut nav'>Cursos</button>";
		
		$output = file_get_contents("/var/www/html/Projeto Final BD/Codigo/exibicao/html/instituto.html");
		$output = str_replace("tabela", $table, $output);
		
		echo $output;
	}
}

?>