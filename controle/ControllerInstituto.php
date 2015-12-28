<?php
require('../exibicao/InstitutoView.php');
require('../persistencia/ConnectionUtil.php');
require('../persistencia/instituto/Instituto.php');
require('../persistencia/instituto/InstitutoDao.php');
require('../persistencia/instituto/InstitutoService.php');
$tiporequest = $_SERVER['REQUEST_METHOD'];
if($tiporequest=="GET"){
	InstitutoView::exibeInstitutos();
}
else if($tiporequest=="POST"){
	$funcao = $_POST['funcao'];
	if($funcao=="deletar"){
		$idinst = $_POST['idinst'];
		$institutodeletar = InstitutoService::getById($idinst);
		InstitutoService::delete($institutodeletar);
	}
	else if($funcao=="criar"){
		$nomeinst = $_POST['nomeinst'];
		$institutocriar = new Instituto();
		$institutocriar->setNome(utf8_encode($nomeinst));
		$criou = InstitutoService::inserir($institutocriar);
		if(!is_null($criou)){
			$institutocriado = InstitutoService::getByNome($nomeinst);
			$arrayretorno['nomeinst'] = $nomeinst;
			$arrayretorno['idinst'] = $institutocriado->getId();
			$retornoJSON = json_encode($arrayretorno);
			echo $retornoJSON;
		}
		else{
			$retornoJSON = json_encode(NULL);
			echo $retornoJSON;
		}
	}
	else if($funcao=="atualizar"){
		$novonome = $_POST['novonome'];
		$idinst = $_POST['idinst'];
		$pode = InstitutoService::getByNome($novonome);
		if(is_null($pode)){
			$institutoatualizar = InstitutoService::getById($idinst);
			$institutoatualizar->setNome($novonome);
			InstitutoService::alterar($institutoatualizar);
			$arrayretorno['novonome'] = $institutoatualizar->getNome();
			$arrayretorno['idinst'] = $institutoatualizar->getId();
			$retornoJSON = json_encode($arrayretorno);
			echo $retornoJSON;
		}
		else{
			$retornoJSON = json_encode(NULL);
			echo $retornoJSON;
		}
	}
}

?>