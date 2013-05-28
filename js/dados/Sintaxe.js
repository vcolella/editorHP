// Permite validar as sintaxes de equações
var Sintaxe = {}

// Retorna se a string é uma equação válida (de acordo com a sintaxe da HP)
// Recebe a string que está dentro de uma tag <code>, por exemplo
// Aceita um subconjunto das sintaxes da HP, voltado somente a expressões, vetores e matrizes
Sintaxe.validarEquacao = function (str) {
	var expressao
	
	str = str.trim()
	
	try {
		// Infla e interpreta a equação
		expressao = Sintaxe.inflar(str)
		Sintaxe.interpretar(expressao)
		return true
	} catch (e) {
		return false
	}
}

// Tipos
Sintaxe.TIPO_OPERADOR = 1
Sintaxe.TIPO_NUMERO = 2
Sintaxe.TIPO_VARIAVEL = 3
Sintaxe.TIPO_PARENTESES = 4
Sintaxe.TIPO_FUNCAO = 5
Sintaxe.TIPO_DERIVADA = 6
Sintaxe.TIPO_VETOR = 7
Sintaxe.TIPO_EQUACAO = 8

/*

Funções de apoio

*/

// Infla um vetor e suas expressões subsequentes
// "1 2, 3 'X+1'" => ["1", "2", "3", ["X+1"]]
// Se houver algum desbalanceamento, lança uma exceção
Sintaxe.inflar = function (str) {
	var i, len, c, retorno, nivelAtual, cache, equacao, novo, temp
	
	len = str.length
	cache = ""
	retorno = []
	retorno.tipo = Sintaxe.TIPO_VETOR
	retorno.pai = null
	nivelAtual = retorno
	equacao = false // Indica se está dentro de uma equação
	
	var salvarCache = function () {
		if (cache.length) {
			nivelAtual.push(cache)
			cache = ""
		}
	}
	
	for (i=0; i<len; i++) {
		c = str[i]
		if ((c == " " || c == ",") && !equacao) {
			// " " e "," separam elementos do vetor
			salvarCache()
		} else if (c == "'") {
			// Entra ou sai de uma equação
			if (equacao) {
				nivelAtual.push(Sintaxe.inflarEquacao(cache))
				cache = ""
			}
			equacao = !equacao
		} else if (c == "[" && !equacao) {
			// Inicia um novo vetor
			salvarCache()
			novo = []
			novo.pai = nivelAtual
			novo.tipo = Sintaxe.TIPO_VETOR
			nivelAtual.push(novo)
			nivelAtual = novo
		} else if (c == "]" && !equacao) {
			// Finaliza um nível de vetor
			salvarCache()
			if (nivelAtual.pai) {
				temp = nivelAtual
				nivelAtual = nivelAtual.pai
				delete temp.pai
			} else
				throw 0
		} else
			cache += c
	}
	salvarCache()
	
	if (nivelAtual.pai == null && i == len) {
		delete nivelAtual.pai
		return retorno
	}
	throw 0
}

// Infla uma string nos parênteses
// "a^(b*(c+d)-e)+f" => ["a^", ["b*", ["c+d"], "-e"], "+f"]
// Se houver desbalanceamento de parênteses, lança uma exceção
Sintaxe.inflarEquacao = function (str) {
	var i, len, c, nivelAtual, retorno, cache, novo, temp
	
	len = str.length
	retorno = []
	retorno.tipo = Sintaxe.TIPO_EQUACAO
	retorno.pai = null
	cache = ""
	nivelAtual = retorno
	
	var salvarCache = function () {
		if (cache.length) {
			nivelAtual.push(cache)
			cache = ""
		}
	}
	
	// Extrai os diferentes níveis de parênteses
	for (i=0; i<len; i++) {
		c = str[i]
		if (c == "(") {
			salvarCache()
			novo = []
			nivelAtual.push(novo)
			novo.pai = nivelAtual
			novo.tipo = Sintaxe.TIPO_PARENTESES
			nivelAtual = novo
		} else if (c == ")") {
			salvarCache()
			if (nivelAtual.pai) {
				temp = nivelAtual
				nivelAtual = nivelAtual.pai
				delete temp.pai
			} else
				throw 0
		} else if (c == " ")
			salvarCache()
		else
			cache += c
	}
	salvarCache()
	
	if (nivelAtual.pai == null && i == len) {
		delete nivelAtual.pai
		return retorno
	}
	throw 0
}

// Separa operadores, variáveis e números de uma string
// Retorna uma array com objetos com as propriedades valor (string) e tipo (Sintaxe.TIPO_*)
// Lança uma exceção em caso de erro
Sintaxe.separar = function (str) {
	var i, sub, partes = []
	
	for (i=str.length; i>0; i--) {
		sub = str.substr(0, i)
		if (sub.match(/^∂[A-Za-zΣ▶πα→←↓↑γδεηθλρστωΔΠΩµß][A-Za-z0-9Σ▶πα→←↓↑γδεηθλρστωΔΠΩµß]*$/)) {
			partes.push({valor: sub, tipo: Sintaxe.TIPO_DERIVADA})
			str = str.substr(i)
			i = str.length+1
		} else if (["+", "-", "*", "/", "^", "!", "=", "<", "\u2264", ">", "\u2265", "\u2260", "=="].indexOf(sub) != -1) {
			partes.push({valor: sub, tipo: Sintaxe.TIPO_OPERADOR})
			str = str.substr(i)
			i = str.length+1
		} else if (sub.match(/^[$%&?A-Za-z~Σ▶πα→←↓↑γδεηθλρστωΔΠΩµß][$%&0-9?A-Za-z~Σ▶πα→←↓↑γδεηθλρστωΔΠΩµß]*$/)) {
			partes.push({valor: sub, tipo: Sintaxe.TIPO_VARIAVEL})
			str = str.substr(i)
			i = str.length+1
		} else if (sub.match(/^\d*(\.\d*)?(E[+-]?\d+)?$/)) {
			partes.push({valor: sub, tipo: Sintaxe.TIPO_NUMERO})
			str = str.substr(i)
			i = str.length+1
		}
	}
	
	if (str != "")
		throw 0
	
	return partes
}

