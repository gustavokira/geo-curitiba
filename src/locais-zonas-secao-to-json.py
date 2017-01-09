# -*- coding: utf-8 -*-

import fileinput
import re
import json

zona = 0
locais = []
current = {}
current['secoes'] = []
for line in fileinput.input():
	if line.startswith("Zona"):
		string = re.sub('Zona: ', '', line.rstrip())
		string = re.sub(' Município: 75353-CURITIBA', '', string)
		zona = int(string)
		
	elif line.startswith("Seção(ões)/Aptos"):
		
		string = re.sub('Seção\(ões\)/Aptos : ', '', line.rstrip())
		elementos = string.split(" ")
		for e in elementos:
			se = e.split("/")
			codigo = se[0]
			aptos = se[1]
			secao = {}
			secao['codigo'] = codigo
			secao['aptos'] = int(aptos)
			current['secoes'].append(secao)
		

	elif line.startswith("Local"):
		string = re.sub('Local : ', '', line.rstrip())
		elementos = string.split("-")
		codigo = elementos[0]
		nome = elementos[1]
		current['codigo'] = codigo
		current['nome'] = nome
		
	elif line.startswith("Endereço"):
		endereco = re.sub('Endereço : ', '', line.rstrip())
		current['endereco'] = endereco

	elif line.startswith("Bairro"):
		string = re.sub('Bairro : ', '', line.rstrip())
		string = re.sub(' Seções: ', ',', string)
		string = re.sub(' Eleitores: ', ',', string.replace(".",""))
		string = re.sub(' Seções Previstas: ', ',', string)
		elementos = string.split(",")
		bairro = elementos[0]
		secoes = elementos[1]
		eleitores = elementos[2]
		previstas = elementos[3]
		current['bairro'] = bairro
		current['secoesQty'] = int(secoes)
		current['eleitoresQty'] = int(eleitores)
		current['previstasQty'] = int(previstas)
		
	elif line.startswith("\n"):
		locais.append(current)
		current = {}
		current['secoes'] = []
	else:
		elementos = line.rstrip().split(" ")
		for e in elementos:
			se = e.split("/")
			codigo = se[0]
			aptos = se[1]
			secao = {}
			secao['codigo'] = codigo
			secao['aptos'] = int(aptos)
			current['secoes'].append(secao)

	current['zona'] = zona
			
jsonarray = json.dumps(locais, ensure_ascii=False,indent=4)
print jsonarray
