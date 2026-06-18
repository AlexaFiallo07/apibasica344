function sumar(){
   let v1= parseInt(document.getElementById('campo1').value) || 0
   let v2= parseInt(document.getElementById('campo2').value) || 0
   let v3= parseInt(document.getElementById('campo3').value) || 0

   let resultado =v1+v2+v3
   document.getElementById('res').value = resultado
   document.getElementById('yoshi').play()
}

function restar(){
   let v1= parseInt(document.getElementById('campo1').value) || 0
   let v2= parseInt(document.getElementById('campo2').value) || 0
   let v3= parseInt(document.getElementById('campo3').value) || 0

   let resultado =v1-v2-v3
   document.getElementById('res').value = resultado
   document.getElementById('yoshi').play()
}

function multiplicar(){
   let v1= parseInt(document.getElementById('campo1').value) || 1
   let v2= parseInt(document.getElementById('campo2').value) || 1
   let v3= parseInt(document.getElementById('campo3').value) || 1

   let resultado =v1*v2*v3
   document.getElementById('res').value = resultado
   document.getElementById('yoshi').play()
}

function dividir(){
   let v1= parseInt(document.getElementById('campo1').value) || 1
   let v2= parseInt(document.getElementById('campo2').value) || 1
   let v3= parseInt(document.getElementById('campo3').value) || 1

   let resultado =v1/v2/v3
   document.getElementById('res').value = resultado
   document.getElementById('yoshi').play()
}

function potencia(){
   let v1= parseFloat(document.getElementById('campo1').value) || 0;
   let v2= parseFloat(document.getElementById('campo2').value) || 0;

   let resultado = Math.pow(v1, v2);
   document.getElementById('res').value = resultado;
   document.getElementById('yoshi').play();
}

function raiz(){
   let v1 = parseInt(document.getElementById('campo1').value) || 0;
   let v2 = parseInt(document.getElementById('campo2').value) || 0;
   let v3 = parseInt(document.getElementById('campo3').value) || 0;

   if (v1 < 0 || v2 < 0 || v3 < 0) {
      document.getElementById('res').value = 'No se puede calcular raíz negativa';
   } else {
      let resultado = Math.sqrt(v1) + Math.sqrt(v2) + Math.sqrt(v3);
      document.getElementById('res').value = resultado;
   }

   document.getElementById('yoshi').play();
}
   

