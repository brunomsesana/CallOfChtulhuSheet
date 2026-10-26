createSkills(document.getElementById('lsel').value)
createChar(document.getElementById('lsel').value)
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
    var n;
    var sheet = translateChar() + '-/DIVISOR/-' + translateSk() + '-/DIVISOR/-' + document.getElementById('characterimgdiv').innerHTML + '-/DIVISOR/-' + document.getElementById('lsel').value
    if (document.getElementById('char1').value != ''){
        n = document.getElementById('char1').value
    } else {
        n = "CoC"
    }
    var blob = new Blob([sheet],
                { type: "text/plain;charset=utf-8" });
    saveAs(blob, n + ".sheet")
    // $.post('/save', {skills: translateSk(), characteristics: translateChar(), sheetid: document.getElementById('sheetid').value, img: document.getElementById('characterimg').getAttribute('src').toString()})
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
        div1.className = 'container ininnerWin skill'
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
        document.getElementById('loadBtn').innerHTML = 'Carregar'
        document.getElementById('newSh').innerHTML = 'Nova Ficha'
        document.getElementById('htmlT').innerHTML = 'Ficha Call of Cthulhu'
        document.getElementById('pdfBtn').innerHTML = 'Exportar PDF'
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
        document.getElementById('loadBtn').innerHTML = 'Load'
        document.getElementById('newSh').innerHTML = 'New Sheet'
        document.getElementById('htmlT').innerHTML = 'Call of Cthulhu Sheet'
        document.getElementById('pdfBtn').innerHTML = 'Export PDF'
    }
}
function langu(l){
    var sks = translateSk()
    createSkills(l)
    createChar(l)
    for (var i = 1; i <= 60; i++){
        document.getElementById('sk' + i).value = sks.split('=9-=9--')[0].split(':::')[1].split('/0-0/')[i-1]
    }
    for (var i = 1; i <= 19; i++){
        document.getElementById('csk' + i).value = sks.split('=9-=9--')[1].split(':::')[1].split('/0-0/')[i-1]
    }
}
function loadSheet(sheet){
    if (sheet != ''){
        document.getElementById('lsel').value = sheet.split('-/DIVISOR/-')[3]
        createSkills(sheet.split('-/DIVISOR/-')[3])
        createChar(sheet.split('-/DIVISOR/-')[3])
        for (var i = 1; i <= 60; i++){
            document.getElementById('sk' + i).value = sheet.split('-/DIVISOR/-')[1].split('=9-=9--')[0].split(':::')[1].split('/0-0/')[i-1]
        }
        for (var i = 1; i <= 19; i++){
            document.getElementById('csk' + i).value = sheet.split('-/DIVISOR/-')[1].split('=9-=9--')[1].split(':::')[1].split('/0-0/')[i-1]
        }
        for (var i = 1; i <= 7; i++){
            document.getElementById('char' + i).value = sheet.split('-/DIVISOR/-')[0].split('=9-=9--')[0].split(':::')[1].split('/0-0/')[i-1]
        }
        for (var i = 1; i <= 8; i++){
            document.getElementById('att' + i).value = sheet.split('-/DIVISOR/-')[0].split('=9-=9--')[1].split(':::')[1].split('/0-0/')[i-1]
        }
        for (var i = 1; i <= 4; i++){
            document.getElementById('cur' + i).value = sheet.split('-/DIVISOR/-')[0].split('=9-=9--')[2].split(':::')[1].split('/0-0/')[i-1]
        }
        for (var i = 1; i <= 3; i++){
            document.getElementById('max' + i).value = sheet.split('-/DIVISOR/-')[0].split('=9-=9--')[3].split(':::')[1].split('/0-0/')[i-1]
        }
        document.getElementById('characterimgdiv').innerHTML = sheet.split('-/DIVISOR/-')[2]
        // document.getElementById('characterimg').src = sheets[document.getElementById('sheetnames').value + 1]
        document.getElementById('delBtn').hidden = false;
        document.getElementById('saveBtn').hidden = false
    }
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
// ============================================================================
// EXPORTAÇÃO EXATA PARA O PDF "FICHA-EDITAVEL-CHAMADO-DE-CTHULHU.pdf"
// ============================================================================

function calcHalf(val) {
    var n = parseInt(val, 10);
    return isNaN(n) || n <= 0 ? '' : String(Math.floor(n / 2));
}

function calcFifth(val) {
    var n = parseInt(val, 10);
    return isNaN(n) || n <= 0 ? '' : String(Math.floor(n / 5));
}

// Calcula Bônus de Dano (DamageBonus) e Corpo (Build) automaticamente (FOR + TAM)
function calcularBDeCorpo(forca, tamanho) {
    var s = parseInt(forca, 10);
    var z = parseInt(tamanho, 10);
    if (isNaN(s) || isNaN(z)) return { bd: '', build: '' };
    var soma = s + z;
    if (soma <= 64) return { bd: '-2', build: '-2' };
    if (soma <= 84) return { bd: '-1', build: '-1' };
    if (soma <= 124) return { bd: '0', build: '0' };
    if (soma <= 164) return { bd: '+1d4', build: '1' };
    if (soma <= 204) return { bd: '+1d6', build: '2' };
    if (soma <= 284) return { bd: '+2d6', build: '3' };
    if (soma <= 364) return { bd: '+3d6', build: '4' };
    return { bd: '+4d6', build: '5' };
}

// Calcula Taxa de Movimento (MOV) automaticamente (FOR, DES, TAM e Idade)
function calcularMOV(forca, destreza, tamanho, idade) {
    var s = parseInt(forca, 10);
    var d = parseInt(destreza, 10);
    var z = parseInt(tamanho, 10);
    var id = parseInt(idade, 10);
    if (isNaN(s) || isNaN(d) || isNaN(z)) return '';

    var mov = 8;
    if (d < z && s < z) mov = 7;
    else if (d > z && s > z) mov = 9;

    if (!isNaN(id)) {
        if (id >= 80) mov -= 5;
        else if (id >= 70) mov -= 4;
        else if (id >= 60) mov -= 3;
        else if (id >= 50) mov -= 2;
        else if (id >= 40) mov -= 1;
    }
    return String(Math.max(1, mov));
}

async function exportarParaPDF() {
    try {
        const urlPdf = 'FICHA-EDITAVEL-CHAMADO-DE-CTHULHU.pdf';
        const existingPdfBytes = await fetch(urlPdf).then(res => {
            if (!res.ok) throw new Error('Arquivo PDF não encontrado: ' + urlPdf);
            return res.arrayBuffer();
        });

        const { PDFDocument } = PDFLib;
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();

        const val = (id) => {
            const el = document.getElementById(id);
            return el && el.value !== undefined ? String(el.value).trim() : '';
        };

        const setTxt = (fieldName, value) => {
            if (value === undefined || value === null || value === '') return;
            try {
                form.getTextField(fieldName).setText(String(value));
            } catch (e) {
                console.warn('Campo não encontrado no PDF:', fieldName);
            }
        };

        const setSkill = (valId, regField, halfField, fifthField) => {
            const v = val(valId);
            if (v === '') return;
            if (regField) setTxt(regField, v);
            if (halfField) setTxt(halfField, calcHalf(v));
            if (fifthField) setTxt(fifthField, calcFifth(v));
        };

        // ====================================================================
        // 1. CABEÇALHO DO INVESTIGADOR
        // ====================================================================
        setTxt('Nome', val('char1'));
        setTxt('Jogador (a)', val('char2'));
        setTxt('Ocupação', val('char3'));
        setTxt('Sexo', val('char4'));
        setTxt('age', val('char5'));
        setTxt('Residência', val('char6'));
        setTxt('Nascimento', val('char7'));

        // ====================================================================
        // 2. CARACTERÍSTICAS / ATRIBUTOS E CÁLCULOS AUTOMÁTICOS
        // ====================================================================
        setSkill('att1', 'str', 'str 1/2', 'str 1/5');
        setSkill('att2', 'con', 'con Metade', 'con 1/5');
        setSkill('att3', 'siz', 'siz Metade', 'siz 1/5');
        setSkill('att4', 'dex', 'dex Metade', 'dex 1/5');
        setSkill('att5', 'app', 'app Metade', 'app 1/5');
        setSkill('att6', 'edu', 'edu Metade', 'edu 1/5');
        setSkill('att7', 'int', 'int Metade', 'int 1/5');
        setSkill('att8', 'pow', 'pow Metade', 'pow 1/5');

        setTxt('MaxHP', val('max1') || val('cur1'));
        setTxt('Sanity_Start', val('cur2') || val('att8'));
        setTxt('Sanity_Max', val('max2') || String(99 - (parseInt(val('sk11'), 10) || 0)));
        setTxt('LuckTotal', val('cur4'));

        // Cálculos automáticos de MOV, Bônus de Dano e Corpo (Build)[cite: 1]
        const mov = calcularMOV(val('att1'), val('att4'), val('att3'), val('char5'));
        setTxt('MOV', mov);

        const combate = calcularBDeCorpo(val('att1'), val('att3'));
        setTxt('DamageBonus', combate.bd);
        setTxt('Build', combate.build);

        setSkill('sk13', 'Dodge', 'Dodge_Copy_half', 'Dodge_Copy_fifth');
        setSkill('sk17', 'regular1', 'dificil1', 'extremo1');

        // ====================================================================
        // 3. PERÍCIAS FIXAS E CUSTOMIZADAS
        // ====================================================================
        setSkill('sk1',  'contabilidade', 'contabilidadeMetade', 'contabilidade1/5');
        setSkill('sk2',  'antropologia', 'antropologia1 Metade', 'antropologia1 1/5');
        setSkill('sk3',  'avaliaçãoo', 'a1 Metadeavaliação', 'a1 1/5avaliação');
        setSkill('sk4',  'arqueologia', 'arqueologiaMetade', 'arqueologia1/5');
        setSkill('sk8',  'charme', 'a1 Metadecharme', 'a1 1/5charme');
        setSkill('sk9',  'escalar', 'a1 Metadeescalar', 'a1 1/5escalar');
        setSkill('sk10', 'crédito', 'a1 Metadecrédito', 'a1 1/5crédito');
        setSkill('sk11', 'mythos', 'mythosaa', 'mythosaaa');
        setSkill('sk12', 'disfarce', 'a1 Metadedisfarce', 'a1 1/5disfarce');
        setSkill('sk13', 'esquivar', 'esquivar metade', 'esquivar quinto');
        setSkill('sk14', 'dirigir', 'a1 Metadedirigir', 'a1 1/5dirigir');
        setSkill('sk15', 'eletricos', 'eletricos Metade', 'eletricos 1/5');
        setSkill('sk16', 'labia', 'a1 Metadelabia', 'a1 1/5labia');
        setSkill('sk17', 'lutara', 'a1 Metadelutar', 'a1 1/5lutar');
        setSkill('sk20', 'pistolas', 'pistolasMetade', 'pistolas1/5');
        setSkill('sk21', 'rifles', 'a1 Metaderifles', 'rifles 1/5');
        setSkill('sk23', 'primeiros socorros', 'a1 Metadeprimeiros socorros', 'a1 1/5primeiros socorros');
        setSkill('sk24', 'historia', 'a1 Metadehistoria', 'a1 1/5historia');
        setSkill('sk25', 'intimidacao', 'a1 Metadeintimidacao', 'a1 1/5intimidacao');
        setSkill('sk26', 'saltar', 'a1 Metadesaltar', 'a1 1/5saltar');
        setSkill('sk31', 'direito', 'a1 Metadedireito', 'a1 1/5direito');
        setSkill('sk32', 'abranco12a', 'abranco12aaa', 'abranco12aaaaa');
        setSkill('sk33', 'escutar', 'a1 Metadeescutar', 'a1 1/5escutar');
        setSkill('sk34', 'chaveiro', 'a1 Metadechaveiro', 'a1 1/5chaveiro');
        setSkill('sk35', 'mecanicos', 'mecanicos Metade', 'mecanicos 1/5');
        setSkill('sk36', 'medicinaa', 'medicinaaa', 'medicinasd');
        setSkill('sk37', 'natural', 'naturalqq', 'a1 1/5natural');
        setSkill('sk38', 'navegacaoa', 'a1 Metadenavegacao', 'a1 1/5navegacao');
        setSkill('sk39', 'ocultismoa', 'a1 Metadeocultismo', 'a1 1/5ocultismo');
        setSkill('sk40', 'maquinario', 'a1 Metademaquinario', 'a1 1/5maquinario');
        setSkill('sk41', 'persuasao', 'a1 Metadepersuasao', 'a1 1/5persuasao');
        setSkill('sk43', 'psicanalise', 'a1 Metadepsicanalise', 'a1 1/5psicanalise');
        setSkill('sk44', 'psicologia', 'a1 Metadepsicologia', 'a1 1/5psicologia');
        setSkill('sk45', 'cavalgar', 'a1 Metadecavalgar', 'a1 1/5cavalgar');
        setSkill('sk46', 'ciencia', 'a1 Metadeciencia', 'a1 1/5ciencia');
        setSkill('sk49', 'prestidigitacaoa', 'a1 Metadeprestidigitacao', 'a1 1/5prestidigitacao');
        setSkill('sk50', 'encontrar', 'a1 Metadeencontrar', 'a1 1/5encontrar');
        setSkill('sk51', 'furtividade', 'a1 Metadefurtividade', 'a1 1/5furtividade');
        setSkill('sk53', 'natacaoa', 'a1 Metadenatacao', 'a1 1/5natacao');
        setSkill('sk54', 'arremessar', 'a1 Metadearremessar', 'a1 1/5arremessar');
        setSkill('sk55', 'rastrear', 'a1 Metaderastrear', 'a1 1/5rastrear');

        // Especializações Customizadas
        setTxt('ARTES OU OFICIOS', val('csk2'));
        setSkill('sk5', 'arte', 'a1 Metadearte', 'a1 1/5arte');
        setTxt('abranco1a', val('csk3'));
        setSkill('sk6', 'abranco', 'a1 Metadeabranco', 'a1 1/5abranco');
        setTxt('abranco2a', val('csk4'));
        setSkill('sk7', 'a1a1branco', 'a1 Metadea1a1branco', 'a1 1/5a1a1branco');
        setTxt('abranco4', val('csk5'));
        setSkill('sk47', '4branco', 'a1 Metade4branco', 'a1 1/54branco');
        setTxt('abranco6', val('csk6'));
        setSkill('sk48', 'abranco6a', 'branco1 Metadeabranco6', 'branco1 1/5abranco6');
        setTxt('LINGUA NATURALL', val('csk7'));
        setSkill('sk27', 'lingua natural', 'a1 Metadelingua natural', 'a1 1/5lingua natural');
        setTxt('LINGUA OUTRASS', val('csk8'));
        setSkill('sk28', 'lingua outra', 'a1 Metadelingua outra', 'a1 1/5lingua outra');
        setTxt('abranco8', val('csk9'));
        setSkill('sk29', 'abranco8a', 'a1 Metadecbranco0a', 'a1 1/5cbranco0a');
        setTxt('abranco9', val('csk10'));
        setSkill('sk30', 'abranco9a', 'abranco9aa', 'abranco10a');
        setTxt('abranco10', val('csk11'));
        setSkill('sk18', 'abranco10aa', 'abranco10aaa', 'abranco11a');
        setTxt('abranco11', val('csk12'));
        setSkill('sk19', 'abranco11aa', 'abranco11aaa', 'abranco12aa');
        setTxt('abranco13', val('csk13'));
        setSkill('sk42', 'pilotar', 'a1 Metadepilotar', 'a1 1/5pilotar');
        setTxt('abranco14', val('csk14'));
        setSkill('sk52', 'sobrevivencia', 'a1 Metadesobrevivencia', 'a1 1/5sobrevivencia');
        setTxt('abranco3a', val('csk1'));
        setSkill('sk22', 'abranco3', 'a1 Metadeaabranco3', 'a1 1/5aabranco3');
        setTxt('abranco7', val('csk15'));
        setSkill('sk56', 'abranco7a', 'branco2 Metadeabranco7a', 'branco2 1/5abranco7a');
        setTxt('abranco12', val('csk16'));
        setSkill('sk57', 'abranco13a', 'a1 Metadedbranco13aa', 'a1 1/5dbranco13');
        setTxt('abranco15', val('csk17'));
        setSkill('sk58', 'abranco14a', 'a1 Metadedbranco2', 'a1 1/5dbranco2');
        setTxt('abranco12aaaas', val('csk18'));
        setSkill('sk59', 'abranco15a', 'a1 Metadedbranco3', 'a1 1/5dbranco3');

        // ====================================================================
        // 4. TABELA DE ARMAS E COMBATE (Linha 12 e Linha 13 do PDF)
        // ====================================================================
        // Arma 1 (Linha 12)
        setTxt('armas12', val('armaNome1'));
        const reg1 = val('armaReg1');
        if (reg1) {
            setTxt('regular12', reg1);
            setTxt('dificil12', calcHalf(reg1));
            setTxt('extremo12', calcFifth(reg1));
        }
        setTxt('dano12', val('armaDano1'));
        setTxt('alcance12', val('armaAlc1'));
        setTxt('ataques12', val('armaAtaq1'));
        setTxt('munição12', val('armaMun1'));
        setTxt('defeito12', val('armaDef1'));

        // Arma 2 (Linha 13)
        setTxt('armas13', val('armaNome2'));
        const reg2 = val('armaReg2');
        if (reg2) {
            setTxt('regular13', reg2);
            setTxt('dificil13', calcHalf(reg2));
            setTxt('extremo13', calcFifth(reg2));
        }
        setTxt('dano13', val('armaDano2'));
        setTxt('alcance13', val('armaAlc2'));
        setTxt('ataques13', val('armaAtaq2'));
        setTxt('munição13', val('armaMun2'));
        setTxt('defeito13', val('armaDef2'));

        // ====================================================================
        // 5. ANTECEDENTES E DESCRIÇÃO PESSOAL (Página 2)
        // ====================================================================
        setTxt('Texto2', val('antDescricao'));
        setTxt('Texto4', val('antIdeologias'));
        setTxt('Texto6', val('antPessoas'));
        setTxt('Texto7', val('antLocais'));
        setTxt('Texto8', val('antPertences'));
        setTxt('Texto10', val('antFerimentos'));
        setTxt('Texto11', val('antTomos'));

        // ====================================================================
        // 6. FOTO DO PERSONAGEM (Página 2)
        // ====================================================================
        const imgEl = document.getElementById('characterimg');
        if (imgEl && imgEl.src && imgEl.src.startsWith('data:image/')) {
            try {
                const embeddedImg = imgEl.src.startsWith('data:image/png')
                    ? await pdfDoc.embedPng(imgEl.src)
                    : await pdfDoc.embedJpg(imgEl.src);

                const pages = pdfDoc.getPages();
                if (pages.length > 1) {
                    pages[1].drawImage(embeddedImg, {
                        x: 475,
                        y: 655,
                        width: 85,
                        height: 110
                    });
                }
            } catch (imgErr) {
                console.warn('Não foi possível inserir a imagem personalizada:', imgErr);
            }
        }

        const pdfBytes = await pdfDoc.save();
        const nomePersonagem = val('char1') || 'Investigador_CoC';
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, nomePersonagem + '.pdf');

    } catch (erro) {
        console.error('Erro ao gerar o PDF:', erro);
        alert('Não foi possível exportar o PDF. Verifique se o arquivo FICHA-EDITAVEL-CHAMADO-DE-CTHULHU.pdf está na mesma pasta.');
    }
}