// Interpreta uma estrutura já inflada
Sintaxe.interpretar = function (estrutura) {
	var i
	
	for (i=0; i<estrutura.length; i++) {
		if (estrutura[i].tipo == Sintaxe.TIPO_VETOR)
			Sintaxe.interpretar(estrutura[i])
		else if (estrutura[i].tipo == Sintaxe.TIPO_EQUACAO)
			Sintaxe.interpretarEquacao(estrutura[i])
		else if (estrutura[i].match(/^\d*(\.\d*)?(E[+-]?\d+)?$/))
			estrutura[i] = {valor: estrutura, tipo: Sintaxe.TIPO_NUMERO}
		else
			throw 0
	}
}

// Interpreta uma estrutura de equação já inflada
Sintaxe.interpretarEquacao = function (estrutura) {
	var i, el, len, j, args, elAntes, elDepois, valor
	
	// Faz uma expansão básica
	for (i=0; i<estrutura.length; i++) {
		el = estrutura[i]
		if (typeof el == "string") {
			args = [i, 1].concat(Sintaxe.separar(el))
			;[].splice.apply(estrutura, args)
			i += args.length-3
		} else
			Sintaxe.interpretarEquacao(el)
	}
	
	// Transforma variável seguido de parênteses em função
	// Também valida derivadas
	for (i=0; i<estrutura.length; i++) {
		el = estrutura[i]
		elDepois = estrutura[i+1]
		if (el.tipo == Sintaxe.TIPO_DERIVADA)
			if (elDepois && elDepois.tipo == Sintaxe.TIPO_PARENTESES) {
				valor = [el.valor].concat(elDepois)
				valor.tipo = Sintaxe.TIPO_FUNCAO
				estrutura.splice(i, 2, valor)
			} else
				throw 0
		else if (el.tipo == Sintaxe.TIPO_VARIAVEL && elDepois && elDepois.tipo == Sintaxe.TIPO_PARENTESES) {
			valor = [el.valor].concat(elDepois)
			valor.tipo = Sintaxe.TIPO_FUNCAO
			estrutura.splice(i, 2, valor)
		}
	}
	
	var aplicarUnarios = function (ops, sentido) {
		var temp
		for (i=0; i<estrutura.length; i++) {
			j = sentido==1 ? i : estrutura.length-i-1
			el = estrutura[j]
			elAntes = j==0 ? null : estrutura[j-1]
			elDepois = j==estrutura.length-1 ? null : estrutura[j+1]
			if (sentido == -1) {
				temp = elDepois
				elDepois = elAntes
				elAntes = temp
			}
			if (el.tipo == Sintaxe.TIPO_OPERADOR && ops.indexOf(el.valor) != -1) {
				if (elAntes && elAntes.tipo != Sintaxe.TIPO_OPERADOR && (elDepois == null || elDepois.tipo == Sintaxe.TIPO_OPERADOR)) {
					valor = [el.valor, elAntes]
					valor.tipo = Sintaxe.TIPO_FUNCAO
					estrutura.splice(sentido==1 ? j-1 : j, 2, valor)
					i--
				}
			}
		}
	}
	
	var aplicarBinarios = function (ops, sentido) {
		for (i=0; i<estrutura.length; i++) {
			j = sentido==1 ? i : estrutura.length-i-1
			el = estrutura[j]
			elAntes = j==0 ? null : estrutura[j-1]
			elDepois = j==estrutura.length-1 ? null : estrutura[j+1]
			if (el.tipo == Sintaxe.TIPO_OPERADOR && ops.indexOf(el.valor) != -1) {
				if (elAntes && elAntes.tipo != Sintaxe.TIPO_OPERADOR && elDepois && elDepois.tipo != Sintaxe.TIPO_OPERADOR) {
					valor = [el.valor, elAntes, elDepois]
					valor.tipo = Sintaxe.TIPO_FUNCAO
					estrutura.splice(j-1, 3, valor)
					i--
				} else
					throw 0
			}
		}
	}
	
	// Aplica os operadores ordem de precedência
	// TODO: operador de derivada
	aplicarUnarios(["!"], 1)
	aplicarUnarios(["+", "-"], -1)
	aplicarBinarios(["^"], -1)
	aplicarBinarios(["*", "/"], 1)
	aplicarBinarios(["+", "-"], 1)
	aplicarBinarios(["<", "\x89", ">", "\x88"], 1)
	aplicarBinarios(["==", "\x8A"], 1)
	aplicarBinarios(["="], -1)
	
	if (estrutura.length > 1)
		throw 0
}
