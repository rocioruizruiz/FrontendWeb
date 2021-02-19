/*

INIT ON BODY LOAD()

*/

var playerpixelsamove = 30;
var met_size = 120;
var player_width = 200;
var player_height = 83;
var move_loop;
var createmet_loop;
var createinv_loop;
var moveinv_loop;

function move(){
    try {
        if(document.getElementById('player').style.left === '') document.getElementById('player').style.left = (screen.width/2) - (document.getElementById('player').style.width/2) + 'px';
        if(document.getElementById('player').style.top === '') document.getElementById('player').style.top = (screen.height/2) - (document.getElementById('player').style.height/2) + 'px';
        document.getElementById('container').style.width = screen.width + 'px';
        document.getElementById('container').style.height = screen.height + 'px';
        
        
        var timeinit = Math.floor(Math.random()*1000 + 1000);
        if( createmet_loop !== undefined){
            clearInterval(createmet_loop);
        }
        createmet_loop = setInterval(initMeteoroids, timeinit);


        var timemove = Math.floor(Math.random()*35 + 20);
        if( move_loop !== undefined){
            clearInterval(move_loop);
        }
        move_loop = setInterval(moveMeteoroids, timemove);


        var timeinitinv = Math.floor(Math.random()*2000 + 5000);
        if( createinv_loop !== undefined){
            clearInterval(createinv_loop);
        }
        createinv_loop = setInterval(initInvasors, timeinitinv);

        var timemoveinv =  Math.floor(Math.random()*35 + 20);
        if( moveinv_loop !== undefined){
            clearInterval(moveinv_loop);
        }
        moveinv_loop = setInterval(moveInvasors, timemoveinv);

    } catch (error) {
        throw error(error);
    }
    
}


/*

NAVES INVASORAS

*/

var inv_width = 300;
var inv_height = 200;
var pixelsmovementinv = 20;
var auxpixelsmovementinv = pixelsmovementinv;

function initInvasors(){
    var img = document.createElement('img');
    img.src = './img/invasor.png';
    img.width = inv_width; img.height = inv_height; img.id = 'inv';
    img.style.top = 0 + 'px';
    img.style.left = screen.width - inv_width + 'px';
    img.style.position = 'absolute';
    document.getElementById('container').appendChild(img); 
    
} 

function moveInvasors(){
    var invasor = document.getElementById('inv');
    if(invasor){
        //Si se van de la pantalla por la izquierda
        if(parseInt(invasor.style.left.replace("px", "")) < 0){
            deleteObject(invasor);
        }else{
            var posX = parseInt(invasor.style.left.replace("px",""));

            //VELOCIDADES DISTINTAS
            pixelsmovementinv = Math.floor( Math.random()*5 + pixelsmovementinv);
            //DIRECCIÓN LATERAL IZQUIERDA 
            invasor.style.left = posX - pixelsmovementinv + 'px';
            pixelsmovementinv = auxpixelsmovementinv;
        }
    }
    
    
}

/*

ATAQUE

*/

var mis_width = 20;
var mis_height = 100;
var movemisil_loop;
var pixelsmovementmis = 10;

function createMisil(){
    var img = document.createElement('img');
    img.src = './img/misil.png';
    img.width = mis_width; img.height = mis_height; img.className = 'mis';
    img.style.top = parseInt(document.getElementById('player').style.top.replace("px","")) - mis_height + 'px';
    img.style.left = parseInt(document.getElementById('player').style.left.replace("px","")) + (player_width/2) + 'px';
    img.style.position = 'absolute';
    document.getElementById('container').appendChild(img); 

    var timeinitmisil = Math.floor(Math.random()*35 + 20);
    if( movemisil_loop !== undefined){
        clearInterval(movemisil_loop);
    }
    movemisil_loop = setInterval(moveMisil, timeinitmisil);
}

function moveMisil(){
    var misils = document.getElementsByClassName('mis');
    for(i = 0; i < misils.length; i++){
        detectarColisionInv(misils[i]);
        //Si se van de la pantalla por arriba
        if(parseInt(misils[i].style.top.replace("px", "")) <= 0){
            deleteObject(misils[i]);
            continue;
        }
        var posY = parseInt(misils[i].style.top.replace("px",""));

        //DIRECCIÓN LATERAL IZQUIERDA 
        misils[i].style.top = posY - pixelsmovementmis + 'px';
    }
}

function detectarColisionInv(mis){
    var inv = document.getElementById('inv');
    if(inv){
        var mis_pos = {
            t : parseInt(mis.style.top.replace("px","")),
            l : parseInt(mis.style.left.replace("px","")), 
            r : parseInt(mis.style.left.replace("px","")) + mis_width, 
            b : parseInt(mis.style.top.replace("px","")) + mis_height
        };
        var inv_pos =  {
            t: parseInt(inv.style.top.replace("px","")),
            l: parseInt(inv.style.left.replace("px","")), 
            r: parseInt(inv.style.left.replace("px","")) + inv_width, 
            b: parseInt(inv.style.top.replace("px","")) + inv_height
        };
    
        //Detecta si se superponen las áreas
        if(mis_pos.l <= inv_pos.r && mis_pos.r >= inv_pos.l 
        && mis_pos.b >= inv_pos.t && mis_pos.t <= inv_pos.b){
            
            clearInterval(move_loop);
            clearInterval(createmet_loop);
            clearInterval(moveinv_loop);
            clearInterval(createinv_loop);
            clearInterval(movemisil_loop);
            
            
            document.getElementById('win').style.visibility = "visible";
            document.getElementById('container').style.background = "black";
            
            document.getElementById('container');
            container.innerHTML = '';  
            
         }
    }
    
    
}



