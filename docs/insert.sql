INSERT INTO Instituto VALUES (NULL,'Instituto de Ciencias Exatas');
INSERT INTO Instituto VALUES (NULL,'Instituto de Fisica');
INSERT INTO Instituto VALUES (NULL,'Instituto de Biologia');

INSERT INTO Departamento VALUES (NULL,'Departamento de Ciencia da Computacao',1);
INSERT INTO Departamento VALUES (NULL,'Departamento de Fisica Teorica',2);
INSERT INTO Departamento VALUES (NULL,'Departamento de Biologia Celular',3);

INSERT INTO Curso VALUES (NULL,'Engenharia de Computação',10,252,1);
INSERT INTO Curso VALUES (NULL,'Fisica - Bacharelado',8,176,2);
INSERT INTO Curso VALUES (NULL,'Ciências Biológicas',8,214,3);

INSERT INTO Disciplina VALUES (NULL,'Banco de Dados',116378,4,1);
INSERT INTO Disciplina VALUES (NULL,'Algoritmos e Programação de Computadores',113476,6,1);
INSERT INTO Disciplina VALUES (NULL,'Estruturas de Dados',116319,4,1);
INSERT INTO Disciplina VALUES (NULL,'Organização de Arquivos',201600,4,1);

INSERT INTO Professor VALUES (NULL,'Joao','1978-04-12','2004-06-23',77467397097,2412986);
INSERT INTO Professor VALUES (NULL,'Maria','1954-10-25','2006-10-29',97441646200,6538792);
INSERT INTO Professor VALUES (NULL,'Brenda','1972-11-30','2007-12-04',71856343006,9412478);

INSERT INTO Sala VALUES (NULL,'AT/045');
INSERT INTO Sala VALUES (NULL,'BT/543');
INSERT INTO Sala VALUES (NULL,'B2/289');

INSERT INTO Aluno VALUES (NULL,'Murilo','1995-05-21',76390812643,'2012-10-31',2655361,120130637,1,NULL,NULL);
INSERT INTO Aluno VALUES (NULL,'Alexandre','1996-06-12',38994929384,'2013-03-04',6528075,130038392,2,NULL,NULL);
INSERT INTO Aluno VALUES (NULL,'Danilo','1998-03-04',77870987901,'2013-08-05',1340985,130138293,3,NULL,NULL);
INSERT INTO Aluno VALUES (NULL,'Kevin','1994-07-21',57493821543,'2014-01-01',3547893,140034788,3,NULL,NULL);

INSERT INTO Turma VALUES (NULL,'A',3,2,3,'10:00');
INSERT INTO Turma VALUES (NULL,'B',2,1,2,'14:00');
INSERT INTO Turma VALUES (NULL,'C',4,3,2,'16:00');

INSERT INTO Matricula VALUES (1,1,3);
INSERT INTO Matricula VALUES (2,2,2);
INSERT INTO Matricula VALUES (3,3,4);

INSERT INTO PreRequisito VALUES (NULL,1,4);
INSERT INTO PreRequisito VALUES (NULL,4,3);
INSERT INTO PreRequisito VALUES (NULL,3,2);

INSERT INTO Projeto VALUES (NULL,'Identificação de Faces','Identificação de faces com novo algoritmo','Processamento de Imagens');
INSERT INTO Projeto VALUES (NULL,'Escalonamento de Transacoes','Escalonar transacoes para melhorar eficiencia','Banco de Dados');
INSERT INTO Projeto VALUES (NULL,'Processamento Paralelo','Melhorar eficiencia de processamento paralelo','Programacao Concorrente');

UPDATE Aluno SET Projeto_idProjeto=1 WHERE idAluno=1;
UPDATE Aluno SET Projeto_idProjeto=2 WHERE idAluno=2;
UPDATE Aluno SET Projeto_idProjeto=3 WHERE idAluno=3;

INSERT INTO Projeto_Prof VALUES (NULL,1,2);
INSERT INTO Projeto_Prof VALUES (NULL,3,1);
INSERT INTO Projeto_Prof VALUES (NULL,2,3);

INSERT INTO Laboratorio VALUES (NULL,'Laboratorio de Processamento de Sinais',1,1);
INSERT INTO Laboratorio VALUES (NULL,'Laboratorio de Genetica',2,3);
INSERT INTO Laboratorio VALUES (NULL,'Laboratorio de Relatividade',3,2);

INSERT INTO Tipo_Item VALUES (NULL,'Vidraria','Itens feitos de vidro');
INSERT INTO Tipo_Item VALUES (NULL,'Equipamentos eletronicos','Itens eletronicos');
INSERT INTO Tipo_Item VALUES (NULL,'Medidores','Itens para medir');

INSERT INTO Item VALUES (NULL,'Osciloscopio',1,'Instrumento para medir ondas',2,1);
INSERT INTO Item VALUES (NULL,'Paquimetro',3,'Instrumento para medir comprimentos pequenos',3,3);
INSERT INTO Item VALUES (NULL,'Erlenmeyer',2,'Instrumento para medir volume de liquidos',1,2);


