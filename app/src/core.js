function Core () {
  var self = this;

  //https://gist.github.com/mbostock/3014589
  this.interpolationOptions = {
    lab:d3.interpolateLab,
    hcl:d3.interpolateHcl
  }

  this.POWTWO = 0;
  this.POWE = 1;
  this.SQRT = 2;
  this.LOGE = 3;
  this.LINEAR = 4;
  this.LOG10 = 5;


  this.scaleOptions = {
    'powtwo':{
      'name': 'exponencial 2',
      'scale':d3.scalePow().exponent(2)
    },
    'powe':{
      'name': 'exponencial e',
      'scale':d3.scalePow().exponent(Math.E)
    },
    'sqrt':{
      'name': 'raiz quadrada',
      'scale':d3.scalePow().exponent(1/2)
    },
    'logE':{
      'name': 'log e',
      'scale':d3.scaleLog().base(Math.E)
    },
    'linear':{
      'name': 'linear',
      'scale':d3.scaleLinear()
    }
  }

  this.getCurrentScale = function getCurrentScale(code){
    switch(code){
      case self.POWTWO:
        return d3.scalePow().exponent(2);
      case self.POWE:
        return d3.scalePow().exponent(Math.E);
      case self.SQRT:
        return d3.scalePow().exponent(1/2);
       case self.LOGE:
        return d3.scaleLog().base(Math.E);
        case self.LOG10:
        return d3.scaleLog().base(10);
       case self.LINEAR: 
        return d3.scaleLinear();
    }
  }

  this.bairros = {
    9:{codigo:9,nome:"ÁGUA VERDE", value:0},
    18:{codigo:18,nome:"JARDIM SOCIAL", value:0},
    57:{codigo:57,nome:"XAXIM", value:0},
    22:{codigo:22,nome:"JARDIM DAS AMÉRICAS", value:0},
    26:{codigo:26,nome:"GUAÍRA", value:0},
    36:{codigo:36,nome:"BAIRRO ALTO", value:0},
    2:{codigo:2,nome:"SÃO FRANCISCO", value:0},
    4:{codigo:4,nome:"ALTO DA GLÓRIA", value:0},
    55:{codigo:55,nome:"ATUBA", value:0},
    16:{codigo:16,nome:"CABRAL", value:0},
    40:{codigo:40,nome:"LINDÓIA", value:0},
    44:{codigo:44,nome:"CAMPO COMPRIDO", value:0},
    3:{codigo:3,nome:"CENTRO CÍVICO", value:0},
    15:{codigo:15,nome:"JUVEVÊ", value:0},
    17:{codigo:17,nome:"HUGO LANGE", value:0},
    20:{codigo:20,nome:"CAPÃO DA IMBUIA", value:0},
    29:{codigo:29,nome:"SEMINÁRIO", value:0},
    23:{codigo:23,nome:"GUABIROTUBA", value:0},
    24:{codigo:24,nome:"PRADO VELHO", value:0},
    25:{codigo:25,nome:"PAROLIN", value:0},
    27:{codigo:27,nome:"PORTÃO", value:0},
    28:{codigo:28,nome:"VILA IZABEL", value:0},
    30:{codigo:30,nome:"CAMPINA DO SIQUEIRA", value:0},
    34:{codigo:34,nome:"BOA VISTA", value:0},
    14:{codigo:14,nome:"AHÚ", value:0},
    6:{codigo:6,nome:"CRISTO REI", value:0},
    8:{codigo:8,nome:"REBOUÇAS", value:0},
    59:{codigo:59,nome:"ORLEANS", value:0},
    32:{codigo:32,nome:"PILARZINHO", value:0},
    45:{codigo:45,nome:"MOSSUNGUÊ", value:0},
    5:{codigo:5,nome:"ALTO DA RUA XV", value:0},
    7:{codigo:7,nome:"JARDIM BOTÂNICO", value:0},
    61:{codigo:61,nome:"BUTIATUVINHA", value:0},
    52:{codigo:52,nome:"BARREIRINHA", value:0},
    54:{codigo:54,nome:"TINGUI", value:0},
    56:{codigo:56,nome:"BOQUEIRÃO", value:0},
    69:{codigo:69,nome:"RIVIERA", value:0},
    65:{codigo:65,nome:"SÍTIO CERCADO", value:0},
    19:{codigo:19,nome:"TARUMÃ", value:0},
    33:{codigo:33,nome:"SÃO LOURENÇO", value:0},
    35:{codigo:35,nome:"BACACHERI", value:0},
    11:{codigo:11,nome:"BIGORRILHO", value:0},
    13:{codigo:13,nome:"BOM RETIRO", value:0},
    58:{codigo:58,nome:"CAPÃO RASO", value:0},
    38:{codigo:38,nome:"HAUER", value:0},
    39:{codigo:39,nome:"FANNY", value:0},
    41:{codigo:41,nome:"NOVO MUNDO", value:0},
    42:{codigo:42,nome:"FAZENDINHA", value:0},
    43:{codigo:43,nome:"SANTA QUITÉRIA", value:0},
    1:{codigo:1,nome:"CENTRO", value:0},
    50:{codigo:50,nome:"ABRANCHES", value:0},
    10:{codigo:10,nome:"BATEL", value:0},
    67:{codigo:67,nome:"SÃO MIGUEL", value:0},
    68:{codigo:68,nome:"AUGUSTA", value:0},
    70:{codigo:70,nome:"CAXIMBA", value:0},
    64:{codigo:64,nome:"ALTO BOQUEIRÃO", value:0},
    66:{codigo:66,nome:"PINHEIRINHO", value:0},
    74:{codigo:74,nome:"TATUQUARA", value:0},
    73:{codigo:73,nome:"UMBARÁ", value:0},
    71:{codigo:71,nome:"CAMPO DE SANTANA", value:0},
    72:{codigo:72,nome:"GANCHINHO", value:0},
    21:{codigo:21,nome:"CAJURU", value:0},
    37:{codigo:37,nome:"UBERABA", value:0},
    49:{codigo:49,nome:"TABOÃO", value:0},
    51:{codigo:51,nome:"CACHOEIRA", value:0},
    53:{codigo:53,nome:"SANTA CÂNDIDA", value:0},
    75:{codigo:75,nome:"CIDADE INDUSTRIAL DE CTBA", value:0},
    62:{codigo:62,nome:"LAMENHA PEQUENA", value:0},
    12:{codigo:12,nome:"MERCÊS", value:0},
    46:{codigo:46,nome:"SANTO INÁCIO", value:0},
    31:{codigo:31,nome:"VISTA ALEGRE", value:0},
    60:{codigo:60,nome:"SÃO BRAZ", value:0},
    48:{codigo:48,nome:"SÃO JOÃO", value:0},
    47:{codigo:47,nome:"CASCATINHA", value:0},
    63:{codigo:63,nome:"SANTA FELICIDADE",value:0}
  }

  this.currentState = {
    scale: self.LINEAR,
    interpolation: this.interpolationOptions.lab,
    color:{
      min:"#fff",
      max:"#000"
    }
  }

}