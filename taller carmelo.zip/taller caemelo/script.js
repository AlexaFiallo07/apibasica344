function comparar(){
    let cadena1=(document.getElementById('text1').value).trim().length;
    let cadena2=(document.getElementById('text2').value).trim().length;

    let res = document.getElementById ('res')
    if(cadena1==cadena2){
        res.value = "las frases tienen el mismo tamaño"
    }else if(cadena1>cadena2){
        res.value = "la frase 1 es mas grade en tamaño"
    }else{
        res.value = "la frase 2 es mas grande en tamaño"
    }
}

function contar(){
    let cadena1=(document.getElementById('text1').value).trim();
    let cadena2=(document.getElementById('text2').value).trim();
    let res = document.getElementById('res')

    if(cadena1 ==="" || cadena2 ===""){
        res.value = "debe ingresar texto en ambos campos";
        return;
    }

    let caracter = cadena2.charAt(0);
    let contador = 0;

    for (let i = 0; i<cadena1.length; i++){
        if (cadena1[i] === caracter){
            contador++;
        }
    }

    if (contador === 0){ 
        res.value = "el caracter no se encuentra en la cadena";
    } else{
        res.value = "el caracter aparece" + contador + "veces";
    }
}

function eliminar_espacios(){
    let cadena1=(document.getElementById('text1').value).trim();
    let cadena2=(document.getElementById('text2').value).trim():
    let res = document.getElementById ('res')

    if(cadena1  !== ""){
        res.value = cadena1.replace(/\s/g,"");
    } else {
        res.value = "ingrese una cadena";
    }
}
