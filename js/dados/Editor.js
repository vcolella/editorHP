// Represeta o editor com um todo
var Editor = {}

// Indica o número de novos livros criados
Editor.numNovosLivros = 0

// Contém uma referência ao elementos copiados (deve-se clona-los antes de colar)
Editor.colagem = []

// Indica o tipo de elementos copiados ("paginas")
Editor.tipoColagem = ""

// Cria um livro vazio
Editor.criarNovoLivro = function () {
	var livro, pagina, indice, cabecalho, texto, aba, i
	
	// Cria o livro
	Editor.numNovosLivros++
	livro = new Livro
	livro.nome = "Sem título "+Editor.numNovosLivros
	livro.criacao = Date.now()
	livro.modificacao = Date.now()
		
	// Cria elementos básicos
	for (i=1; i<=5; i++) {
		pagina = new Pagina
		cabecalho = new Cabecalho
		cabecalho.texto = "Página "+i
		texto = new Texto
		texto.texto = "Basta escrever seu texto aqui"
		pagina.elementos.push(cabecalho)
		pagina.elementos.push(texto)
		indice = new FolhaIndice
		indice.nome = "Página "+i
		indice.pagina = pagina
		livro.paginas.push(pagina)
		livro.indices.push(indice)
	}
	
	// Exibe
	aba = new Aba(livro)
	InterfaceAbas.abas.push(aba)
	Interface.abaFoco = aba
	InterfaceAbas.atualizarLayout()
	
	return livro
}