/* 

----------   NAVE player   ------------

*/

document.addEventListener("keydown", (k) => {
    positionX = document.getElementById('player').style.top;
    var posX = parseInt(positionX.replace("%",""));

    positionY = document.getElementById('player').style.left;
    var posY = parseInt(positionY.replace("%",""));

    switch(k.key){
        case "ArrowRight": 
            document.getElementById('player').style.left = posY + playerpixelsamove + 'px';
            break;
        case "ArrowLeft": 
            document.getElementById('player').style.left = posY - playerpixelsamove + 'px';
            break;
        case "ArrowUp": 
            document.getElementById('player').style.top = posX - playerpixelsamove + 'px';
            break;
        case "ArrowDown": 
            document.getElementById('player').style.top = posX + playerpixelsamove + 'px';
            break;
        case " ":
            createMisil();
            break;
    }
})



function detectarColisionMet(met){
    var player = document.getElementById('player');
  
    var met_pos = {
        t : parseInt(met.style.top.replace("px","")),
        l : parseInt(met.style.left.replace("px","")), 
        r : parseInt(met.style.left.replace("px","")) + met_size, 
        b : parseInt(met.style.top.replace("px","")) + met_size
    };
    var player_pos =  {
        t: parseInt(player.style.top.replace("px","")),
		l: parseInt(player.style.left.replace("px","")), 
        r: parseInt(player.style.left.replace("px","")) + player_width, 
        b: parseInt(player.style.top.replace("px","")) + player_height
    };

    //Detecta si se superponen las áreas
    if(met_pos.l <= player_pos.r && met_pos.r >= player_pos.l 
    && met_pos.b >= player_pos.t && met_pos.t <= player_pos.b ){
        
        clearInterval(move_loop);
        clearInterval(createmet_loop);
        clearInterval(moveinv_loop);
        clearInterval(createinv_loop);
        clearInterval(movemisil_loop);
        
        document.getElementById('gameover').style.visibility = "visible";
        document.getElementById('container').style.background = "black";
        
        var container = document.getElementById('container');
        container.innerHTML = '';  
        
 	}
    
}








/*

---------------   METEORITOS   -------------

*/

var pixelsmovement = 10;
var auxpixelsmovement = pixelsmovement;
var over = false;
var shift = 3;



function moveMeteoroids(){
    var meteorits = document.getElementsByClassName('met');
    for(i = 0; i < meteorits.length; i++){
        detectarColisionMet(meteorits[i]);
        //Si se van de la pantalla por la izquierda lo elimino
        if(meteorits[i].style.transform === "rotate(90deg)" && meteorits[i].style.left <= -met_size + 'px'){
            deleteMeteoroid(meteorits[i]);
            continue;
        } 
        //Si se van de la pantalla por abajo
        if(meteorits[i].style.top === screen.height + 'px') {
            deleteMeteoroid(meteorits[i]);
            continue;
        }
        //Si se van de la pantalla por la derecha
        if(meteorits[i].style.transform != "rotate(90deg)" && parseInt( meteorits[i].style.left.replace("px",'')) >=  parseInt( document.getElementById('container').style.width.replace("px",""))){
            deleteMeteoroid(meteorits[i]);
            continue;
        }
        var positionX = meteorits[i].style.top;
        var posX = parseInt(positionX.replace("px",""));
        var positionY = meteorits[i].style.left;
        var posY = parseInt(positionY.replace("px",""));

        //VELOCIDADES DISTINTAS
        if(i%3===0) pixelsmovement =+ 5;
        meteorits[i].style.top = posX + pixelsmovement + 'px';

        //DIRECCIÓN SEGUN LA POSICION DEL METEORITO
        if(meteorits[i].style.transform === "rotate(90deg)"){    
            meteorits[i].style.left = posY - pixelsmovement + 'px';
        }else{
            meteorits[i].style.left = posY + pixelsmovement + 'px';
        }
        pixelsmovement = auxpixelsmovement;
    }
}

// SE CREAN LOS METEORITOS
function initMeteoroids(){
    var meteorits = document.getElementsByClassName('met');
    for(i = 0; i < Math.floor(Math.random()*6); i++){
        var img = document.createElement('img');
        img.src = './img/meteoroid.png';
        img.width = met_size; img.height = met_size; img.className = 'met';
        img.style.top = 0 + 'px';
        img.style.left = Math.floor(Math.random() * (screen.width - img.style.width)) + 'px';
        img.style.position = 'absolute';
        if(i%2 !== 0){
            img.style.transform = 'rotate(90deg)';
        }
        document.getElementById('container').appendChild(img); 
    }
} 



// SE ELIMINAN LOS METEORITOS
function deleteObject(obj){
    try{
        var parent = document.getElementById('container');
        console.log('tryeeeeeeeeeeeeeeeeeeeeeeeeeeeed', parent);
        parent.removeChild(obj);

    }catch(e){
        throw error(e);
    }
}

function deleteMeteoroid(met){
    try{
        var parent = document.getElementById('container');
        parent.removeChild(met);
    }catch(e){
        throw error(e);
    }
 }










