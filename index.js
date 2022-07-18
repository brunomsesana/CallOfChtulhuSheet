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
function createSkills(l){
    document.getElementById('skills').hidden = false
    document.getElementById('skills').innerHTML = '<h2 id="sknam">Perícias</h2>\n<div style="clear: both;"></div>\n<div style="clear: both;" class="centralized container" id="customDDiv">\n<input style="display: inline-block;" class="form-control centralized diceC" type="text" name="custom" id="customd" placeholder="Dados (Ex: 1d4+1d8+5)">\n<button class="btn btn-primary" onclick="RollCustom()">Roll</button>\n</div>'
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
        ["Antropologia", 1, false], 
        ["Armas de Fogo (Pistolas)", 20, false], 
        ["Armas de Fogo (Rifles)", 25, false],
        ["Armas 1", 25, true],
        ["Arqueologia", 1, false],
        ["Arremessar", 20, false],
        ["Arte/Ofício 1", 5, true],
        ["Arte/Ofício 2", 5, true],
        ["Arte/Ofício 3", 5, true],
        ["Avaliação", 5, false],
        ["Cavalgar", 5, false],
        ["Charme", 15, false],
        ["Chaveiro", 1, false],
        ["Ciência", 1, false],
        ["Ciência 1", 1, true],
        ["Ciência 2", 1, true],
        ["Consertos Elétricos", 10, false],
        ["Consertos Mecânicos", 5, false],
        ["Contabilidade", 5, false],
        ["Direito", 5, false],
        ["Dirigir Automóvel", 20, false],
        ["Disfarce", 5, false],
        ["Encontrar", 25, false],
        ["Idioma (Nativo)", 0, true],
        ["Escalar", 20, false],
        ["Escutar", 20, false],
        ["Esquivar", 0, false],
        ["Furtividade", 20, false],
        ["História", 5, false],
        ["Idioma 1", 1, true],
        ["Idioma 2", 1, true],
        ["Idioma 3", 1, true],
        ["Intimidação", 15, false],
        ["Lábia", 5, false],
        ["Luta (Briga)", 25, false],
        ["Luta 1", 25, true],
        ["Luta 2", 25, true],
        ["Medicina", 1, false],
        ["Mundo Natural", 10, false],
        ["Mythos de Cthulhu", 0, false],
        ["Natação", 20, false],
        ["Navegação", 10, false],
        ["Nível de Crédito", 0, false],
        ["Ocultismo", 5, false],
        ["Operar Maquinário Pesado", 1, false],
        ["Persuasão", 10, false],
        ["Pilotar", 1, true],
        ["Prestidigitação", 10, false],
        ["Primeiros Socorros", 30, false],
        ["Psicanálise", 1, false],
        ["Psicologia", 10, false],
        ["Rastrear", 10, false],
        ["Saltar", 20, false],
        ["Sobrevivência", 10, true],
        ["Usar Bibliotecas", 20, false],
        ["Custom", 0, true],
        ["Custom", 0, true],
        ["Custom", 0, true],
        ["Custom", 0, true],
        ["Custom", 0, true]
    ];
    var sken = [
        ["Accounting", 5, false],
        ["Anthropology", 1, false], 
        ["Appraise", 5, false],
        ["Archaeology", 1, false],
        ["Art/Craft 1", 5, true],
        ["Art/Craft 2", 5, true],
        ["Art/Craft 3", 5, true],
        ["Charm", 15, false],
        ["Climb", 20, false],
        ["Credit Rating", 0, false],
        ["Cthulhu Mythos", 0, false],
        ["Disguise", 5, false],
        ["Dodge", 0, false],
        ["Drive Automobile", 20, false],
        ["Electric Repair", 10, false],
        ["Fast Talk", 5, false],
        ["Fighting (Brawl)", 25, false],
        ["Fight 1", 25, true],
        ["Fight 2", 25, true],
        ["Firearms (Handguns)", 20, false], 
        ["Firearms (Rifles)", 25, false],
        ["Firearms 1", 25, true],
        ["First Aid", 30, false],
        ["History", 5, false],
        ["Intimidate", 15, false],
        ["Jump", 20, false],
        ["(Own) Language", 0, true],
        ["Language 1", 1, true],
        ["Language 2", 1, true],
        ["Language 3", 1, true],
        ["Law", 5, false],
        ["Library Use", 20, false],
        ["Listen", 20, false],
        ["Locksmith", 1, false],
        ["Mechanical Repair", 5, false],
        ["Medicine", 1, false],
        ["Natural World", 10, false],
        ["Navigate", 10, false],
        ["Occult", 5, false],
        ["Operate Heavy Machine", 1, false],
        ["Persuade", 10, false],
        ["Pilot", 1, true],
        ["Psychanalysis", 1, false],
        ["Psychology", 10, false],
        ["Ride", 5, false],
        ["Science", 1, false],
        ["Science 1", 1, true],
        ["Science 2", 1, true],
        ["Sleight of Hand", 10, false],
        ["Spot Hidden", 25, false],
        ["Stealth", 20, false],
        ["Survival", 10, true],
        ["Swim", 20, false],
        ["Throw", 20, false],
        ["Track", 10, false],
        ["Custom", 0, true],
        ["Custom", 0, true],
        ["Custom", 0, true],
        ["Custom", 0, true],
        ["Custom", 0, true]
    ];
    if (l == 'pt-br'){
        sk = skpt;
    } else if (l == 'en-us'){
        sk = sken;
    }
    for (var i = 0; i < sk.length; i++){
        var div1 = document.createElement('div')
        div1.setAttribute('name', "sk" + i)
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
        inp2.name = 'sk' + i
        inp2.id = 'sk' + i
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
    // var h2 = document.createElement("h2")
    // var div1 = document.createElement("div")
    // var img = document.createElement("img")
    // div1.style = "width: 20%;"
    // div1.className = "container innerWin ih"
    // img.id = "characterimg"
    // img.src = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fa3a7d93635679.5e699fbf9de8a.jpg"
    // img.style = "width: 90%;"
    // var inpimg = document.createElement("input")
    // inpimg.type = "file"
    // inpimg.id = "characterimgsel"
    // inpimg.accept = "image/gif, image/jpeg, image/png"
    // inpimg.className = "form-control"
    // inpimg.style = "display: none;"
    // inpimg.setAttribute("onchange", "img(this)")
    // var btnimg = document.createElement("input")
    // btnimg.type = "button"
    
    // btnimg.setAttribute("onclick", "document.getElementById('characterimgsel').click();")
    // btnimg.style = "width: 80%;"
    // btnimg.className = "btn btn-primary"
    // if (l == "pt-br"){
    //     h2.innerHTML = "Caracteristicas"
    //     btnimg.value = "Procurar"
    // } else if (l == "en-us"){
    //     h2.innerHTML = "Characteristics"
    //     btnimg.value = "Browse"
    // }
    // div1.appendChild(img)
    // div1.appendChild(inpimg)
    // div1.appendChild(btnimg)
    document.getElementById("char").hidden = false
    if (l == "pt-br"){

        document.getElementById("name").placeholder = "Nome do Personagem"
        document.getElementById("player").placeholder = "Nome do Player"
        document.getElementById("occupation").placeholder = "Ocupação"
        document.getElementById("age").placeholder = "Idade"
        document.getElementById("gen").placeholder = "Gênero"
        document.getElementById("residence").placeholder = "Residencia"
        document.getElementById("birthplace").placeholder = "Naturalidade"
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
    } else if (l == "en-us"){
        document.getElementById("name").placeholder = "Character Name"
        document.getElementById("player").placeholder = "Player Name"
        document.getElementById("occupation").placeholder = "Occupation"
        document.getElementById("age").placeholder = "Age"
        document.getElementById("gen").placeholder = "Gender"
        document.getElementById("residence").placeholder = "Residence"
        document.getElementById("birthplace").placeholder = "Birthplace"
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
    }
}
function langu(l, t){
    createSkills(l)
    createChar(l)
    t.hidden = true;
}