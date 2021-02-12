function setResult(value) { //pone el valor en pantalla
    document.getElementById('display').innerHTML = value;
}
function getResult() {      //recoge el valor introducido
    return(document.getElementById('display').innerHTML);
}
function add(key) {         //decide si se añade
    var result = getResult();
    
    if(key == 'x') key = '*';
    if(key == '÷') key = '/';
    if(key == ',') key = '.';

    if (result!='0' || isNaN(key)){
        setResult(result + key);
    }else setResult(key);
}
function calc() {           // realiza el calculo utilizando eval()
    var result = eval(getResult()); 
    setResult(result);
}
function del() {            // pone vacio el display
    setResult('');
}