/* NAVE
document.addEventListener("keydown", (k) => {
    console.log(k.key);
    switch(k.key){
        case "ArrowUp": 
            document.getElementById('box').innerHTML = '3';
            
            break;
        case "ArrowDown": 
            document.getElementById('box').innerHTML = '4';
            break;
        case "ArrowRight": 
            document.getElementById('box').innerHTML = '5';
            break;
        case "ArrowLeft": 
            document.getElementById('box').innerHTML = '6';
            break;
    }
})
*/

var pixelsmovement = 20;
var over = false;
var shift = 3;
var image_size = 400;
var move_loop;
var createmet_loop;
function move(){
    try {
        document.getElementById('container').style.width = screen.width + 'px';
        if( createmet_loop !== undefined){
            clearInterval(createmet_loop);
        }
        createmet_loop = setInterval(initMeteoroids, 3000);

        if( move_loop !== undefined){
            clearInterval(move_loop);
        }
        console.log('interval set', move_loop);
        move_loop = setInterval(moveMeteoroids, 80);
        console.log('interval set', move_loop);
    } catch (error) {
        throw error(error);
    }
    
}

function moveMeteoroids(){
    var meteorits = document.getElementsByClassName('met');
    for(i = 0; i < meteorits.length; i++){
        //Si se van de la pantalla por la izquierda lo elimino
        if(meteorits[i].style.transform === "rotate(90deg)" && meteorits[i].style.left <= -image_size + 'px'){
            deleteMeteoroid(meteorits[i]);
            continue;
        } 
        //Si se van de la pantalla por abajo
        if(meteorits[i].style.top === screen.height + 'px') {
            console.log(meteorits[i].style.top, 'eureka');
            deleteMeteoroid(meteorits[i]);
            continue;
        }
        //Si se van de la pantalla por la derecha
        if(meteorits[i].style.transform != "rotate(90deg)" && parseInt( meteorits[i].style.left.replace("px","")) >=  parseInt( document.getElementById('container').style.width.replace("px",""))){
            console.log(meteorits[i].style.left, 'eureka', document.getElementById('container').style.width);
            deleteMeteoroid(meteorits[i]);
            continue;
        }

        var positionX = meteorits[i].style.top;
        var posX = parseInt(positionX.replace("px",""));
        var positionY = meteorits[i].style.left;
        var posY = parseInt(positionY.replace("px",""));
        meteorits[i].style.top = posX + pixelsmovement + 'px';

        if(meteorits[i].style.transform === "rotate(90deg)"){    
            meteorits[i].style.left = posY - pixelsmovement + 'px';
        }else{
            meteorits[i].style.left = posY + pixelsmovement + 'px';
        }
    }
}


function initMeteoroids(){
    var meteorits = document.getElementsByClassName('met');
    for(i = 0; i < Math.floor(Math.random()*6); i++){
        var img = document.createElement('img');
        img.src = './img/meteoroid.png';
        img.width = image_size; img.height = image_size; img.className = 'met';
        img.id='meteoroid' + i; 
        img.style.top = 0 + 'px';
        img.style.left = Math.floor(Math.random() * (screen.width - img.style.width)) + 'px';
        img.style.position = 'absolute';
        if(i%2 !== 0){
            img.style.transform = 'rotate(90deg)';
        }
        document.getElementById('container').appendChild(img); 
    }
} 

function deleteMeteoroid(met){
    try{
        var parent = document.getElementById('container');
        console.log('borrando');
        parent.removeChild(met);
    }catch(e){
        throw error(e);
    }
 }



//function meteoritAppear(){
//     var meteorits = document.getElementsByClassName('met');
//     for(i = 0; i < Math.floor(Math.random()*6); i++){
//         if(meteorits[i] == null ){
//             var img = document.createElement('img');
//             img.src = './img/meteoroid.png';
//             img.width = image_size; img.height = image_size; img.className = 'met';
//             img.id='meteoroid' + i; img.style.position = 'relative';
//             if(i%2 !== 0){
//                 img.style.transform = 'rotate(90deg)';
//             }
//             document.getElementById('container').appendChild(img); 
//             img.style.visibility = "visible";
//             moveMeteorit(img);

//         }else{
//             meteorits[i].style.visibility = "visible";
//         moveMeteorit(meteorits[i]);
//         } 
//     }
//     setInterval(meteoritAppear, 5000);
// }

// function moveMeteorit(met){
//     console.log(met);
//     if(screen.height - met.style.top < met.style.height + pixelsmovement){
//         deleteMeteorit(met);
//     }
//     if(met.style.top === ''){
//         met.style.top = 0 + 'px';
//         met.style.left = Math.floor(Math.random() * (screen.width - met.style.width)) + 'px';
//     }
//     var position = met.style.top;
//     var pos = parseInt(position.replace("px",""));
//     met.style.top = pos+3 + 'px';
//     if(i%2==0){    
//         met.style.left = pos+pixelsmovement + 'px';
//     }else{
//         met.style.right = pos+pixelsmovement + 'px';
//     }
//     setInterval(moveMeteorit,30); 
// }

// function deleteMeteorit(met){
//     clearInterval();
//     removeChild(met);
// }

