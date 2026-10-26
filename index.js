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
// Substitua a sua função R(s) inteira por esta:

function R(s) {
    let exprStr = s.toLowerCase().replace(/\s+/g, ''); // Remove espaços em branco
    let mathStr = exprStr;
    let visualStr = exprStr;
    
    let regex = /(\d+)d(\d+)/g;
    let rolagens = []; // Guarda os dados isolados de cada grupo (3d6, 1d8, etc)
    
    // 1º Passo: Rola os dados, soma para o cálculo matemático e salva os valores individuais
    mathStr = exprStr.replace(regex, function(match, qty, faces) {
        let q = parseInt(qty);
        let f = parseInt(faces);
        let sum = 0;
        let rolls = [];
        for (let i = 0; i < q; i++) {
            let roll = Math.floor(Math.random() * f) + 1;
            sum += roll;
            rolls.push(roll);
        }
        rolagens.push(rolls);
        return sum; // Retorna apenas a soma para o JavaScript calcular depois
    });

    // 2º Passo: Troca a string visual colocando os colchetes (Ex: 3d6 vira ([3]+[5]+[1]))
    let i = 0;
    visualStr = exprStr.replace(regex, function() {
        let rolls = rolagens[i];
        i++;
        if (rolls.length === 1) {
            return `[${rolls[0]}]`;
        } else {
            return `([${rolls.join(']+[')}])`;
        }
    });
    
    let res = 0;
    try {
        // Usa o interpretador nativo para calcular respeitando a ordem matemática (* e / primeiro)
        res = Math.floor(new Function('return ' + mathStr)());
    } catch(e) {
        return [0, "Fórmula inválida"];
    }
    
    // Retorna o resultado final e a string formatada: "3d6*5 ➔ ([3]+[5]+[1])*5 = 45"
    return [res, `${s} ➔ ${visualStr} = ${res}`];
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
}
function createChar(l){
    document.getElementById("char").hidden = false;
    const isPt = (l == "pt-br");

    document.getElementById("char1").placeholder = isPt ? "Nome do Personagem" : "Character Name";
    document.getElementById("char2").placeholder = isPt ? "Nome do Player" : "Player Name";
    document.getElementById("char3").placeholder = isPt ? "Ocupação" : "Occupation";
    document.getElementById("char4").placeholder = isPt ? "Gênero" : "Gender";
    document.getElementById("char5").placeholder = isPt ? "Idade" : "Age";
    document.getElementById("char6").placeholder = isPt ? "Residência" : "Residence";
    document.getElementById("char7").placeholder = isPt ? "Naturalidade" : "Birthplace";
    document.getElementById("strength").innerHTML = isPt ? "Força:" : "Strength:";
    document.getElementById("constitution").innerHTML = isPt ? "Constituição:" : "Constitution:";
    document.getElementById("size").innerHTML = isPt ? "Tamanho:" : "Size:";
    document.getElementById("dexterity").innerHTML = isPt ? "Destreza:" : "Dexterity:";
    document.getElementById("appearance").innerHTML = isPt ? "Aparência:" : "Appearance:";
    document.getElementById("education").innerHTML = isPt ? "Educação:" : "Education:";
    document.getElementById("inteligence").innerHTML = isPt ? "Inteligência:" : "Intelligence:";
    document.getElementById("power").innerHTML = isPt ? "Poder:" : "Power:";
    document.getElementById("appearance2").innerHTML = isPt ? "Aparência:" : "Appearance:";
    document.getElementById("education2").innerHTML = isPt ? "Educação:" : "Education:";
    document.getElementById("inteligence2").innerHTML = isPt ? "Inteligência:" : "Intelligence:";
    document.getElementById("power2").innerHTML = isPt ? "Poder:" : "Power:";
    document.getElementById("hp").innerHTML = isPt ? "Pontos de Vida:" : "Health Points:";
    document.getElementById("san").innerHTML = isPt ? "Sanidade:" : "Sanity:";
    document.getElementById("mp").innerHTML = isPt ? "Pontos de Magia:" : "Magic Points:";
    document.getElementById("luckn").innerHTML = isPt ? "Sorte:" : "Luck:";
    document.getElementById("btnimg").value = isPt ? "Procurar" : "Browse";
    document.getElementById('charName').innerHTML = isPt ? 'Características' : 'Characteristics';
    document.getElementById('tlt').innerHTML = isPt ? 'Ficha Automática de Call of Cthulhu' : 'Call of Cthulhu Automatic Sheet';
    document.getElementById('dis').innerHTML = isPt ? 'Disclaimer: este é um site feito por fã para deixar a ficha mais fácil de usar' : 'Disclaimer: this is a fanmade website to make the sheet easier to use';
    document.getElementById('saveBtn').innerHTML = isPt ? 'Salvar' : 'Save';
    document.getElementById('loadBtn').innerHTML = isPt ? 'Carregar' : 'Load';
    document.getElementById('newSh').innerHTML = isPt ? 'Nova Ficha' : 'New Sheet';
    document.getElementById('htmlT').innerHTML = isPt ? 'Ficha Call of Cthulhu' : 'Call of Cthulhu Sheet';
    if (document.getElementById('pdfBtn')) document.getElementById('pdfBtn').innerHTML = isPt ? 'Exportar PDF' : 'Export PDF';
    if (document.getElementById('wizardBtn')) document.getElementById('wizardBtn').innerHTML = isPt ? 'Criar Investigador' : 'Character Creator';
    if (document.getElementById('wizardTitle')) document.getElementById('wizardTitle').innerHTML = isPt ? 'Criação de Investigador' : 'Investigator Creation';

    // Tradução da Seção de Combate e Armas
    if (document.getElementById('combateTitle')) {
        document.getElementById('combateTitle').innerHTML = isPt ? 'Combate e Armas' : 'Combat & Weapons';
        for (let i = 1; i <= 4; i++) {
            if (document.getElementById('lblArma' + i)) document.getElementById('lblArma' + i).innerHTML = (isPt ? 'Arma ' : 'Weapon ') + i;
            if (document.getElementById('armaNome' + i)) document.getElementById('armaNome' + i).placeholder = isPt ? 'Nome da Arma' : 'Weapon Name';
            if (document.getElementById('armaReg' + i)) document.getElementById('armaReg' + i).placeholder = 'Regular (%)';
            if (document.getElementById('armaDano' + i)) document.getElementById('armaDano' + i).placeholder = isPt ? 'Dano' : 'Damage';
            if (document.getElementById('armaAlc' + i)) document.getElementById('armaAlc' + i).placeholder = isPt ? 'Alcance' : 'Range';
            if (document.getElementById('armaAtaq' + i)) document.getElementById('armaAtaq' + i).placeholder = isPt ? 'Ataques' : 'Attacks';
            if (document.getElementById('armaMun' + i)) document.getElementById('armaMun' + i).placeholder = isPt ? 'Munição' : 'Ammo';
            if (document.getElementById('armaDef' + i)) document.getElementById('armaDef' + i).placeholder = isPt ? 'Defeito' : 'Malf';
        }
    }

    // Tradução da Seção de Antecedentes
    if (document.getElementById('antecedentesTitle')) {
        document.getElementById('antecedentesTitle').innerHTML = isPt ? 'Antecedentes' : 'Background';
        document.getElementById('lblDescricao').innerHTML = isPt ? 'Descrição Pessoal' : 'Personal Description';
        document.getElementById('antDescricao').placeholder = isPt ? 'Aparência, traços de personalidade...' : 'Appearance, personality traits...';
        document.getElementById('lblIdeologias').innerHTML = isPt ? 'Ideologias / Crenças' : 'Ideology / Beliefs';
        document.getElementById('antIdeologias').placeholder = isPt ? 'Crenças, filosofias...' : 'Beliefs, philosophies...';
        document.getElementById('lblPessoas').innerHTML = isPt ? 'Pessoas Significativas' : 'Significant People';
        document.getElementById('antPessoas').placeholder = isPt ? 'Quem o seu investigador ama, odeia ou protege...' : 'Who your investigator loves, hates, or protects...';
        document.getElementById('lblLocais').innerHTML = isPt ? 'Locais Importantes' : 'Meaningful Locations';
        document.getElementById('antLocais').placeholder = isPt ? 'Lugares favoritos, refúgios...' : 'Favorite places, safe havens...';
        document.getElementById('lblPertences').innerHTML = isPt ? 'Pertences Queridos' : 'Treasured Possessions';
        document.getElementById('antPertences').placeholder = isPt ? 'Itens de valor sentimental...' : 'Items of sentimental value...';
        document.getElementById('lblFerimentos').innerHTML = isPt ? 'Ferimentos e Cicatrizes / Fobias e Manias' : 'Injuries & Scars / Phobias & Manias';
        document.getElementById('antFerimentos').placeholder = isPt ? 'Cicatrizes marcantes, traumas e fobias...' : 'Notable scars, traumas, and phobias...';
        document.getElementById('lblTomos').innerHTML = isPt ? 'Tomos Arcanos, Feitiços e Artefatos' : 'Arcane Tomes, Spells & Artifacts';
        document.getElementById('antTomos').placeholder = isPt ? 'Livros de mitologia, feitiços aprendidos...' : 'Mythos books, learned spells...';
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
// ============================================================================
// CRIADOR DE INVESTIGADOR GUIADO COMPLETO (PT-BR & EN-US)
// ============================================================================

const ATTR_KEYS = ['FOR', 'CON', 'TAM', 'DES', 'APA', 'INT', 'POD', 'EDU'];

// Dicionário das 60 Perícias da Ficha
const SKILL_CATALOG = {
    1:  { pt: "Contabilidade", en: "Accounting", base: 5 },
    2:  { pt: "Antropologia", en: "Anthropology", base: 1 },
    3:  { pt: "Avaliação", en: "Appraise", base: 5 },
    4:  { pt: "Arqueologia", en: "Archaeology", base: 1 },
    5:  { pt: "Arte/Ofício 1", en: "Art/Craft 1", base: 5, custom: true },
    6:  { pt: "Arte/Ofício 2", en: "Art/Craft 2", base: 5, custom: true },
    7:  { pt: "Arte/Ofício 3", en: "Art/Craft 3", base: 5, custom: true },
    8:  { pt: "Charme", en: "Charm", base: 15 },
    9:  { pt: "Escalar", en: "Climb", base: 20 },
    10: { pt: "Nível de Crédito", en: "Credit Rating", base: 0 },
    11: { pt: "Mythos de Cthulhu", en: "Cthulhu Mythos", base: 0, locked: true },
    12: { pt: "Disfarce", en: "Disguise", base: 5 },
    13: { pt: "Esquivar", en: "Dodge", base: 0 },
    14: { pt: "Dirigir Automóvel", en: "Drive Automobile", base: 20 },
    15: { pt: "Consertos Elétricos", en: "Electric Repair", base: 10 },
    16: { pt: "Lábia", en: "Fast Talk", base: 5 },
    17: { pt: "Luta (Briga)", en: "Fighting (Brawl)", base: 25 },
    18: { pt: "Luta 1 (Agarrar/Arma)", en: "Fight 1 (Grapple/Weapon)", base: 25, custom: true },
    19: { pt: "Luta 2 (Arma Branca)", en: "Fight 2 (Melee Weapon)", base: 25, custom: true },
    20: { pt: "Armas de Fogo (Pistolas)", en: "Firearms (Handguns)", base: 20 },
    21: { pt: "Armas de Fogo (Rifles)", en: "Firearms (Rifles)", base: 25 },
    22: { pt: "Armas 1 (Arco/Artoc.)", en: "Firearms 1 (Bow/Crewed)", base: 25, custom: true },
    23: { pt: "Primeiros Socorros", en: "First Aid", base: 30 },
    24: { pt: "História", en: "History", base: 5 },
    25: { pt: "Intimidação", en: "Intimidate", base: 15 },
    26: { pt: "Saltar", en: "Jump", base: 20 },
    27: { pt: "Idioma (Nativo)", en: "(Own) Language", base: 0, custom: true },
    28: { pt: "Idioma 1", en: "Language 1", base: 1, custom: true },
    29: { pt: "Idioma 2", en: "Language 2", base: 1, custom: true },
    30: { pt: "Idioma 3", en: "Language 3", base: 1, custom: true },
    31: { pt: "Direito", en: "Law", base: 5 },
    32: { pt: "Usar Bibliotecas", en: "Library Use", base: 20 },
    33: { pt: "Escutar", en: "Listen", base: 20 },
    34: { pt: "Chaveiro", en: "Locksmith", base: 1 },
    35: { pt: "Consertos Mecânicos", en: "Mechanical Repair", base: 5 },
    36: { pt: "Medicina", en: "Medicine", base: 1 },
    37: { pt: "Mundo Natural", en: "Natural World", base: 10 },
    38: { pt: "Navegação", en: "Navigate", base: 10 },
    39: { pt: "Ocultismo", en: "Occult", base: 5, locked: true },
    40: { pt: "Operar Maquinário Pesado", en: "Operate Heavy Machine", base: 1 },
    41: { pt: "Persuasão", en: "Persuade", base: 10 },
    42: { pt: "Pilotar", en: "Pilot", base: 1, custom: true },
    43: { pt: "Psicanálise", en: "Psychoanalysis", base: 1 },
    44: { pt: "Psicologia", en: "Psychology", base: 10 },
    45: { pt: "Cavalgar", en: "Ride", base: 5 },
    46: { pt: "Ciência (Geral)", en: "Science (General)", base: 1 },
    47: { pt: "Ciência 1 (Forense/Farm./Bio./Quím.)", en: "Science 1 (Forensics/Pharm./Bio./Chem.)", base: 1, custom: true },
    48: { pt: "Ciência 2 (Astron./Fís./Geol.)", en: "Science 2 (Astron./Phys./Geol.)", base: 1, custom: true },
    49: { pt: "Prestidigitação (Punga/Ocultar)", en: "Sleight of Hand (Pick Pocket/Conceal)", base: 10 },
    50: { pt: "Encontrar", en: "Spot Hidden", base: 25 },
    51: { pt: "Furtividade", en: "Stealth", base: 20 },
    52: { pt: "Sobrevivência", en: "Survival", base: 10, custom: true },
    53: { pt: "Natação", en: "Swim", base: 20 },
    54: { pt: "Arremessar", en: "Throw", base: 20 },
    55: { pt: "Rastrear", en: "Track", base: 10 },
    56: { pt: "Personalizado 1 (Barganhar)", en: "Custom 1 (Bargain)", base: 5, custom: true },
    57: { pt: "Personalizado 2", en: "Custom 2", base: 0, custom: true },
    58: { pt: "Personalizado 3", en: "Custom 3", base: 0, custom: true },
    59: { pt: "Personalizado 4", en: "Custom 4", base: 0, custom: true },
    60: { pt: "Personalizado 5", en: "Custom 5", base: 0, custom: true }
};

const OCCUPATIONS = {
    "actor": {
        pt: "Ator / Artista de Entretenimento (Actor/Entertainer)", en: "Actor/Entertainer",
        desc: "Atores de teatro/cinema, músicos, cantores e artistas de circo.",
        creditMin: 9, creditMax: 90,
        calcPoints: (a) => a.EDU * 2 + a.APA * 2,
        formulaText: "EDU x 2 + APA x 2",
        fixed: [5, 12, 44], choices: { count: 5, from: [8, 16, 41, 17, 26, 20, 28, 19, 45] }
    },
    "alienist": {
        pt: "Alienista (Alienist)", en: "Alienist",
        desc: "Médico especialista no estudo de doenças mentais e psiquiatria.",
        creditMin: 10, creditMax: 60,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [31, 33, 36, 28, 43, 44, 46, 47], choices: { count: 0, from: [] },
        customLabels: { 46: "Biologia", 47: "Farmácia" }
    },
    "antiquarian": {
        pt: "Antiquário (Antiquarian)", en: "Antiquarian",
        desc: "Colecionador e negociante de relíquias, livros raros e artefatos antigos.",
        creditMin: 30, creditMax: 70,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [3, 5, 24, 32, 28, 50], choices: { count: 2, from: [8, 16, 25, 41, 2, 4] }
    },
    "artist": {
        pt: "Artista (Artist)", en: "Artist",
        desc: "Pintor, escultor ou fotógrafo profissional.",
        creditMin: 9, creditMax: 50,
        calcPoints: (a) => a.EDU * 2 + Math.max(a.DES, a.POD) * 2,
        formulaText: "EDU x 2 + (DES ou POD) x 2",
        fixed: [5, 24, 37, 28, 44, 50], choices: { count: 2, from: [8, 16, 25, 41, 6, 32] }
    },
    "athlete": {
        pt: "Atleta / Capanga (Athlete/Thug)", en: "Athlete/Thug",
        desc: "Atleta profissional ou guarda-costas contratado.",
        creditMin: 9, creditMax: 70,
        calcPoints: (a) => a.EDU * 2 + Math.max(a.DES, a.FOR) * 2,
        formulaText: "EDU x 2 + (DES ou FOR) x 2",
        fixed: [9, 26, 17, 45, 53, 54], choices: { count: 2, from: [8, 16, 25, 41, 13, 18] },
        customLabels: { 18: "Agarrar (Grapple)" }
    },
    "author": {
        pt: "Autor / Escritor (Author/Linguist)", en: "Author/Linguist",
        desc: "Escritor de ficção, não-ficção ou tradutor acadêmico.",
        creditMin: 9, creditMax: 30,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [5, 24, 32, 37, 28, 27, 44], choices: { count: 1, from: [2, 4, 41, 16] },
        customLabels: { 5: "Literatura" }
    },
    "aviator": {
        pt: "Aviador / Piloto (Aviator)", en: "Aviator",
        desc: "Piloto de correio aéreo, acrobata, piloto de testes ou veterano.",
        creditMin: 30, creditMax: 60,
        calcPoints: (a) => a.EDU * 2 + a.DES * 2,
        formulaText: "EDU x 2 + DES x 2",
        fixed: [1, 15, 33, 35, 38, 42, 48], choices: { count: 1, from: [50, 52, 22] },
        customLabels: { 42: "Aeronaves", 48: "Astronomia" }
    },
    "clergy": {
        pt: "Clérigo / Missionário (Clergy/Missionary)", en: "Clergy/Missionary",
        desc: "Membro do clero, padre, pastor ou missionário religioso.",
        creditMin: 9, creditMax: 60,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [1, 24, 32, 33, 28, 44], choices: { count: 2, from: [8, 16, 25, 41, 2, 5, 36] }
    },
    "executive": {
        pt: "Executivo Corporativo (Corporate Executive)", en: "Corporate Executive",
        desc: "Líder empresarial, diretor ou industrial.",
        creditMin: 40, creditMax: 90,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [1, 31, 28, 44], choices: { count: 4, from: [8, 16, 25, 41, 3, 15, 35, 47] }
    },
    "criminal": {
        pt: "Criminoso (Criminal)", en: "Criminal",
        desc: "Assaltante, vigarista, contrabandista ou ladrão profissional.",
        creditMin: 5, creditMax: 65,
        calcPoints: (a) => a.EDU * 2 + Math.max(a.DES, a.FOR) * 2,
        formulaText: "EDU x 2 + (DES ou FOR) x 2",
        fixed: [44, 50, 51], choices: { count: 5, from: [3, 12, 17, 20, 34, 35, 49, 8, 16, 25, 41, 9, 14] }
    },
    "detective": {
        pt: "Detetive / Investigador (Detective)", en: "Detective",
        desc: "Detetive de polícia ou investigador particular.",
        creditMin: 20, creditMax: 50,
        calcPoints: (a) => a.EDU * 2 + Math.max(a.DES, a.FOR) * 2,
        formulaText: "EDU x 2 + (DES ou FOR) x 2",
        fixed: [5, 12, 31, 32, 33, 44, 50], choices: { count: 1, from: [8, 16, 25, 41, 20, 17, 51, 55] },
        customLabels: { 5: "Fotografia" }
    },
    "dilettante": {
        pt: "Diletante / Socialite (Dilettante/Socialite)", en: "Dilettante/Socialite",
        desc: "Herdeiro rico que vive de renda e cultiva hobbies variados.",
        creditMin: 50, creditMax: 99,
        calcPoints: (a) => a.EDU * 2 + a.APA * 2,
        formulaText: "EDU x 2 + APA x 2",
        fixed: [5, 20, 28, 45], choices: { count: 4, from: [8, 16, 25, 41, 2, 4, 14, 21, 24, 26, 32, 38, 42, 44, 50, 52, 53] }
    },
    "doctor": {
        pt: "Médico (Doctor of Medicine)", en: "Doctor of Medicine",
        desc: "Profissional formado em medicina clínica ou cirúrgica.",
        creditMin: 30, creditMax: 80,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [23, 28, 36, 44, 46, 47], choices: { count: 2, from: [1, 32, 41, 43, 48] },
        customLabels: { 28: "Latim", 46: "Biologia", 47: "Farmácia" }
    },
    "drifter": {
        pt: "Andarilho (Drifter)", en: "Drifter",
        desc: "Viajante errante que vive nas estradas e faz trabalhos temporários.",
        creditMin: 0, creditMax: 5,
        calcPoints: (a) => a.EDU * 2 + Math.max(a.APA, a.DES, a.FOR) * 2,
        formulaText: "EDU x 2 + (APA, DES ou FOR) x 2",
        fixed: [9, 26, 33, 38, 51], choices: { count: 3, from: [8, 16, 25, 41, 5, 35, 37, 49, 50, 52] }
    },
    "engineer": {
        pt: "Engenheiro (Engineer)", en: "Engineer",
        desc: "Especialista em projetar e construir estruturas e máquinas.",
        creditMin: 30, creditMax: 60,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [5, 15, 32, 35, 40, 46, 47], choices: { count: 1, from: [48, 1, 14] },
        customLabels: { 5: "Desenho Técnico", 46: "Engenharia", 47: "Física", 48: "Geologia/Química" }
    },
    "farmer": {
        pt: "Fazendeiro / Guarda Florestal (Farmer/Forester)", en: "Farmer/Forester",
        desc: "Trabalhador rural, agricultor ou silvicultor.",
        creditMin: 9, creditMax: 30,
        calcPoints: (a) => a.EDU * 2 + Math.max(a.DES, a.FOR) * 2,
        formulaText: "EDU x 2 + (DES ou FOR) x 2",
        fixed: [5, 14, 35, 37, 40, 55], choices: { count: 2, from: [8, 16, 25, 41, 1, 15, 21, 45] },
        customLabels: { 5: "Agricultura" }
    },
    "guide": {
        pt: "Guia / Caçador (Guide/Hunter)", en: "Guide/Hunter",
        desc: "Caçador profissional, montanhista ou guia de expedições.",
        creditMin: 20, creditMax: 50,
        calcPoints: (a) => a.EDU * 2 + Math.max(a.DES, a.FOR) * 2,
        formulaText: "EDU x 2 + (DES ou FOR) x 2",
        fixed: [37, 38, 50, 52, 55], choices: { count: 3, from: [9, 21, 33, 51, 28, 23, 53] }
    },
    "journalist": {
        pt: "Jornalista (Journalist)", en: "Journalist",
        desc: "Repórter, colunista ou correspondente investigativo.",
        creditMin: 9, creditMax: 30,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [5, 24, 32, 27, 44], choices: { count: 3, from: [8, 16, 25, 41, 33, 28, 50] },
        customLabels: { 5: "Fotografia/Escrita" }
    },
    "lawyer": {
        pt: "Advogado (Lawyer)", en: "Lawyer",
        desc: "Defensor, promotor ou consultor jurídico.",
        creditMin: 30, creditMax: 80,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [1, 31, 32, 44], choices: { count: 4, from: [8, 16, 25, 41, 24, 33, 50] }
    },
    "nurse": {
        pt: "Enfermeiro(a) (Nurse)", en: "Nurse",
        desc: "Profissional de assistência médica e hospitalar.",
        creditMin: 9, creditMax: 30,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [23, 33, 36, 44, 46, 47, 50], choices: { count: 1, from: [8, 16, 25, 41] },
        customLabels: { 46: "Biologia", 47: "Química/Farmácia" }
    },
    "noble": {
        pt: "Nobre / Aristocrata (Noble)", en: "Noble",
        desc: "Membro da aristocracia ou alta sociedade tradicional.",
        creditMin: 40, creditMax: 90,
        calcPoints: (a) => a.EDU * 2 + a.APA * 2,
        formulaText: "EDU x 2 + APA x 2",
        fixed: [5, 24, 31, 28, 45], choices: { count: 3, from: [8, 16, 25, 41, 1, 21, 19, 38] }
    },
    "parapsychologist": {
        pt: "Parapsicólogo (Parapsychologist)", en: "Parapsychologist",
        desc: "Pesquisador de fenômenos paranormais e psíquicos.",
        creditMin: 9, creditMax: 30,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [2, 5, 24, 32, 28, 44], choices: { count: 2, from: [33, 50, 43, 46] },
        customLabels: { 5: "Fotografia" }
    },
    "professor": {
        pt: "Professor / Acadêmico (Professor/Scholar)", en: "Professor/Scholar",
        desc: "Acadêmico universitário ou pesquisador doutor.",
        creditMin: 20, creditMax: 70,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [32, 28, 27, 44], choices: { count: 4, from: [2, 4, 24, 31, 36, 37, 46, 47, 48] }
    },
    "rancher": {
        pt: "Rancheiro / Veterinário (Rancher/Veterinarian)", en: "Rancher/Veterinarian",
        desc: "Criador de gado, vaqueiro ou médico veterinário rural.",
        creditMin: 9, creditMax: 40,
        calcPoints: (a) => a.EDU * 2 + Math.max(a.DES, a.FOR) * 2,
        formulaText: "EDU x 2 + (DES ou FOR) x 2",
        fixed: [5, 14, 35, 36, 37, 45], choices: { count: 2, from: [21, 55, 18, 46] },
        customLabels: { 36: "Veterinária" }
    },
    "sailor": {
        pt: "Marinheiro (Sailor)", en: "Sailor",
        desc: "Tripulante ou oficial da marinha mercante ou militar.",
        creditMin: 9, creditMax: 40,
        calcPoints: (a) => a.EDU * 2 + Math.max(a.DES, a.FOR) * 2,
        formulaText: "EDU x 2 + (DES ou FOR) x 2",
        fixed: [15, 17, 23, 35, 37, 38, 42, 53], choices: { count: 0, from: [] },
        customLabels: { 42: "Barcos" }
    },
    "soldier": {
        pt: "Soldado (Soldier)", en: "Soldier",
        desc: "Militar profissional treinado em combate e disciplina.",
        creditMin: 9, creditMax: 30,
        calcPoints: (a) => a.EDU * 2 + Math.max(a.DES, a.FOR) * 2,
        formulaText: "EDU x 2 + (DES ou FOR) x 2",
        fixed: [9, 13, 17, 21, 51, 52], choices: { count: 2, from: [23, 35, 28, 20, 19, 54] }
    },
    "tradesman": {
        pt: "Comerciante / Artesão (Tradesman)", en: "Tradesman",
        desc: "Trabalhador qualificado ou dono de oficina/comércio.",
        creditMin: 9, creditMax: 40,
        calcPoints: (a) => a.EDU * 2 + a.DES * 2,
        formulaText: "EDU x 2 + DES x 2",
        fixed: [1, 5, 14, 15, 35], choices: { count: 3, from: [8, 16, 25, 41, 9, 34, 40, 44] }
    },
    "tribal": {
        pt: "Membro Tribal (Tribal Member)", en: "Tribal Member",
        desc: "Nativo criado em cultura tradicional isolada.",
        creditMin: 0, creditMax: 15,
        calcPoints: (a) => a.EDU * 2 + Math.max(a.DES, a.FOR) * 2,
        formulaText: "EDU x 2 + (DES ou FOR) x 2",
        fixed: [9, 17, 33, 37, 50, 52, 53, 54], choices: { count: 0, from: [] }
    },
    "custom": {
        pt: "Personalizado (Custom Occupation)", en: "Custom Occupation",
        desc: "Defina a margem de Nível de Crédito e escolha 8 perícias da ocupação.",
        creditMin: 0, creditMax: 99,
        calcPoints: (a) => a.EDU * 4,
        formulaText: "EDU x 4",
        fixed: [],
        choices: { count: 8, from: Object.keys(SKILL_CATALOG).map(Number).filter(id => !SKILL_CATALOG[id].locked && id !== 10) }
    }
};

let wiz = {};

function isPtLang() {
    const el = document.getElementById('lsel');
    return el && el.value === 'pt-br';
}

function t(pt, en) {
    return isPtLang() ? pt : en;
}

function getSkillName(id) {
    const sk = SKILL_CATALOG[id];
    if (!sk) return "";
    const customLabel = wiz.customSkillLabels && wiz.customSkillLabels[id];
    const baseName = isPtLang() ? sk.pt : sk.en;
    return customLabel ? `${baseName} [${customLabel}]` : baseName;
}

function iniciarWizard() {
    wiz = {
        baseAttr: { FOR: 50, CON: 50, TAM: 50, DES: 50, APA: 50, INT: 50, POD: 50, EDU: 50, SORTE: 50 },
        attr: { FOR: 50, CON: 50, TAM: 50, DES: 50, APA: 50, INT: 50, POD: 50, EDU: 50, SORTE: 50 },
        rolledPool3d6: [], rolledPool2d6: [], reqPen: 0, idade: 20, ocupKey: '', 
        occSkillsFinal: [], customSkillLabels: {}, skillBonuses: {},
        ptsOcupacaoTotal: 0, ptsInteresseTotal: 0, gastosOcc: {}, gastosInt: {}
    };
    document.getElementById('wizardModal').style.display = 'block';
    step1Metodo();
}

function fecharWizard() {
    document.getElementById('wizardModal').style.display = 'none';
}

// ============================================================================
// PASSO 1: MÉTODO DE ATRIBUTOS
// ============================================================================
function step1Metodo() {
    document.getElementById('wizardBody').innerHTML = `
        <h4 style="color: #a1eae9;">${t('Passo 1: Geração de Atributos', 'Step 1: Attribute Generation')}</h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="btn btn-primary" onclick="gerarSorteioDireto()"><strong>${t('1. Sorteio Direto (Editável):', '1. Direct Roll (Editable):')}</strong> ${t('Rola tudo automaticamente e permite edição fina dos valores.', 'Rolls everything automatically and allows tweaking.')}</button>
            <button class="btn btn-primary" onclick="iniciarAlocacaoRolagens()"><strong>${t('2. Alocação de Rolagens:', '2. Roll & Allocate:')}</strong> ${t('Rola os valores da edição e permite alocá-los manualmente.', 'Roll values per rules and manually assign them.')}</button>
            <button class="btn btn-primary" onclick="gerarPadrao()"><strong>${t('3. Valores Padrão:', '3. Standard Array:')}</strong> ${t('Distribua os valores fixos 80, 70, 60, 60, 50, 50, 50, 40.', 'Distribute fixed array (80, 70, 60...).')}</button>
            <button class="btn btn-primary" onclick="gerarPontos()"><strong>${t('4. Compra de Pontos:', '4. Point Buy:')}</strong> ${t('Distribua 460 pontos (Mín 15, Máx 90).', 'Distribute 460 points (Min 15, Max 90).')}</button>
        </div>
    `;
    document.getElementById('wizardFooter').innerHTML = `<button class="btn btn-secondary" onclick="fecharWizard()">${t('Cancelar', 'Cancel')}</button>`;
}

function gerarSorteioDireto() {
    wiz.rollDetails = {};
    ATTR_KEYS.forEach(k => {
        let expr = ['TAM', 'INT', 'EDU'].includes(k) ? '(2d6+6)*5' : '3d6*5';
        let res = R(expr); // Puxa direto da nossa nova função R(s)
        wiz.baseAttr[k] = res[0];
        wiz.rollDetails[k] = res[1]; // Ex: "(2d6+6)*5 ➔ (([4]+[2])+6)*5 = 60"
    });
    let resSorte = R("3d6*5");
    wiz.baseAttr.SORTE = resSorte[0];
    wiz.rollDetails.SORTE = resSorte[1];
    
    gerarLivre(); 
}

function gerarLivre() {
    let html = `<h4 style="color: #a1eae9;">${t('Sorteio Direto / Edição Fina', 'Direct Roll / Tweaking')}</h4>
        <p>${t('Estes foram os valores sorteados. Você pode alterá-los livremente antes de prosseguir:', 'These are the rolled values. You can freely change them before proceeding:')}</p><div class="wiz-grid">`;
    
    [...ATTR_KEYS, 'SORTE'].forEach(k => {
        // Se houver um detalhe salvo para este atributo, renderiza o texto minúsculo abaixo
        let detalhe = (wiz.rollDetails && wiz.rollDetails[k]) 
            ? `<br><small style="font-size:11px; color:#20333c; font-weight:bold;">${wiz.rollDetails[k]}</small>` 
            : '';
            
        html += `<div class="wiz-box" style="padding-bottom: 5px;">
                    <label>${k}</label>
                    <input type="number" class="form-control" id="free_${k}" value="${wiz.baseAttr[k]}">
                    ${detalhe}
                 </div>`;
    });
    
    document.getElementById('wizardBody').innerHTML = html + `</div>`;
    document.getElementById('wizardFooter').innerHTML = `
        <button class="btn btn-secondary" onclick="step1Metodo()">${t('Voltar', 'Back')}</button>
        <button class="btn btn-warning" onclick="gerarSorteioDireto()">${t('Rerolar Tudo', 'Reroll All')}</button>
        <button class="btn btn-success" onclick="validarLivre()">${t('Próximo', 'Next')}</button>
    `;
}

function validarLivre() {
    [...ATTR_KEYS, 'SORTE'].forEach(k => { wiz.baseAttr[k] = parseInt(document.getElementById('free_' + k).value, 10) || 15; });
    step2Idade();
}

function iniciarAlocacaoRolagens() {
    let rolls3d6 = [R("3d6*5"), R("3d6*5"), R("3d6*5"), R("3d6*5"), R("3d6*5")];
    let rolls2d6 = [R("(2d6+6)*5"), R("(2d6+6)*5"), R("(2d6+6)*5")];
    let resSorte = R("3d6*5");
    
    // Pega o [0] (resultado matemático) para colocar no select
    wiz.rolledPool3d6 = rolls3d6.map(r => r[0]).sort((a,b)=>b-a);
    wiz.rolledPool2d6 = rolls2d6.map(r => r[0]).sort((a,b)=>b-a);
    wiz.baseAttr.SORTE = resSorte[0];
    
    // Pega o [1] (texto com colchetes) para mostrar ao jogador
    let det3d6 = rolls3d6.map(r => r[1]).join('<br>');
    let det2d6 = rolls2d6.map(r => r[1]).join('<br>');
    
    let html = `<h4 style="color: #a1eae9;">${t('Alocação de Rolagens', 'Roll & Allocate')}</h4>
        <div style="font-size: 13px; margin-bottom: 10px; background: #788c94; color: #20333c; padding: 10px; border-radius: 8px;">
            <strong>${t('Rolagens (3d6x5):', 'Rolls (3d6x5):')}</strong><br>${det3d6}<br><br>
            <strong>${t('Rolagens ((2d6+6)x5):', 'Rolls ((2d6+6)x5):')}</strong><br>${det2d6}
        </div>
        <div class="wiz-grid">${['FOR', 'CON', 'DES', 'APA', 'POD'].map(k => `<div class="wiz-box"><label>${k}</label><select class="form-control alloc-3d6" id="alloc_${k}" onchange="atualizarDropdownsPool('alloc-3d6', wiz.rolledPool3d6)"></select></div>`).join('')}</div>
        <div class="wiz-grid">${['TAM', 'INT', 'EDU'].map(k => `<div class="wiz-box"><label>${k}</label><select class="form-control alloc-2d6" id="alloc_${k}" onchange="atualizarDropdownsPool('alloc-2d6', wiz.rolledPool2d6)"></select></div>`).join('')}</div>
        <div style="margin-top:10px;">
            <label>SORTE (3d6x5)</label>
            <input type="number" class="form-control" id="alloc_SORTE" value="${wiz.baseAttr.SORTE}" style="width:100px;">
            <small style="display:block; font-size:12px; color:#a1eae9;">${resSorte[1]}</small>
        </div>
    `;
    document.getElementById('wizardBody').innerHTML = html;
    document.getElementById('wizardFooter').innerHTML = `
        <button class="btn btn-secondary" onclick="step1Metodo()">${t('Voltar', 'Back')}</button>
        <button class="btn btn-warning" onclick="iniciarAlocacaoRolagens()">${t('Rerolar Dados', 'Reroll Dice')}</button>
        <button class="btn btn-success" onclick="validarAlocacao()">${t('Próximo', 'Next')}</button>
    `;
    atualizarDropdownsPool('alloc-3d6', wiz.rolledPool3d6);
    atualizarDropdownsPool('alloc-2d6', wiz.rolledPool2d6);
}

const STANDARD_POOL = [80, 70, 60, 60, 50, 50, 50, 40];
function gerarPadrao() {
    wiz.baseAttr.SORTE = R("3d6*5")[0];
    let html = `<h4 style="color: #a1eae9;">${t('Valores Padrão', 'Standard Array')}</h4><div class="wiz-grid">`;
    ATTR_KEYS.forEach(k => { html += `<div class="wiz-box"><label>${k}</label><select class="form-control padrao-sel" id="padrao_${k}" onchange="atualizarDropdownsPool('padrao-sel', STANDARD_POOL)"></select></div>`; });
    html += `</div><div style="margin-top:10px;"><label>SORTE (3d6x5)</label><input type="number" class="form-control" id="padrao_SORTE" value="${wiz.baseAttr.SORTE}" style="width:100px;"></div>`;
    document.getElementById('wizardBody').innerHTML = html;
    document.getElementById('wizardFooter').innerHTML = `<button class="btn btn-secondary" onclick="step1Metodo()">${t('Voltar', 'Back')}</button><button class="btn btn-success" onclick="validarPadrao()">${t('Próximo', 'Next')}</button>`;
    atualizarDropdownsPool('padrao-sel', STANDARD_POOL);
}

function atualizarDropdownsPool(className, poolArray) {
    const selects = Array.from(document.querySelectorAll('.' + className));
    const current = selects.map(s => s.value);
    selects.forEach((sel, idx) => {
        let counts = {};
        poolArray.forEach(v => counts[v] = (counts[v] || 0) + 1);
        current.forEach((val, oIdx) => { if (oIdx !== idx && val !== "") counts[val] = (counts[val] || 0) - 1; });
        let opts = `<option value="">-</option>`;
        [...new Set(poolArray)].forEach(v => {
            if (counts[String(v)] > 0 || String(v) === current[idx]) {
                opts += `<option value="${v}" ${String(v) === current[idx] ? 'selected' : ''}>${v}</option>`;
            }
        });
        sel.innerHTML = opts;
    });
}

function validarAlocacao() {
    for (let k of ATTR_KEYS) {
        let v = parseInt(document.getElementById('alloc_' + k).value, 10);
        if (isNaN(v)) return alert(t("Aloque todos os valores!", "Allocate all values!"));
        wiz.baseAttr[k] = v;
    }
    wiz.baseAttr.SORTE = parseInt(document.getElementById('alloc_SORTE').value, 10) || 15;
    step2Idade();
}
function validarPadrao() {
    for (let k of ATTR_KEYS) {
        let v = parseInt(document.getElementById('padrao_' + k).value, 10);
        if (isNaN(v)) return alert(t("Selecione todos os valores!", "Select all values!"));
        wiz.baseAttr[k] = v;
    }
    wiz.baseAttr.SORTE = parseInt(document.getElementById('padrao_SORTE').value, 10) || 15;
    step2Idade();
}

function gerarPontos() {
    wiz.baseAttr.SORTE = R("3d6*5")[0];
    let html = `<h4 style="color: #a1eae9;">${t('Compra de Pontos', 'Point Buy')}</h4>
        <p>${t('Pontos Restantes:', 'Remaining Points:')} <strong id="ptsRestantes" style="color:#a1eae9; font-size:18px;">60</strong></p>
        <div class="wiz-grid">`;
    ATTR_KEYS.forEach(k => { html += `<div class="wiz-box"><label>${k}</label><input type="number" class="form-control pt-input" id="pt_${k}" value="50" oninput="calcPontos()"></div>`; });
    html += `</div><div style="margin-top:10px;"><label>SORTE (Fora dos 460 pts)</label><input type="number" class="form-control" id="pt_SORTE" value="${wiz.baseAttr.SORTE}" style="width:100px;"></div>`;
    document.getElementById('wizardBody').innerHTML = html;
    document.getElementById('wizardFooter').innerHTML = `<button class="btn btn-secondary" onclick="step1Metodo()">${t('Voltar', 'Back')}</button><button class="btn btn-success" onclick="validarPontos()">${t('Próximo', 'Next')}</button>`;
    calcPontos();
}

function calcPontos() {
    let tot = Array.from(document.querySelectorAll('.pt-input')).reduce((sum, el) => sum + (parseInt(el.value) || 0), 0);
    document.getElementById('ptsRestantes').innerText = 460 - tot;
}

function validarPontos() {
    let tot = 0;
    for (let k of ATTR_KEYS) {
        let v = parseInt(document.getElementById('pt_' + k).value, 10) || 0;
        if (v < 15 || v > 90) return alert(t(`O atributo ${k} deve ficar entre 15 e 90.`, `Attribute ${k} must be between 15 and 90.`));
        tot += v;
        wiz.baseAttr[k] = v;
    }
    if (tot !== 460) return alert(t(`A soma totalizou ${tot}. Você deve usar exatamente 460 pontos.`, `Sum is ${tot}. You must spend exactly 460 points.`));
    wiz.baseAttr.SORTE = parseInt(document.getElementById('pt_SORTE').value, 10) || 15;
    step2Idade();
}

// ============================================================================
// PASSO 2: IDADE (Cálculos Editáveis e Penalidade Distribuída)
// ============================================================================
function step2Idade() {
    document.getElementById('wizardBody').innerHTML = `
        <h4 style="color: #a1eae9;">${t('Passo 2: Idade do Investigador', 'Step 2: Investigator Age')}</h4>
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <label><strong>${t('Idade:', 'Age:')}</strong></label>
            <input type="number" id="wizIdade" class="form-control" value="${wiz.idade || 20}" style="width:80px;">
            <button class="btn btn-primary btn-sm" onclick="previaIdade()">${t('Calcular Testes', 'Calculate Rolls')}</button>
        </div>
        <div id="idadePreviewBox"></div>
    `;
    document.getElementById('wizardFooter').innerHTML = `<button class="btn btn-secondary" onclick="step1Metodo()">${t('Voltar', 'Back')}</button><button class="btn btn-success" onclick="confirmarIdade()">${t('Avançar', 'Next')}</button>`;
    previaIdade(); // Executa ao abrir a tela
}

function previaIdade() {
    wiz.attr = Object.assign({}, wiz.baseAttr);
    wiz.idade = parseInt(document.getElementById('wizIdade').value, 10) || 20;
    
    let log = [];
    wiz.reqPen = 0;
    let testesEdu = 0;
    let apaPen = 0;
    let html = `<hr style="background:#788c94;">`;

    // MOSTRA OS ATRIBUTOS ORIGINAIS (Antes das modificações)
    html += `
        <div style="font-size:12px; color:#20333c; background:#a1eae9; padding:8px; border-radius:5px; margin-bottom:15px; text-align: center; font-weight: bold;">
            ${t('Atributos Originais (Antes da Idade):', 'Original Attributes (Before Age):')}<br>
            FOR:${wiz.baseAttr.FOR} | CON:${wiz.baseAttr.CON} | TAM:${wiz.baseAttr.TAM} | DES:${wiz.baseAttr.DES} | APA:${wiz.baseAttr.APA} | INT:${wiz.baseAttr.INT} | POD:${wiz.baseAttr.POD} | EDU:${wiz.baseAttr.EDU}
        </div>
    `;

    if (wiz.idade >= 15 && wiz.idade <= 19) {
        wiz.attr.FOR = Math.max(1, wiz.attr.FOR - 5);
        wiz.attr.TAM = Math.max(1, wiz.attr.TAM - 5);
        wiz.attr.EDU = Math.max(1, wiz.attr.EDU - 5);
        
        // Rola Sorte com detalhes usando a R(s)
        let rSorte = R("3d6*5");
        let s2 = rSorte[0];
        wiz.attr.SORTE = Math.max(wiz.baseAttr.SORTE, s2);
        
        log.push(t(
            `<strong>Idade 15-19:</strong> FOR, TAM e EDU reduzidos em 5.<br>Sorte rolada com vantagem: Base era ${wiz.baseAttr.SORTE}, Nova rolagem: <em>${rSorte[1]}</em>.<br>➔ Sorte Final: <strong style="color:white;">${wiz.attr.SORTE}</strong>`, 
            `<strong>Age 15-19:</strong> STR, SIZ, and EDU reduced by 5.<br>Luck rolled with advantage: Base was ${wiz.baseAttr.SORTE}, New roll: <em>${rSorte[1]}</em>.<br>➔ Final Luck: <strong style="color:white;">${wiz.attr.SORTE}</strong>`
        ));
    } else {
        if (wiz.idade >= 20 && wiz.idade <= 39) { testesEdu = 1; }
        else if (wiz.idade >= 40 && wiz.idade <= 49) { testesEdu = 2; apaPen = 5; wiz.reqPen = 5; }
        else if (wiz.idade >= 50 && wiz.idade <= 59) { testesEdu = 3; apaPen = 10; wiz.reqPen = 10; }
        else if (wiz.idade >= 60 && wiz.idade <= 69) { testesEdu = 4; apaPen = 15; wiz.reqPen = 20; }
        else if (wiz.idade >= 70 && wiz.idade <= 79) { testesEdu = 4; apaPen = 20; wiz.reqPen = 40; }
        else if (wiz.idade >= 80) { testesEdu = 4; apaPen = 25; wiz.reqPen = 80; }

        wiz.attr.APA = Math.max(1, wiz.attr.APA - apaPen);
        if (apaPen > 0) log.push(t(`<strong>Idade ${wiz.idade}:</strong> APA reduzida em ${apaPen}.`, `<strong>Age ${wiz.idade}:</strong> APP reduced by ${apaPen}.`));

        for (let i = 0; i < testesEdu; i++) {
            // Teste de EDU detalhado usando a R(s)
            let rTeste = R("1d100");
            let roll = rTeste[0];
            
            if (roll > wiz.attr.EDU && wiz.attr.EDU < 99) {
                let rGain = R("1d10");
                let gain = rGain[0];
                wiz.attr.EDU = Math.min(99, wiz.attr.EDU + gain);
                log.push(t(
                    `<strong>Melhoria de EDU #${i+1}:</strong> <em>${rTeste[1]}</em><br><span style="color:#28a745;">Sucesso (${roll} > ${wiz.attr.EDU - gain})!</span> Ganho: <em>${rGain[1]}</em>`, 
                    `<strong>EDU Check #${i+1}:</strong> <em>${rTeste[1]}</em><br><span style="color:#28a745;">Success (${roll} > ${wiz.attr.EDU - gain})!</span> Gain: <em>${rGain[1]}</em>`
                ));
            } else {
                log.push(t(
                    `<strong>Melhoria de EDU #${i+1}:</strong> <em>${rTeste[1]}</em><br><span style="color:#dc3545;">Falhou (${roll} <= ${wiz.attr.EDU}).</span>`, 
                    `<strong>EDU Check #${i+1}:</strong> <em>${rTeste[1]}</em><br><span style="color:#dc3545;">Failed (${roll} <= ${wiz.attr.EDU}).</span>`
                ));
            }
        }
    }

    html += `<div style="font-size:13px; color:#a1eae9; margin-bottom:10px;">${log.join('<br><br>')}</div>`;

    if (wiz.reqPen > 0) {
        html += `
        <div style="background:#788c94; padding:10px; border-radius:8px; margin-bottom:15px; color:#20333c;">
            <label><strong>${t(`Distribua exatamente -${wiz.reqPen} pontos:`, `Distribute exactly -${wiz.reqPen} points:`)}</strong></label>
            <div style="display:flex; gap:10px;">
                <div style="flex:1"><label>FOR (-)</label><input type="number" id="pen_FOR" value="0" min="0" max="${wiz.attr.FOR-1}" class="form-control pen-input" oninput="calcPen()"></div>
                <div style="flex:1"><label>CON (-)</label><input type="number" id="pen_CON" value="0" min="0" max="${wiz.attr.CON-1}" class="form-control pen-input" oninput="calcPen()"></div>
                <div style="flex:1"><label>DES (-)</label><input type="number" id="pen_DES" value="0" min="0" max="${wiz.attr.DES-1}" class="form-control pen-input" oninput="calcPen()"></div>
            </div>
            <div id="penRestantes" style="font-weight:bold; margin-top:5px; color:#8a2be2;">${t(`Faltam distribuir: ${wiz.reqPen}`, `Remaining to distribute: ${wiz.reqPen}`)}</div>
        </div>`;
    }

    html += `
        <div style="display:flex; gap:10px;">
            <div style="flex:1"><label>${t(`EDU Final (Editável) (OG: ${wiz.baseAttr.EDU})`, `Final EDU (Editable) (OG: ${wiz.baseAttr.EDU})`)}</label><input type="number" id="edit_EDU" value="${wiz.attr.EDU}" class="form-control"></div>
            <div style="flex:1"><label>${t(`Sorte Final (Editável) (OG: ${wiz.baseAttr.SORTE})`, `Final Luck (Editable) (OG: ${wiz.baseAttr.SORTE})`)}</label><input type="number" id="edit_SORTE" value="${wiz.attr.SORTE}" class="form-control"></div>
        </div>
    `;
    document.getElementById('idadePreviewBox').innerHTML = html;
}

function calcPen() {
    let pFor = parseInt(document.getElementById('pen_FOR').value) || 0;
    let pCon = parseInt(document.getElementById('pen_CON').value) || 0;
    let pDes = parseInt(document.getElementById('pen_DES').value) || 0;
    document.getElementById('penRestantes').innerText = t(`Faltam distribuir: ${wiz.reqPen - (pFor+pCon+pDes)}`, `Remaining to distribute: ${wiz.reqPen - (pFor+pCon+pDes)}`);
}

function confirmarIdade() {
    if (wiz.reqPen > 0) {
        let pFor = parseInt(document.getElementById('pen_FOR').value) || 0;
        let pCon = parseInt(document.getElementById('pen_CON').value) || 0;
        let pDes = parseInt(document.getElementById('pen_DES').value) || 0;
        if (pFor + pCon + pDes !== wiz.reqPen) {
            return alert(t(`A soma das deduções deve ser exatamente ${wiz.reqPen}.`, `The sum of deductions must be exactly ${wiz.reqPen}.`));
        }
        wiz.attr.FOR -= pFor; wiz.attr.CON -= pCon; wiz.attr.DES -= pDes;
    }
    wiz.attr.EDU = parseInt(document.getElementById('edit_EDU').value) || wiz.attr.EDU;
    wiz.attr.SORTE = parseInt(document.getElementById('edit_SORTE').value) || wiz.attr.SORTE;
    step3Ocupacao();
}

// ============================================================================
// PASSO 3: OCUPAÇÃO
// ============================================================================
function step3Ocupacao() {
    let opts = `<option value="">${t('Selecione uma Ocupação...', 'Select an Occupation...')}</option>`;
    Object.keys(OCCUPATIONS).forEach(k => {
        opts += `<option value="${k}" ${wiz.ocupKey === k ? 'selected' : ''}>${isPtLang() ? OCCUPATIONS[k].pt : OCCUPATIONS[k].en}</option>`;
    });

    document.getElementById('wizardBody').innerHTML = `
        <h4 style="color: #a1eae9;">${t('Passo 3: Ocupação', 'Step 3: Occupation')}</h4>
        <select class="form-control" id="wizOcup" onchange="renderizarDetalhesOcupacao()">${opts}</select>
        <div id="occDetailsDiv" style="margin-top: 15px;"></div>
    `;
    document.getElementById('wizardFooter').innerHTML = `
        <button class="btn btn-secondary" onclick="step2Idade()">${t('Voltar', 'Back')}</button>
        <button class="btn btn-warning" onclick="finalizarWizard()">${t('Pular para Ficha', 'Skip to Sheet')}</button>
        <button class="btn btn-success" onclick="confirmarOcupacao()">${t('Próximo', 'Next')}</button>
    `;
    if (wiz.ocupKey) renderizarDetalhesOcupacao();
}

function renderizarDetalhesOcupacao() {
    const key = document.getElementById('wizOcup').value;
    const cont = document.getElementById('occDetailsDiv');
    if (!key) { cont.innerHTML = ''; return; }

    const occ = OCCUPATIONS[key];
    wiz.customSkillLabels = occ.customLabels ? Object.assign({}, occ.customLabels) : {};
    const totalPts = occ.calcPoints(wiz.attr);

    let html = `
        <div class="innerWin" style="color: #20333c; text-align: left;">
            <p style="margin-bottom:6px;"><strong>${t('Descrição:', 'Desc:')}</strong> ${occ.desc}</p>
            <p style="margin-bottom:6px;">
                <strong>${t('Margem de Nível de Crédito:', 'Credit Rating Range:')}</strong> ${occ.creditMin}% – ${occ.creditMax}% | 
                <strong>${t('Pontos Ocupacionais:', 'Occ. Points:')}</strong> ${occ.formulaText} = <strong>${totalPts}</strong>
            </p>
            ${occ.fixed.length > 0 ? `<p style="margin-bottom:0;"><strong>${t('Perícias Fixas:', 'Fixed Skills:')}</strong> ${occ.fixed.map(id => getSkillName(id)).join(', ')}, ${getSkillName(10)}</p>` : ''}
        </div>
    `;

    // Se for Ocupação Personalizada, deixa o jogador escolher a margem de Nível de Crédito
    if (key === 'custom') {
        html += `
        <div style="background:#788c94; padding:10px; border-radius:8px; margin-top:10px; color:#20333c; display:flex; gap:10px;">
            <div style="flex:1">
                <label><strong>${t('Nível de Crédito Mín (%):', 'Min Credit Rating (%):')}</strong></label>
                <input type="number" id="customCrMin" class="form-control" value="9" min="0" max="99">
            </div>
            <div style="flex:1">
                <label><strong>${t('Nível de Crédito Máx (%):', 'Max Credit Rating (%):')}</strong></label>
                <input type="number" id="customCrMax" class="form-control" value="50" min="0" max="99">
            </div>
        </div>`;
    }

    if (occ.choices && occ.choices.count > 0) {
        html += `<div style="background:#788c94; padding:10px; border-radius:8px; margin-top:10px; color:#20333c;">
            <strong>${t(`Escolha ${occ.choices.count} especialidade(s) da ocupação:`, `Choose ${occ.choices.count} occupational specialty(s):`)}</strong>`;
        for (let i = 0; i < occ.choices.count; i++) {
            html += `<select class="form-control mt-1 occ-choice-sel" id="occChoice_${i}" onchange="atualizarChoicesOcupacao('${key}')"></select>`;
        }
        html += `</div>`;
    }
    cont.innerHTML = html;
    if (occ.choices && occ.choices.count > 0) atualizarChoicesOcupacao(key);
}

function atualizarChoicesOcupacao(key) {
    const occ = OCCUPATIONS[key];
    const selects = Array.from(document.querySelectorAll('.occ-choice-sel'));
    const chosen = selects.map(s => s.value);

    selects.forEach((sel, idx) => {
        const myVal = chosen[idx];
        let opts = `<option value="">${t('Selecione...', 'Select...')}</option>`;
        occ.choices.from.forEach(skId => {
            const strId = String(skId);
            if (!occ.fixed.includes(skId) && skId !== 10 && (!chosen.includes(strId) || strId === myVal)) {
                opts += `<option value="${strId}" ${strId === myVal ? 'selected' : ''}>${getSkillName(skId)}</option>`;
            }
        });
        sel.innerHTML = opts;
    });
}

function confirmarOcupacao() {
    const key = document.getElementById('wizOcup').value;
    if (!key) return alert(t("Selecione uma ocupação!", "Select an occupation!"));

    const occ = OCCUPATIONS[key];
    let chosenIds = [];
    if (occ.choices && occ.choices.count > 0) {
        for (let i = 0; i < occ.choices.count; i++) {
            let v = parseInt(document.getElementById('occChoice_' + i).value, 10);
            if (isNaN(v)) return alert(t("Selecione todas as especialidades!", "Select all specialties!"));
            chosenIds.push(v);
        }
    }

    // Define a margem de Nível de Crédito da ocupação
    let crMin = occ.creditMin;
    let crMax = occ.creditMax;
    if (key === 'custom') {
        crMin = Math.max(0, Math.min(99, parseInt(document.getElementById('customCrMin').value, 10) || 0));
        crMax = Math.max(crMin, Math.min(99, parseInt(document.getElementById('customCrMax').value, 10) || 99));
    }
    wiz.creditMin = crMin;
    wiz.creditMax = crMax;

    wiz.ocupKey = key;
    // Inclui sempre Nível de Crédito (ID 10) no topo das perícias ocupacionais
    wiz.occSkillsFinal = [10, ...new Set([...occ.fixed, ...chosenIds])].filter(id => !SKILL_CATALOG[id].locked);
    wiz.ptsOcupacaoTotal = occ.calcPoints(wiz.attr);
    wiz.ptsInteresseTotal = wiz.attr.INT * 2;
    wiz.gastosOcc = { 10: crMin }; // Já pré-aloca o mínimo obrigatório de Nível de Crédito
    wiz.gastosInt = {};
    wiz.skillBonuses = {};

    step4PericiasOcupacionais();
}

function getSkillStartingValue(id) {
    let b = SKILL_CATALOG[id].base;
    if (id === 13) b = Math.floor(wiz.attr.DES / 2); // Esquivar = DES / 2
    if (id === 27) b = wiz.attr.EDU; // Idioma Nativo = EDU
    return Math.min(99, b);
}

// ============================================================================
// PASSO 4 e 5: DISTRIBUIÇÃO DE PERÍCIAS (Com trava da margem de Crédito)
// ============================================================================
function renderizarPericiasUI(tipo) {
    const isOcc = tipo === 'occ';
    const disp = (isOcc ? wiz.ptsOcupacaoTotal : wiz.ptsInteresseTotal) - Object.values(isOcc ? wiz.gastosOcc : wiz.gastosInt).reduce((a,b)=>a+b, 0);
    // Na tela de Interesses Pessoais, não exibe Nível de Crédito (10), pois ele é exclusivo da ocupação
    const listaIds = isOcc
        ? wiz.occSkillsFinal
        : Object.keys(SKILL_CATALOG).map(Number).filter(id => !SKILL_CATALOG[id].locked && id !== 10);
    
    let html = `
        <h4 style="color: #a1eae9;">${isOcc ? t('Passo 4: Pontos Ocupacionais', 'Step 4: Occupational Points') : t('Passo 5: Interesses Pessoais', 'Step 5: Personal Interest')}</h4>
        <div style="background:#20333c; border:1px solid #a1eae9; padding:8px; border-radius:8px; margin-bottom:10px; font-weight:bold; color:#a1eae9;">
            ${t('Pontos Restantes:', 'Points Remaining:')} <span style="font-size:18px;">${disp}</span> / ${isOcc ? wiz.ptsOcupacaoTotal : wiz.ptsInteresseTotal}
        </div>
        <div style="max-height: 280px; overflow-y: auto; padding-right: 5px;">
    `;

    listaIds.forEach(id => {
        let ini = getSkillStartingValue(id) + (isOcc ? 0 : (wiz.gastosOcc[id]||0));
        let g = (isOcc ? wiz.gastosOcc[id] : wiz.gastosInt[id]) || 0;
        let labelExtra = (id === 10)
            ? `<small style="color:#8a2be2;">(${t('Margem', 'Range')}: ${wiz.creditMin}%–${wiz.creditMax}%)</small>`
            : `<small>(Base ${ini}%)</small>`;
        
        html += `
        <div class="wiz-skill-row">
            <span style="flex:2;">${getSkillName(id)} ${labelExtra}</span>
            <div style="display:flex; align-items:center; gap:5px;">
                <button class="btn btn-sm btn-danger" onclick="modificarPericia(${id}, '${tipo}', -5)">-5</button>
                <button class="btn btn-sm btn-danger" onclick="modificarPericia(${id}, '${tipo}', -1)">-1</button>
                <span style="width:40px; text-align:center;">+${g}</span>
                <button class="btn btn-sm btn-success" onclick="modificarPericia(${id}, '${tipo}', 1)">+1</button>
                <button class="btn btn-sm btn-success" onclick="modificarPericia(${id}, '${tipo}', 5)">+5</button>
            </div>
            <span style="width:65px; text-align:right;">= <strong>${ini+g}%</strong></span>
        </div>`;
    });
    
    document.getElementById('wizardBody').innerHTML = html + `</div>`;
    document.getElementById('wizardFooter').innerHTML = `
        <button class="btn btn-secondary" onclick="${isOcc ? 'step3Ocupacao()' : 'step4PericiasOcupacionais()'}">${t('Voltar', 'Back')}</button>
        <button class="btn btn-success" onclick="${isOcc ? 'step5PericiasInteresse()' : 'finalizarWizard()'}">${isOcc ? t('Próximo', 'Next') : t('Concluir Ficha', 'Finish Sheet')}</button>
    `;
}

function step4PericiasOcupacionais() { renderizarPericiasUI('occ'); }
function step5PericiasInteresse() { renderizarPericiasUI('int'); }

function modificarPericia(id, tipo, delta) {
    if (SKILL_CATALOG[id].locked) return;
    const isOcc = (tipo === 'occ');
    const gm = isOcc ? wiz.gastosOcc : wiz.gastosInt;
    const maxDisp = (isOcc ? wiz.ptsOcupacaoTotal : wiz.ptsInteresseTotal) - Object.values(gm).reduce((a,b)=>a+b, 0);
    const curr = gm[id] || 0;
    const totalBase = getSkillStartingValue(id) + (wiz.gastosOcc[id]||0) + (wiz.gastosInt[id]||0);

    // Define os limites mínimo e máximo permitidos para a perícia
    const limiteMax = (id === 10) ? wiz.creditMax : 99;
    const limiteMinGasto = (isOcc && id === 10) ? wiz.creditMin : 0;

    if (delta > 0) {
        let maxAdd = Math.min(delta, maxDisp, limiteMax - totalBase);
        if (maxAdd > 0) gm[id] = curr + maxAdd;
    } else {
        let maxSub = Math.min(Math.abs(delta), curr - limiteMinGasto);
        if (maxSub > 0) gm[id] = curr - maxSub;
    }
    renderizarPericiasUI(tipo);
}

// ============================================================================
// PASSO 6: APLICAR TUDO NO HTML
// ============================================================================
function finalizarWizard() {
    const setInp = (id, val) => { const el = document.getElementById(id); if (el) { el.value = val; el.setAttribute('value', val); } };

    setInput('att1', wiz.attr.FOR); setInput('att2', wiz.attr.CON); setInput('att3', wiz.attr.TAM); setInput('att4', wiz.attr.DES);
    setInput('att5', wiz.attr.APA); setInput('att6', wiz.attr.EDU); setInput('att7', wiz.attr.INT); setInput('att8', wiz.attr.POD);
    setInput('char5', wiz.idade);
    
    if (wiz.ocupKey) {
        const occ = OCCUPATIONS[wiz.ocupKey];
        setInput('char3', isPtLang() ? occ.pt.split(' (')[0] : occ.en);
    }

    const pv = Math.floor((wiz.attr.CON + wiz.attr.TAM) / 10);
    const pm = Math.floor(wiz.attr.POD / 5);
    setInput('cur1', pv); setInput('max1', pv);
    setInput('cur2', wiz.attr.POD); setInput('max2', 99);
    setInput('cur3', pm); setInput('max3', pm);
    setInput('cur4', wiz.attr.SORTE);

    Object.keys(SKILL_CATALOG).map(Number).forEach(id => {
        let f = getSkillStartingValue(id) + (wiz.gastosOcc[id] || 0) + (wiz.gastosInt[id] || 0);
        if (SKILL_CATALOG[id].locked) f = SKILL_CATALOG[id].base;
        setInput('sk' + id, Math.min(99, f));

        if (wiz.customSkillLabels && wiz.customSkillLabels[id]) {
            const c = document.querySelector(`div[name="sk${id}"]`);
            if (c) {
                const n = c.querySelector('input[type="text"]');
                if (n) { n.value = wiz.customSkillLabels[id]; n.setAttribute('value', wiz.customSkillLabels[id]); }
            }
        }
    });

    fecharWizard();
}

function setInput(id, val) {
    const el = document.getElementById(id);
    if (el) { el.value = val; el.setAttribute('value', val); }
}
function createSkills(l) {
    var csks = [];
    const isPt = (l === 'pt-br');
    
    // Configura o cabeçalho e a barra de rolagem customizada
    document.getElementById('skills').innerHTML = '<h2 id="sknam">' + (isPt ? 'Perícias' : 'Skills') + '</h2><div style="clear: both;"></div><div style="clear: both;" class="centralized container" id="customDDiv"><input style="display: inline-block;" class="form-control centralized diceC" type="text" name="custom" id="customd" placeholder="' + (isPt ? 'Dados (Ex: 1d4+1d8+5)' : 'Dice (E.g. 1d4+1d6)') + '"><button class="btn btn-primary" onclick="RollCustom()">Roll</button></div>';
    document.getElementById('skills').hidden = false;

    // Prepara as 4 colunas
    var in1 = document.createElement('div'); in1.className = 'innerWin container sk';
    var in2 = document.createElement('div'); in2.className = 'innerWin container sk';
    var in3 = document.createElement('div'); in3.className = 'innerWin container sk';
    var in4 = document.createElement('div'); in4.className = 'innerWin container sk';
    
    const customDDiv = document.getElementById('customDDiv');
    document.getElementById('skills').insertBefore(in1, customDDiv);
    document.getElementById('skills').insertBefore(in2, customDDiv);
    document.getElementById('skills').insertBefore(in3, customDDiv);
    document.getElementById('skills').insertBefore(in4, customDDiv);

    // 1. Extrai as perícias do SKILL_CATALOG
    let skillsArray = Object.keys(SKILL_CATALOG).map(id => {
        return {
            id: parseInt(id),
            name: isPt ? SKILL_CATALOG[id].pt : SKILL_CATALOG[id].en,
            base: SKILL_CATALOG[id].base,
            custom: SKILL_CATALOG[id].custom || false
        };
    });

    // 2. Ordena alfabeticamente respeitando o idioma e a acentuação
    skillsArray.sort((a, b) => a.name.localeCompare(b.name, isPt ? 'pt-BR' : 'en-US'));

    // 3. Monta o HTML e distribui nas 4 colunas
    for (var i = 0; i < skillsArray.length; i++) {
        var sk = skillsArray[i];
        
        var div1 = document.createElement('div');
        div1.setAttribute('name', "sk" + sk.id);
        div1.className = 'container ininnerWin skill';
        
        var div2 = document.createElement('div');
        div2.style = 'clear: both;';
        
        var div3 = document.createElement('div');
        div3.style = "width: 45%;";
        
        if (sk.custom) {
            var inp = document.createElement('input');
            inp.setAttribute('onchange', 'cvalue(this)');
            inp.className = 'form-control inp';
            inp.style = 'float: left; margin-right: 10px;';
            inp.placeholder = '(' + sk.name + ')';
            csks.push("+1");
            inp.id = "csk" + csks.length;
            div3.appendChild(inp);
        } else {
            var h5 = document.createElement('h5');
            h5.style = 'float: left; margin-right: 10px;';
            h5.innerHTML = sk.name;
            div3.appendChild(h5);
        }
        
        var div4 = document.createElement('div');
        var btn = document.createElement('button');
        btn.style = 'float: right; margin-left: 5px;';
        btn.className = 'btn btn-primary';
        btn.setAttribute('onclick', 'Roll(this)');
        btn.innerHTML = 'Roll';
        
        var inp2 = document.createElement('input');
        inp2.setAttribute('onchange', 'cvalue(this)');
        inp2.type = 'number';
        inp2.name = 'sk' + sk.id;
        inp2.id = 'sk' + sk.id;
        inp2.className = 'form-control inp';
        inp2.style = 'float: right; width: 10%;';
        inp2.value = sk.base;
        
        var div5 = document.createElement('div');
        div5.style = 'clear: both;';
        
        div4.appendChild(btn);
        div4.appendChild(inp2);
        div1.appendChild(div2);
        div1.appendChild(div3);
        div1.appendChild(div4);
        div1.appendChild(div5);
        
        // Distribui as 60 perícias em grupos de 15 por coluna
        if (i < 15) {
            in1.appendChild(div1);
        } else if (i < 30) {
            in2.appendChild(div1);
        } else if (i < 45) {
            in3.appendChild(div1);
        } else {
            in4.appendChild(div1);
        }
    }
}
createSkills(document.getElementById('lsel').value)