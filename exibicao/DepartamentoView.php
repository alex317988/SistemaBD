<?php

class DepartamentoView{
	public static function exibeDepartamentos(){

		$departamentos = DepartamentoService::getDepartamentos();
		$institutos = InstitutoService::getInstitutos();

		$table = "";
		$table .= "<form> Nome do Departamento|Instituto <br> <input class='noEnter' id='criardept' type='text'>";
		$table .= "<select class='institutos' style='display:inline'>";
		if($institutos != null){
			for($i=0;$i<sizeof($institutos);$i++){
				$table .= "<option value='".$institutos[$i]->getId()."'>".$institutos[$i]->getNome()."</option>";
			}
		}

		$table .= "</select>";
		$table .= "</form>";
		$table .= "<button class='criar'> Criar </button><br><br>";
		
		$table .= "<table>";
			
		$table .= "<tr>";
		$table .= "<th>Nome</th>";
		$table .= "<th>Instituto</th>";
		$table .= "<th>Excluir</th>";
		$table .= "<th>Atualizar</th>";
		$table .= "</tr>";

		if($departamentos != null){
			for($i=0;$i<sizeof($departamentos);$i++){
				$instituto = InstitutoService::getById($departamentos[$i]->getInst_id());
				$table .= "<tr id='tr".$departamentos[$i]->getId()."'>";

				$table .= "<td>";
				$table .= $departamentos[$i]->getNome(); 
				$table .= "</td>";

				$table .= "<td>";
				$table .= $instituto->getNome();
				$table .= "</td>";

				$table .= "<td>";
				$table .= "<button id='e".$departamentos[$i]->getId()."' class='excluir'>Excluir</button>"; 
				$table .= "</td>";

				$table .= "<td>";
				$table .= "<button id='a".$departamentos[$i]->getId()."' class='atualizar'>Atualizar</button>"; 
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<form><input id='atualizar".$departamentos[$i]->getId()."' class='atualizardept' type='text'></form>";
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<select id='drop".$departamentos[$i]->getId()."' class='dropatu'>";
				if($institutos != null){
					for($j=0;$j<sizeof($institutos);$j++){
						$table .= "<option value='".$institutos[$j]->getId()."'";
						if($institutos[$j]->getNome()==$instituto->getNome()){
							$table .= " selected";
						}
						$table .= ">".$institutos[$j]->getNome()."</option>";
					}
				}

				$table .= "</select>";
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<button id='c".$departamentos[$i]->getId()."' class='confirmar'>Confirmar</button>";
				$table .= "</td>";

				$table .= "<td style='display:none'>";
				$table .= "<button id='can".$departamentos[$i]->getId()."' class='cancelar'>Cancelar</button>";
				$table .= "</td>";

				$table .= "</tr>";
			}
		}
		
		$table .= "</table>";
		$table .= "<br>";
		$table .= "<button class='instbut nav'>Institutos</button>";
		$table .= "<button class='deptbut nav'>Departamentos</button>";
		$table .= "<button class='cursbut nav'>Cursos</button>";
		
		$output = file_get_contents("/var/www/html/Projeto Final BD/Codigo/exibicao/html/departamento.html");
		$output = str_replace("tabela", $table, $output);
		
		echo $output;
	}
}

?>