// var perdido = false;
//function moveMeteorits(){
//     setInterval(moveMeteorits,500); 
//     var meteorits = document.getElementsByClassName('met');
//     while(!perdido){
//         /*
//             SI NO HAY MÁSMETEORITOS EXISTENTES
//         */
//         if(meteorits[i] == null ){
//             crearMeteorito();
//             continue;
//         }else if(meteorits[i])
//         if(meteorits[i].style.visibility === "hidden") meteorits[i].style.visibility = "visible"; 
//         if(meteorits[i].style.top === ''){
//             meteorits[i].style.top = 0 + 'px';
//             meteorits[i].style.left = Math.floor(Math.random() * (screen.width - meteorits[i].style.width)) + 'px';
//         }
//         var position = meteorits[i].style.top;
//         var pos = parseInt(position.replace("px",""));
//         meteorits[i].style.top = pos+3 + 'px';
//         if(i%2==0){    
//             meteorits[i].style.left = pos+10 + 'px';
//         }else{
//             meteorits[i].style.right = pos+10 + 'px';
//         }
//         removeChild(met);
//     };
//     setInterval(moveMeteorits,500); 
// }


/*
function initMeteoroids(){
    var meteorits = document.getElementsByClassName('met');
    for(i = 0; i < Math.floor(Math.random()*6); i++){
        var img = document.createElement('img');
        img.src = './img/meteoroid.png';
        img.width = image_size; img.height = image_size; img.className = 'met';
        img.id='meteoroid' + i; 
        img.style.top = 0 + 'px';
        img.style.left = Math.floor(Math.random() * (screen.width - img.style.width)) + 'px';
        img.style.position = 'absolute';
        if(i%2 !== 0){
            img.style.transform = 'rotate(90deg)';
        }
        document.getElementById('container').appendChild(img); 
    }
}   

function moveMeteoroids(){
    var meteorits = document.getElementsByClassName('met');
    if(meteorits === null) initMeteoroids(); 


    else{ //movemos todos los meteoritos x pixeles
         for(i=0; i < meteorits.length; i++){
             moveMeteoroid(meteorits[i]);
         }
             console.log(meteorits[i]);
            if(meteorits[i].style.top > screen.height/2) initMeteoroids();
            else if(image_size + (screen.height - meteorits[i].style.top) < image_size + shift){
                meteorits[i].style.top = screen.height-image_size + 'px';
                if(meteorits[i].style.transform != ""){    
                    meteorits[i].style.left = pos + shift + 'px';
                }else{
                    meteorits[i].style.right = pos + shift + 'px';
                }
            }else if(image_size + (screen.width - meteorits[i].style.left) < image_size + shift){
                meteorits[i].style.top = pos+shift + 'px';
                if(meteorits[i].style.transform != ""){    
                    meteorits[i].style.left = screen.width-image_size + 'px';
                }else{
                    meteorits[i].style.right = screen.width-image_size + 'px';
                }
            }else if(image_size + (screen.width - meteorits[i].style.left) === image_size + shift){

                deleteMeteoroid(meteorits[i]);

            }else{

                if(meteorits[i].style.top === ''){
                    meteorits[i].style.top = 0 + 'px';
                    meteorits[i].style.left = Math.floor(Math.random() * (screen.width - meteorits[i].style.width)) + 'px';
                }
                var position = meteorits[i].style.top;
                var pos = parseInt(position.replace("px",""));
                meteorits[i].style.top = pos+shift + 'px';
                if(meteorits[i].style.transform != ""){    
                    meteorits[i].style.left = pos + shift + 'px';
                }else{
                    meteorits[i].style.right = pos + shift + 'px';
                }
            }
        }
    }
    moveMeteoroids();
}


function deleteMeteoroids(met){
    try{
        var parent = document.getElementById('container');
        parent.removeChild(met);
    }catch(e){
        throw error(e);
    }
 }
 */








 /*
 -----------------------------
 // //si le quedan menos pixeles de alto que un deplazamiento entero, le conoco en posición final
        // if(image_size + (screen.height - meteorits[i].style.top) < image_size + shift){
        //     console.log('si le quedan menos pixeles de alto que un deplazamiento entero, le conoco en posición final');
        //     meteorits[i].style.top = screen.height-image_size + 'px';
        //     if(meteorits[i].style.transform != ""){    
        //         meteorits[i].style.left = pos + shift + 'px';
        //     }else{
        //         meteorits[i].style.right = pos + shift + 'px';
        //     }
        // //si le quedan menos pixeles de ancho que un deplazamiento entero, le conoco en posición final
        // }else if(image_size + (screen.width - meteorits[i].style.left) < image_size + shift){
        //     console.log('si le quedan menos pixeles de ancho que un deplazamiento entero, le conoco en posición final');
        //     meteorits[i].style.top = pos+shift + 'px';
        //     if(meteorits[i].style.transform != ""){    
        //         meteorits[i].style.left = screen.width-image_size + 'px';
        //     }else{
        //         meteorits[i].style.right = screen.width-image_size + 'px';
        //     }
        // //si ya está en la posición final lo elimino
        // }else if(image_size + (screen.width - meteorits[i].style.left) === image_size + shift){
        //     console.log('si está en la posicion final');
        //     deleteMeteoroid(meteorits[i]);

        //si es un desplazamiento normal
        //}else{
*/