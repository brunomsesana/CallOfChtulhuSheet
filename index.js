function Roll(t){
    var rand = Math.floor(Math.random() * 100) + 1
    document.getElementById('rollimg').style.width = '0%'
    document.getElementById('rolltxt').hidden = true
    document.getElementById('result').hidden = true
    document.getElementById('panel').hidden = false
    // console.log(rand)
    setTimeout(() => {
        document.getElementById('rollimg').style.width = '16%'
    }, 250);
    setTimeout(() => {
        document.getElementById('rolltxt').innerHTML = rand
        document.getElementById('rolltxt').hidden = false
        document.getElementById('result').hidden = false
        document.getElementById('result').innerHTML = checkResult(rand, t.parentNode.getElementsByTagName('input')[0].value)
    }, 500);
    // console.log("Normal: " + t.parentNode.getElementsByTagName('input')[0].value + " // Bom: " + Math.floor(t.parentNode.getElementsByTagName('input')[0].value / 2) + " // Extremo: " + Math.floor(t.parentNode.getElementsByTagName('input')[0].value / 5))
}
function checkResult(rand, check){
    var ex = check/5;
    var go = check/2;
    if (rand <= ex){
        return "Extreme"
    }
    else if (rand <= go){
        return "Good"
    }
    else if (rand <= check){
        return "Normal"
    } else {
        return "Failure"
    }

}
function cvalue(t){
    t.setAttribute('value', t.value)
}