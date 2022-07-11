function Roll(t){
    var rand = Ro(100)
    document.getElementById('rollimg').style.width = '0%'
    document.getElementById('rolltxt').hidden = true
    document.getElementById('result').hidden = true
    document.getElementById('panel').hidden = false
    setTimeout(() => {
        document.getElementById('rollimg').style.width = '50%'
    }, 250);
    setTimeout(() => {
        document.getElementById('rolltxt').innerHTML = rand
        document.getElementById('rolltxt').hidden = false
        document.getElementById('result').hidden = false
        document.getElementById('result').innerHTML = checkResult(rand, t.parentNode.getElementsByTagName('input')[0].value)
    }, 500);
    document.getElementById('using').value = t.parentNode.getElementsByTagName('input')[0].value;
    document.getElementById('using2').innerHTML = "Normal: " + t.parentNode.getElementsByTagName('input')[0].value + "<br>Bom: " + Math.floor(t.parentNode.getElementsByTagName('input')[0].value/2) + "<br>Extremo: " + Math.floor(t.parentNode.getElementsByTagName('input')[0].value/5);
    document.getElementById('rerollbtn').setAttribute('onclick', 'Roll(this)')
}
function RollCustom(){
    var rand = R(document.getElementById('customd').value)
    document.getElementById('rollimg').style.width = '0%'
    document.getElementById('rolltxt').hidden = true
    document.getElementById('result').hidden = true
    document.getElementById('panel').hidden = false
    setTimeout(() => {
        document.getElementById('rollimg').style.width = '50%'
    }, 250);
    setTimeout(() => {
        document.getElementById('rolltxt').innerHTML = rand[0]
        document.getElementById('rolltxt').hidden = false
        document.getElementById('using2').innerHTML = "Rolagem: " + document.getElementById('customd').value + "<br>" + rand[1];
    }, 500);
    document.getElementById('using').value = document.getElementById('customd').value;
    document.getElementById('using2').innerHTML = "Rolagem: " + document.getElementById('customd').value;
    document.getElementById('rerollbtn').setAttribute('onclick', 'RollCustom()')
}
function R(s){
    var s2 = s.split("d")
    s2 = s2.flat(5)
    var res = 0;
    var showRes = '';
    for(var i = 0; i< s2.length; i++){
        var s3;
        if (s2[i].search(/\+/) != -1){
            s3 = s2[i].split('+')
            for(var e = 1; e < s3.length; e+=2){
                s3.splice(e, 0, "+")
            }
            s2[i] = s3
        }
    }
    s2 = s2.flat(5)
    for(var i = 0; i < s2.length; i++){
        if (s2[i].search(/\-/) != -1){
            s3 = s2[i].split('-')
            for(var e = 1; e < s3.length; e+=2){
                s3.splice(e, 0, "-")
            }
            s2[i] = s3
        }
    }
    s2 = s2.flat(5)
    for(var i = 0; i < s2.length; i++){
        if (s2[i].search(/\//) != -1){
            s3 = s2[i].split('/')
            for(var e = 1; e < s3.length; e+=2){
                s3.splice(e, 0, "/")
            }
            s2[i] = s3
        }
    }
    s2 = s2.flat(5)
    for(var i = 0; i < s2.length; i++){
        if (s2[i].search(/\*/) != -1){
            s3 = s2[i].split('*')
            for(var e = 1; e < s3.length; e+=2){
                s3.splice(e, 0, "*")
            }
            s2[i] = s3
        }
    }
    s2 = s2.flat(5)
    for(var i = 0; i<s2.length; i++){
        if(s2[i] == ''){
            s2[i] = '1'
        }
    }
    for (var i = 0; i< s2.length; i++){
        if (s2[i] == '+' || s2[i] == '-' || s2[i] == '/' || s2[i] == '*'){
            if (s2[i+2] == '+' || s2[i+2] == '-' || s2[i+2] == '/' || (i+2) >= s2.length || s2[i+2] == "*"){
                if(s2[i] == '+'){
                    res += parseFloat(s2[i+1])
                    showRes += ' + [' + s2[i+1] + ']' 
                } else if (s2[i] == '-'){
                    res -= parseFloat(s2[i+1])
                    showRes += ' - [' + s2[i+1] + ']' 
                } else if (s2[i] == '/'){
                    res = Math.floor(res / parseFloat(s2[i+1]))
                    showRes += ' / [' + s2[i+1] + ']' 
                } else if (s2[i] == '*'){
                    res = Math.floor(res * parseFloat(s2[i+1]))
                    showRes += ' * [' + s2[i+1] + ']' 
                }
            }
        }
        else {
            if ((i+1) < s2.length){
                if(s2[i+1] == '+' || s2[i+1] == '-' || s2[i+1] == '/' || s2[i+1] == '*'){

                }
                else {
                    var rollRes = 0;
                    var rollDices = [];
                    if (s2[i-1] == '-'){
                        showRes += ' - '
                    } else if (s2[i-1] == '+'){
                        showRes += ' + '
                    }
                    showRes += '['
                    for(var o = 0; o<s2[i]; o++){
                        var r = Ro(s2[i+1])
                        if (s2[i-1] == '-'){
                            rollRes -= r
                            showRes += r + ', ';
                        }else{
                            rollRes += r
                            showRes += r + ', ';
                        }
                        rollDices[rollDices.length] = r
                    }
                    showRes = showRes.slice(0, -2)
                    showRes += ']'
                    res += rollRes;
                }
            }
        }
    }
    return [res, showRes];
}
function Ro(q){
    return Math.floor(Math.random() * q) + 1
}
function checkResult(rand, check){
    var ex = check/5;
    var go = check/2;
    if (rand <= ex){
        if (rand == 1){
            return "Crítico"
        } else {
            return "Extremo"
        }
    }
    else if (rand <= go){
        return "Bom"
    }
    else if (rand <= check){
        return "Normal"
    } else if (rand == 100){
        return "Desastre"
    }
    else {
        return "Falha"
    }

}
function cvalue(t){
    t.setAttribute('value', t.value)
}
function save() {
    var n;
    if (document.getElementById('name').value != ''){
        n = document.getElementById('name').value
    } else {
        n = "CoC"
    }
    var blob = new Blob([document.body.innerHTML],
                { type: "text/plain;charset=utf-8" });
    saveAs(blob, n + ".sheet")
}
createSkills();
function createSkills(){
    var skpt = [
        ["Antropologia", 1, false], 
        ["Armas de Fogo (Pistolas)", 20, false], 
        ["Armas de Fogo (Rifles)", 25, false],
        ["Arqueologia", 1, false],
        ["Arremessar", 20, false],
        ["Armas 1", 25, true],
        ["Arte/Ofício 1", 5, true],
        ["Arte/Ofício 2", 5, true],
        ["Arte/Ofício 3", 5, true],
        ["Ciência 1", 1, true],
        ["Ciência 2", 1, true],
        ["Idioma (Nativo)", 0, true],
        ["Idioma 1", 1, true],
        ["Idioma 2", 1, true],
        ["Idioma 3", 1, true],
        ["Luta 1", 25, true],
        ["Luta 2", 25, true],
        ["Sobrevivência", 10, true],
        ["Avaliação", 5, false],
        ["Cavalgar", 5, false],
        ["Charme", 15, false],
        ["Chaveiro", 1, false],
        ["Ciência", 1, false],
        ["Consertos Elétricos", 10, false],
        ["Consertos Mecânicos", 5, false],
        ["Contabilidade", 5, false],
        ["Direito", 5, false],
        ["Dirigir Automóvel", 20, false],
        ["Disfarce", 5, false],
        ["Encontrar", 25, false],
        ["Escutar", 20, false],
        ["Escalar", 20, false],
        ["Esquivar", 0, false],
        ["Lábia", 5, false],
        ["Intimidação", 15, false],
        ["História", 5, false],
        ["Furtividade", 20, false],
        ["Luta (Briga)", 25, false],
        ["Medicina", 1, false],
        ["Mythos de Cthulhu", 0, false],
        ["Mundo Natural", 10, false],
        ["Natação", 20, false],
        ["Navegação", 10, false],
        ["Nível de Crédito", 0, false],
        ["Ocultismo", 5, false],
        ["Operar Maquinário Pesado", 1, false],
        ["Persuasão", 10, false],
        ["Pilotar", 1, false],
        ["Prestidigitação", 10, false],
        ["Primeiros Socorros", 30, false],
        ["Psicanálise", 1, false],
        ["Psicologia", 10, false],
        ["Saltar", 20, false],
        ["Rastrear", 10, false],
        ["Usar Bibliotecas", 20, false]
    ];
    skpt.sort();
    console.log(skpt)
    var sken = [];
}