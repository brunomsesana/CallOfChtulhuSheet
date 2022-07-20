langu(document.getElementById('lsel').value)
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
    if (document.getElementById('lsel').value == 'pt-br'){
        document.getElementById('using2').innerHTML = "Normal: " + t.parentNode.getElementsByTagName('input')[0].value + "<br>Bom: " + Math.floor(t.parentNode.getElementsByTagName('input')[0].value/2) + "<br>Extremo: " + Math.floor(t.parentNode.getElementsByTagName('input')[0].value/5);
    } else  if (document.getElementById('lsel').value == 'en-us'){
        document.getElementById('using2').innerHTML = "Normal: " + t.parentNode.getElementsByTagName('input')[0].value + "<br>Good: " + Math.floor(t.parentNode.getElementsByTagName('input')[0].value/2) + "<br>Extreme: " + Math.floor(t.parentNode.getElementsByTagName('input')[0].value/5);
    }
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
    if (document.getElementById('lsel').value == 'pt-br'){
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
    } else if (document.getElementById('lsel').value == 'en-us'){
        if (rand <= ex){
            if (rand == 1){
                return "Critical"
            } else {
                return "Extreme"
            }
        }
        else if (rand <= go){
            return "Good"
        }
        else if (rand <= check){
            return "Normal"
        } else if (rand == 100){
            return "Disaster"
        }
        else {
            return "Failure"
        }
    }

}
function cvalue(t){
    t.setAttribute('value', t.value)
}
function save() {
    // var n;
    // if (document.getElementById('name').value != ''){
    //     n = document.getElementById('name').value
    // } else {
    //     n = "CoC"
    // }
    // var blob = new Blob([document.body.innerHTML],
    //             { type: "text/plain;charset=utf-8" });
    // saveAs(blob, n + ".sheet")
    $.post('/save', {skills: translateSk(), characteristics: translateChar(), sheetid: document.getElementById('sheetid').value, img: document.getElementById('characterimg').getAttribute('src').toString()})
}
function del(){
    $.post('/erase', {sheetid: document.getElementById('sheetid').value})
}
function createSkills(l){
    var csks = [];
    document.getElementById('skills').innerHTML = '<h2 id="sknam">Perícias</h2><div style="clear: both;"></div><div style="clear: both;" class="centralized container" id="customDDiv"><input style="display: inline-block;" class="form-control centralized diceC" type="text" name="custom" id="customd" placeholder="Dados (Ex: 1d4+1d8+5)"><button class="btn btn-primary" onclick="RollCustom()">Roll</button></div>'
    document.getElementById('skills').hidden = false
    var sk;
    var in1 = document.createElement('div')
    in1.className = 'innerWin container sk'
    document.getElementById('skills').insertBefore(in1, document.getElementById('customDDiv'))
    var in2 = document.createElement('div')
    in2.className = 'innerWin container sk'
    document.getElementById('skills').insertBefore(in2, document.getElementById('customDDiv'))
    var in3 = document.createElement('div')
    in3.className = 'innerWin container sk'
    document.getElementById('skills').insertBefore(in3, document.getElementById('customDDiv'))
    var in4 = document.createElement('div')
    in4.className = 'innerWin container sk'
    document.getElementById('skills').insertBefore(in4, document.getElementById('customDDiv'))
    var skpt = [
        ["Antropologia", 1, false, 2], 
        ["Armas de Fogo (Pistolas)", 20, false, 20], 
        ["Armas de Fogo (Rifles)", 25, false, 21],
        ["Armas 1", 25, true, 22],
        ["Arqueologia", 1, false, 4],
        ["Arremessar", 20, false, 54],
        ["Arte/Ofício 1", 5, true, 5],
        ["Arte/Ofício 2", 5, true, 6],
        ["Arte/Ofício 3", 5, true, 7],
        ["Avaliação", 5, false, 3],
        ["Cavalgar", 5, false, 45],
        ["Charme", 15, false, 8],
        ["Chaveiro", 1, false, 34],
        ["Ciência", 1, false, 46],
        ["Ciência 1", 1, true, 47],
        ["Ciência 2", 1, true, 48],
        ["Consertos Elétricos", 10, false, 15],
        ["Consertos Mecânicos", 5, false, 35],
        ["Contabilidade", 5, false, 1],
        ["Direito", 5, false, 31],
        ["Dirigir Automóvel", 20, false, 14],
        ["Disfarce", 5, false, 12],
        ["Encontrar", 25, false, 50],
        ["Escalar", 20, false, 9],
        ["Escutar", 20, false, 33],
        ["Esquivar", 0, false, 13],
        ["Furtividade", 20, false, 51],
        ["História", 5, false, 24],
        ["Idioma (Nativo)", 0, true, 27],
        ["Idioma 1", 1, true, 28],
        ["Idioma 2", 1, true, 29],
        ["Idioma 3", 1, true, 30],
        ["Intimidação", 15, false, 25],
        ["Lábia", 5, false, 16],
        ["Luta (Briga)", 25, false, 17],
        ["Luta 1", 25, true, 18],
        ["Luta 2", 25, true, 19],
        ["Medicina", 1, false, 36],
        ["Mundo Natural", 10, false, 37],
        ["Mythos de Cthulhu", 0, false, 11],
        ["Natação", 20, false, 53],
        ["Navegação", 10, false, 38],
        ["Nível de Crédito", 0, false, 10],
        ["Ocultismo", 5, false, 39],
        ["Operar Maquinário Pesado", 1, false, 40],
        ["Persuasão", 10, false, 41],
        ["Pilotar", 1, true, 42],
        ["Prestidigitação", 10, false, 49],
        ["Primeiros Socorros", 30, false, 23],
        ["Psicanálise", 1, false, 43],
        ["Psicologia", 10, false, 44],
        ["Rastrear", 10, false, 55],
        ["Saltar", 20, false, 26],
        ["Sobrevivência", 10, true, 52],
        ["Usar Bibliotecas", 20, false, 32],
        ["Personalizado", 0, true, 56],
        ["Personalizado", 0, true, 57],
        ["Personalizado", 0, true, 58],
        ["Personalizado", 0, true, 59],
        ["Personalizado", 0, true, 60]
    ];
    var sken = [
        ["Accounting", 5, false, 1],
        ["Anthropology", 1, false, 2], 
        ["Appraise", 5, false, 3],
        ["Archaeology", 1, false, 4],
        ["Art/Craft 1", 5, true, 5],
        ["Art/Craft 2", 5, true, 6],
        ["Art/Craft 3", 5, true, 7],
        ["Charm", 15, false, 8],
        ["Climb", 20, false, 9],
        ["Credit Rating", 0, false, 10],
        ["Cthulhu Mythos", 0, false, 11],
        ["Disguise", 5, false, 12],
        ["Dodge", 0, false, 13],
        ["Drive Automobile", 20, false, 14],
        ["Electric Repair", 10, false, 15],
        ["Fast Talk", 5, false, 16],
        ["Fighting (Brawl)", 25, false, 17],
        ["Fight 1", 25, true, 18],
        ["Fight 2", 25, true, 19],
        ["Firearms (Handguns)", 20, false, 20], 
        ["Firearms (Rifles)", 25, false, 21],
        ["Firearms 1", 25, true, 22],
        ["First Aid", 30, false, 23],
        ["History", 5, false, 24],
        ["Intimidate", 15, false, 25],
        ["Jump", 20, false, 26],
        ["(Own) Language", 0, true, 27],
        ["Language 1", 1, true, 28],
        ["Language 2", 1, true, 29],
        ["Language 3", 1, true, 30],
        ["Law", 5, false, 31],
        ["Library Use", 20, false, 32],
        ["Listen", 20, false, 33],
        ["Locksmith", 1, false, 34],
        ["Mechanical Repair", 5, false, 35],
        ["Medicine", 1, false, 36],
        ["Natural World", 10, false, 37],
        ["Navigate", 10, false, 38],
        ["Occult", 5, false, 39],
        ["Operate Heavy Machine", 1, false, 40],
        ["Persuade", 10, false, 41],
        ["Pilot", 1, true, 42],
        ["Psychanalysis", 1, false, 43],
        ["Psychology", 10, false, 44],
        ["Ride", 5, false, 45],
        ["Science", 1, false, 46],
        ["Science 1", 1, true, 47],
        ["Science 2", 1, true, 48],
        ["Sleight of Hand", 10, false, 49],
        ["Spot Hidden", 25, false, 50],
        ["Stealth", 20, false, 51],
        ["Survival", 10, true, 52],
        ["Swim", 20, false, 53],
        ["Throw", 20, false, 54],
        ["Track", 10, false, 55],
        ["Custom", 0, true, 56],
        ["Custom", 0, true, 57],
        ["Custom", 0, true, 58],
        ["Custom", 0, true, 59],
        ["Custom", 0, true, 60]
    ];
    if (l == 'pt-br'){
        sk = skpt;
    } else if (l == 'en-us'){
        sk = sken;
    }
    for (var i = 0; i < sk.length; i++){
        var div1 = document.createElement('div')
        div1.setAttribute('name', "sk" + sk[i][3])
        div1.style = "margin-bottom: 10px; padding: 10px; overflow-x: auto;"
        div1.className = 'container ininnerWin'
        var div2 = document.createElement('div')
        div2.style = 'clear: both;'
        var div3 = document.createElement('div')
        div3.style = "width: 45%;"
        if (sk[i][2]){
            var inp = document.createElement('input')
            inp.setAttribute('onchange', 'cvalue(this)')
            inp.className = 'form-control inp'
            inp.style = 'float: left; margin-right: 10px;'
            inp.placeholder = '(' + sk[i][0] + ')'
            csks[csks.length] = "+1"
            inp.id = "csk" + csks.length;
            div3.appendChild(inp)
        } else {
            var h5 = document.createElement('h5')
            h5.style = 'float: left; margin-right: 10px;'
            h5.innerHTML = sk[i][0]
            div3.appendChild(h5)
        }
        var div4 = document.createElement('div')
        var btn = document.createElement('button')
        btn.style = 'float: right; margin-left: 5px;'
        btn.className = 'btn btn-primary'
        btn.setAttribute('onclick', 'Roll(this)')
        btn.innerHTML = 'Roll'
        var inp2 = document.createElement('input')
        inp2.setAttribute('onchange', 'cvalue(this)')
        inp2.type = 'number'
        inp2.name = 'sk' + sk[i][3]
        inp2.id = 'sk' + sk[i][3]
        inp2.className = 'form-control inp'
        inp2.style = 'float: right; width: 10%;'
        inp2.value = sk[i][1]
        var div5 = document.createElement('div')
        div5.style = 'clear: both;'
        div4.appendChild(btn)
        div4.appendChild(inp2)
        div1.appendChild(div2)
        div1.appendChild(div3)
        div1.appendChild(div4)
        div1.appendChild(div5)
        if (i < 15){
            in1.appendChild(div1)
        } else if (i < 30){
            in2.appendChild(div1)
        } else if (i < 45){
            in3.appendChild(div1)
        } else if (i < 60){
            in4.appendChild(div1)
        }
    }
    if (l == "en-us"){
        document.getElementById('sknam').innerHTML = "Skills"
        document.getElementById('customd').placeholder = "Dice (E.g. 1d4+1d6)"
    }
}
function createChar(l){
    document.getElementById("char").hidden = false
    if (l == "pt-br"){

        document.getElementById("char1").placeholder = "Nome do Personagem"
        document.getElementById("char2").placeholder = "Nome do Player"
        document.getElementById("char3").placeholder = "Ocupação"
        document.getElementById("char4").placeholder = "Gênero"
        document.getElementById("char5").placeholder = "Idade"
        document.getElementById("char6").placeholder = "Residencia"
        document.getElementById("char7").placeholder = "Naturalidade"
        document.getElementById("strength").innerHTML = "Força:"
        document.getElementById("constitution").innerHTML = "Constituição:"
        document.getElementById("size").innerHTML = "Tamanho:"
        document.getElementById("dexterity").innerHTML = "Destreza:"
        document.getElementById("appearance").innerHTML = "Aparência:"
        document.getElementById("education").innerHTML = "Educação:"
        document.getElementById("inteligence").innerHTML = "Inteligencia:"
        document.getElementById("power").innerHTML = "Poder:"
        document.getElementById("appearance2").innerHTML = "Aparência:"
        document.getElementById("education2").innerHTML = "Educação:"
        document.getElementById("inteligence2").innerHTML = "Inteligencia:"
        document.getElementById("power2").innerHTML = "Poder:"
        document.getElementById("hp").innerHTML = "Pontos de Vida:"
        document.getElementById("san").innerHTML = "Sanidade:"
        document.getElementById("mp").innerHTML = "Pontos de Magia:"
        document.getElementById("luckn").innerHTML = "Sorte:"
        document.getElementById("btnimg").value = "Procurar"
        document.getElementById('charName').innerHTML = 'Características'
        document.getElementById('tlt').innerHTML = 'Ficha Automatica de Call of Cthulhu'
        document.getElementById('dis').innerHTML = 'Disclaimer: este é um site feito por fã para deixar a ficha mais fácil de usar'
        document.getElementById('saveBtn').innerHTML = 'Salvar'
        document.getElementById('delBtn').innerHTML = 'Apagar'
        document.getElementById('newSh').innerHTML = 'Nova Ficha'
    } else if (l == "en-us"){
        document.getElementById("char1").placeholder = "Character Name"
        document.getElementById("char2").placeholder = "Player Name"
        document.getElementById("char3").placeholder = "Occupation"
        document.getElementById("char4").placeholder = "Gender"
        document.getElementById("char5").placeholder = "Age"
        document.getElementById("char6").placeholder = "Residence"
        document.getElementById("char7").placeholder = "Birthplace"
        document.getElementById("strength").innerHTML = "Strength:"
        document.getElementById("constitution").innerHTML = "Constitution:"
        document.getElementById("size").innerHTML = "Size:"
        document.getElementById("dexterity").innerHTML = "Dexterity:"
        document.getElementById("appearance").innerHTML = "Appearance:"
        document.getElementById("education").innerHTML = "Education:"
        document.getElementById("inteligence").innerHTML = "Inteligence:"
        document.getElementById("power").innerHTML = "Power:"
        document.getElementById("appearance2").innerHTML = "Appearance:"
        document.getElementById("education2").innerHTML = "Education:"
        document.getElementById("inteligence2").innerHTML = "Inteligence:"
        document.getElementById("power2").innerHTML = "Power:"
        document.getElementById("hp").innerHTML = "Health Points:"
        document.getElementById("san").innerHTML = "Sanity:"
        document.getElementById("mp").innerHTML = "Magic Points:"
        document.getElementById("luckn").innerHTML = "Luck:"
        document.getElementById("btnimg").value = "Browse"
        document.getElementById('charName').innerHTML = 'Characteristics'
        document.getElementById('tlt').innerHTML = 'Call of Cthulhu Automatic Sheet'
        document.getElementById('dis').innerHTML = 'Disclaimer: this is a fanmade website to make the sheet easier to use'
        document.getElementById('saveBtn').innerHTML = 'Save'
        document.getElementById('delBtn').innerHTML = 'Delete'
        document.getElementById('newSh').innerHTML = 'New Sheet'
    }
}
function langu(l){
    createSkills(l)
    createChar(l)
    loadSheet()
}
function loadSheet(){
    console.log(sheets[document.getElementById('sheetnames').value - 2])
    if (document.getElementById('sheetnames').value != "new"){
        for (var i = 1; i <= 60; i++){
            document.getElementById('sk' + i).value = sheets[document.getElementById('sheetnames').value - 1].split('&#x3D;9-&#x3D;9--')[0].split(':::')[1].split('/0-0/')[i-1]
        }
        for (var i = 1; i <= 19; i++){
            document.getElementById('csk' + i).value = sheets[document.getElementById('sheetnames').value - 1].split('&#x3D;9-&#x3D;9--')[1].split(':::')[1].split('/0-0/')[i-1]
        }
        for (var i = 1; i <= 7; i++){
            document.getElementById('char' + i).value = sheets[document.getElementById('sheetnames').value - 2].split('&#x3D;9-&#x3D;9--')[0].split(':::')[1].split('/0-0/')[i-1]
        }
        for (var i = 1; i <= 8; i++){
            document.getElementById('att' + i).value = sheets[document.getElementById('sheetnames').value - 2].split('&#x3D;9-&#x3D;9--')[1].split(':::')[1].split('/0-0/')[i-1]
        }
        for (var i = 1; i <= 4; i++){
            document.getElementById('cur' + i).value = sheets[document.getElementById('sheetnames').value - 2].split('&#x3D;9-&#x3D;9--')[2].split(':::')[1].split('/0-0/')[i-1]
        }
        for (var i = 1; i <= 3; i++){
            document.getElementById('max' + i).value = sheets[document.getElementById('sheetnames').value - 2].split('&#x3D;9-&#x3D;9--')[3].split(':::')[1].split('/0-0/')[i-1]
        }
        // document.getElementById('characterimg').src = sheets[document.getElementById('sheetnames').value + 1]
        document.getElementById('delBtn').hidden = false;
        document.getElementById('sheetid').value = sheets[document.getElementById('sheetnames').value]
    } else {
        for (var i = 1; i <= 7; i++){
            document.getElementById('char' + i).value = ''
        }
        for (var i = 1; i <= 8; i++){
            document.getElementById('att' + i).value = ''
        }
        for (var i = 1; i <= 4; i++){
            document.getElementById('cur' + i).value = ''
        }
        for (var i = 1; i <= 3; i++){
            document.getElementById('max' + i).value = ''
        }
        document.getElementById('delBtn').hidden = true;
        document.getElementById('sheetid').value = "new"
    }
    document.getElementById('saveBtn').hidden = false
}
function translateSk(){
    var skills;
    var cskills;
    for (var i = 1; i <= 60; i++){
        if (skills){
            skills += "/0-0/" + document.getElementById("sk" + i).value
        } else {
            skills = "Skills:::" + document.getElementById("sk" + i).value
        }
    }
    for (var i = 1; i < 20; i++){
        if (cskills){
            cskills += "/0-0/" + document.getElementById("csk" + i).value
        } else {
            cskills = "Custom Skills Names:::" + document.getElementById("csk" + i).value
        }
    }
    var general = skills + "=9-=9--" + cskills
    return general
}
function translateChar(){
    var general;
    var chars;
    var atts;
    var cpoints = "Current points:::" + document.getElementById('cur1').value + '/0-0/' + document.getElementById('cur2').value + '/0-0/' + document.getElementById('cur3').value + '/0-0/' + document.getElementById('cur4').value;
    var mpoints = "Max points:::" + document.getElementById('max1').value + '/0-0/' + document.getElementById('max2').value + '/0-0/' + document.getElementById('max3').value;
    for (var i = 1; i <= 7; i++){
        if (chars){
            chars += "/0-0/" + document.getElementById("char" + i).value
        } else {
            chars = "Characteristics:::" + document.getElementById("char" + i).value
        }
    }
    for (var i = 1; i <= 8; i++){
        if (atts){
            atts += "/0-0/" + document.getElementById("att" + i).value
        } else {
            atts = "Attributes:::" + document.getElementById("att" + i).value
        }
    }
    general = chars + '=9-=9--' + atts + '=9-=9--' + cpoints + '=9-=9--' + mpoints
    return general;
}
createopts()
function createopts(){
    for (var i = 2; i < sheets.length; i+=4){
        var opt = document.createElement('option')
        opt.value = i
        opt.innerHTML = sheets[i-2].split('=9-=9--')[0].split(':::')[1].split('/0-0/')[0]
        document.getElementById('sheetnames').appendChild(opt)
    }
}