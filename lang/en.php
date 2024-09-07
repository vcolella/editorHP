<?php
// Arquivo de línguagem para o inglês
// Substituições no HTML
$strs = array(
	'abrir' => 'Open',
	'salvar' => 'Save',
	'ajuda' => 'Help',
	'bug' => 'Report bug',
	'novaAba' => 'New book (Ctrl+N)',
	'upload' => 'Upload',
	'novo' => 'New',
	'gerarArquivo' => 'Generate file',
	'somenteSalvar' => 'Save only',
	'salvarTodos' => 'Save all',
	'salvarComo' => 'Save as',
	'inserir' => 'Insert',
	'excluir' => 'Delete',
	'copiar' => 'Copy',
	'colar' => 'Paste',
	'recortar' => 'Cut',
	'fina' => 'Thin',
	'media' => 'Medium',
	'grossa' => 'Thick',
	'paginas' => 'Pages',
	'autoPaginacao' => 'Auto page',
	'removerPaginas' => 'Remove page',
	'adicionarPagina' => 'Add page',
	'formatacao' => 'Format',
	'paragrafo' => 'Paragraph',
	'equacao' => 'Equation',
	'titulo1' => 'Header 1',
	'titulo2' => 'Header 2',
	'titulo3' => 'Header 3',
	'titulo4' => 'Header 4',
	'titulo5' => 'Header 5',
	'inserirImagem' => 'Insert image',
	'inserirRegua' => 'Insert horizontal ruler',
	'inserirChar' => 'Insert special character',
	'alinhamento' => 'Alignment',
	'esquerda' => 'Align left',
	'centro' => 'Center align',
	'direita' => 'Align right',
	'indices' => 'Indexes',
	'autoIndexacao' => 'Auto index',
	'removerIndice' => 'Remove index',
	'adicionarIndice' => 'Add index',
	'anexos' => 'Attachments',
	'removerAnexos' => 'Remove attachment',
	'adicionarAnexo' => 'Add attachment',
	'abrirArquivo' => 'Open file',
	'recentes' => 'Recent',
	'uploadIntro' => 'Select a *.hp file from your computer',
	'sobre' => 'About',
	'formato' => 'Format',
	'creditos' => 'Credits',
	'ajudaSobre' => '<h1>HP Editor - Version 1.2 (04/20/2013)</h1>
		<p>This is a text editor for HP50g calculator made with HTML, CSS and JS that works fine in FF 15+ and Chrome. It creates a binary file that can be directly saved in a SD card or transmitted via wire using official software from HP. Nothing needs to be installed in the calculator, and the file can be opened and edited again.</p>
		<p><strong>Privacy</strong><br>All your data are kept in your browser, you can clean your cache to erase then. Some actions send data to sitegui.com.br, but nothing is kept by it or used in any other manner.</p>',
	'ajudaFormato' => '<p>Each file text (called book) is based in pages, which contains text (headers and paragraphs), equations and images. These pages are accessed by an index. It is also possible to attach objects (like equations, matrixes, formulae and graphs) to the book. The editor automatically divides your text in pages and creates the right indexes to make the navigation easier in the calculator.</p>',
	'ajudaCreditos' => '<p><strong>Conceiver, programmer and designer</strong><br>Guilherme de Oliveira Souza (<a href="http://sitegui.com.br">sitegui.com.br</a>)<br><a href="#" onclick="window.open(\'/fale_conosco/?assunto=editorHP\', \'janelaFaleConosco\', \'width=500,height=500\'); return false">Contact us</a></p>
		<p><strong>Source code</strong><br><a href="https://github.com/sitegui/editorHP/" target="_blank">github.com/sitegui/editorHP</a></p>
		<p><strong>Background</strong><br><a href="http://subtlepatterns.com/" target="_blank">subtlepatterns.com</a></p>
		<p><strong>Icon</strong><br><a href="http://www.findicons.com/" target="_blank">findicons.com</a></p>
		<p><strong>License</strong><br><a href="http://www.gnu.org/licenses/gpl.html" target="_blank">GNU GENERAL PUBLIC LICENSE</a><br>Copyright 2013 Guilherme de Oliveira Souza</p>',
	'cancelar' => 'Cancel',
	'confirmar' => 'Confirm',
	'ajustarImagem' => 'Adjust image',
	'filtro' => 'Filter',
	'basico' => 'Basic',
	'areas' => 'Areas',
	'ajuste' => 'Filter adjust',
	'ajusteDica' => 'value between -100 and 100',
	'tamanho' => 'Size',
	'tamanhoDica' => 'HP\'s screen is 131 pixels wide',
	'imagemAviso' => 'It is not possible to edit this image, the original file was lost',
	'trocar' => 'Change',
	'remover' => 'Remove',
	'carregando' => 'Loading&hellip;',
	'cliqueFecha' => 'Click to close',
	'criarDesenho' => 'Create draw',
	'avisoCores' => 'Avoid using colors from the same group, they are too close for the calculator',
	'preto' => 'Black',
	'branco' => 'White',
	'vermelho' => 'Red',
	'verde' => 'Green',
	'azul' => 'Blue',
	'azulPiscina' => 'Aqua',
	'rosa' => 'Pink',
	'amarelo' => 'Yellow',
	'limpar' => 'Clear',
	'desfazer' => 'Undo (Ctrl+Z)',
	'refazer' => 'Redo (Ctrl+Shift+Z)',
	'linguaAtual' => 'English',
	'pt-br' => 'Português',
	'en' => 'English',
	'cliqueAbreFecha' => 'Click to open/close',
	'sintaxe' => '<h1>Equation\'s syntax</h1>
		Expression: <code>\'X+1\'</code><br>
		Expression: <code>\'Δ = B^2-4*A*C\'</code><br>
		Derivative: <code>\'A(X) = ∂t(V(X))\'</code><br>
		Integral: <code>\'∫(0; X; EXP(t); t)\'</code><br>
		Vector: <code>[3 \'X*COS(θ)\']</code><br>
		Matrix: <code>[[1 \'A\'][3 4]]</code><br>
		List: <code>{\'X = 3\' (1.;-1.)}</code>',
	'baixarBiblioteca' => 'Download library',
	'download' => 'Download',
	'janelaDownload' => '<div><p>Your file is ready. To open it in the calculator follow these steps:</p>
		<ol>
		<li><a id="janelaDownload-link" title="Click to download">Click here to download it</a></li>
		<li>Save it in a SD card with up to 2 GiB of total space</li>
		<li>Insert the SD card in the HP50g turned off</li>
		<li>Go to FILES (white shift + APPS)</li>
		<li>Select the 3:SD port and press the right key</li>
		<li>Select it in the list and press the EVAL option in the screen (F5)</li>
		</ol></div>',
	'feedback' => 'Contact us',
	'enviar' => 'Send',
	'feedback-intro' => 'Write your question, complain or compliment bellow and, if possible, <u>inform your name and email address</u> in order to be answered',
	'email' => 'Email',
	'feedback-anon' => 'I don\'t want to inform my email address and therefore I\'ll not be answered',
	'mensagem' => 'Message',
	'feedback-userAgent' => 'Your browser data',
	'feedback-arquivo' => 'I also want to send the current opened file so that we can analise better your problem'
);
