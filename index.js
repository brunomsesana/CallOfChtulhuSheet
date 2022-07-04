function Roll(t){
    var rand = Math.floor(Math.random() * 100) + 1
    document.getElementById('rollimg').style.width = '0%'
    document.getElementById('rolltxt').hidden = true
    document.getElementById('result').hidden = true
    document.getElementById('panel').hidden = false
    // console.log(rand)
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
    document.getElementById('using2').innerHTML = "Normal: " + t.parentNode.getElementsByTagName('input')[0].value + "<br>Good: " + Math.floor(t.parentNode.getElementsByTagName('input')[0].value/2) + "<br>Extreme: " + Math.floor(t.parentNode.getElementsByTagName('input')[0].value/5);
    // console.log("Normal: " + t.parentNode.getElementsByTagName('input')[0].value + " // Bom: " + Math.floor(t.parentNode.getElementsByTagName('input')[0].value / 2) + " // Extremo: " + Math.floor(t.parentNode.getElementsByTagName('input')[0].value / 5))
}
function R(s){
    console.log(s.split("d"))
    var s2 = s.split("d")
    for(var i = 0; i< s2.length; i++){
        var s3;
        //Surtei, mas tem que verificar se é array pra resolver o problema que tá dando quando coloca algo tipo "2d4+3-2d4"
        if (s2[i].search(/\+/) != -1){
            s3 = s2[i].split('+')
            for(var e = 1; e < s3.length; e+=2){
                s3.splice(e, 0, "+")
            }
            s2[i] = s3
        }
        else if (s2[i].search(/\-/) != -1){
            if(Array.isArray(s2[i])){
                for(var o = 0; o < s2[i].length; o++){
                    var s4;
                    s4 = s2[i].split('-')
                    for(var e = 1; e < s4.length; e+=2){
                        s4.splice(e, 0, "-")
                    }
                    s3[o] = s4
                }
                s2[i] = s3
            } else {
                s3 = s2[i].split('-')
                for(var e = 1; e < s3.length; e+=2){
                    s3.splice(e, 0, "-")
                }
                s2[i] = s3
            }
        }
    }
    console.log(s2)
        // if(Array.isArray(s2[i])){
        //     for (var e = 0; e < s2[i-1]; e++){
        //         Ro(s2)
        //     }
        // }
}
function Ro(q){
    return Math.floor(Math.random() * q) + 1
}
function checkResult(rand, check){
    var ex = check/5;
    var go = check/2;
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
function cvalue(t){
    t.setAttribute('value', t.value)
}