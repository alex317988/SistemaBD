CREATE DEFINER=`root`@`localhost` PROCEDURE `MostrarAlunos`()
BEGIN
IF EXISTS (SELECT * FROM Aluno) THEN
	SELECT Matricula FROM Aluno WHERE Nome LIKE "M%";
END IF;
END