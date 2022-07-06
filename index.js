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
        return "Disastre"
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