# Ejercicios de Apropiación - Taller Caemelo

## 📚 Descripción General

Este conjunto de ejercicios te guía a través de los conceptos fundamentales de manipulación del DOM en JavaScript, desde lo básico hasta conceptos más avanzados como integración con APIs externas.

## 📁 Archivos Incluidos

### Ejercicios Principales

1. **ejercicio_apropiacion_1.html** - Agenda de Contactos Básica
   - Conceptos: Selección de elementos, creación de elementos, eventos
   - Dificultad: ⭐ Principiante
   - Tiempo estimado: 45 minutos

2. **ejercicio_apropiacion_2.html** - Manipulación de Clases CSS
   - Conceptos: createAttribute, setAttributeNode, classList.toggle()
   - Dificultad: ⭐⭐ Intermedio
   - Tiempo estimado: 60 minutos

3. **ejercicio_apropiacion_3.html** - Tablas Dinámicas
   - Conceptos: Arreglos, forEach, creación dinámica de tablas
   - Dificultad: ⭐⭐ Intermedio
   - Tiempo estimado: 75 minutos

4. **ejercicio_apropiacion_3a.html** - Búsqueda y Filtrado
   - Conceptos: Eventos input, querySelectorAll, lógica de visibilidad
   - Dificultad: ⭐⭐ Intermedio
   - Tiempo estimado: 90 minutos

5. **ejercicio_propuesto_tienda.html** - Tienda Online con FakeStore API
   - Conceptos: Fetch API, async/await, gestión de estado, APIs externas
   - Dificultad: ⭐⭐⭐ Avanzado
   - Tiempo estimado: 120 minutos

### Recursos de Aprendizaje

- **cuestionario_autoevaluacion.html** - Cuestionario interactivo con 14 preguntas
- **guia_referencia_rapida.html** - Guía de referencia con métodos y patrones comunes

## 🚀 Cómo Usar

### Opción 1: Con Servidor Local (Recomendado)
```bash
# Si tienes Python 3 instalado:
python -m http.server 8000

# Si tienes Node.js:
npx http-server

# Luego abre en el navegador:
# http://localhost:8000
```

### Opción 2: Directamente en el Navegador
Simplemente abre cualquier archivo `.html` con doble clic o arrastra a tu navegador.

**Nota:** El ejercicio propuesto (tienda online) necesita un servidor local porque hace peticiones a una API externa.

## 📖 Flujo de Aprendizaje Recomendado

### Semana 1
1. Abre **ejercicio_apropiacion_1.html**
2. Analiza el código
3. Modifica el código:
   - Cambia el placeholder de los inputs
   - Agrupa contactos por inicial del nombre
   - Añade un contador de contactos

### Semana 2
1. Abre **ejercicio_apropiacion_2.html**
2. Responde las preguntas del código
3. Experimenta:
   - Cambia los colores de la clase `.aspecto-destacado`
   - Añade una tercera clase para "urgente"
   - Implementa animaciones con CSS

### Semana 3
1. Abre **ejercicio_apropiacion_3.html**
2. Entiende la creación de tablas dinámicas
3. Practica:
   - Agregar columna de "edad"
   - Ordenar tabla por nombre
   - Cambiar tabla a lista

### Semana 4
1. Abre **ejercicio_apropiacion_3a.html**
2. Prueba el buscador
3. Mejora la búsqueda:
   - Buscar también por teléfono
   - Mostrar número de resultados
   - Buscar por múltiples campos

### Semana 5
1. Abre **ejercicio_propuesto_tienda.html**
2. Observa cómo funcionan los productos de la API
3. Extiende la funcionalidad:
   - Filtrar por categoría
   - Ordenar por precio
   - Implementar persistencia del carrito con localStorage
   - Mostrar cantidad en el carrito

## 🎯 Objetivos de Cada Ejercicio

### Ejercicio 1
✓ Obtener referencias a elementos del DOM
✓ Crear eventos con addEventListener
✓ Crear elementos dinámicamente
✓ Validar entrada del usuario
✓ Eliminar elementos del DOM

### Ejercicio 2
✓ Entender createAttribute y setAttributeNode
✓ Usar classList.toggle para efectos dinámicos
✓ Manipular estilos sin cambiar HTML
✓ Contar elementos con querySelectorAll

### Ejercicio 3
✓ Trabajar con arrays de objetos
✓ Iterar con forEach
✓ Crear estructuras HTML complejas dinámicamente
✓ Manejar eventos en elementos creados dinámicamente

### Ejercicio 3.a
✓ Usar evento 'input' para búsqueda en tiempo real
✓ Filtrar usando includes()
✓ Manipular visibilidad con display: none
✓ Buscar en múltiples campos

### Ejercicio Propuesto
✓ Trabajar con APIs externas (Fetch)
✓ Usar async/await
✓ Gestionar estado con arrays
✓ Crear interfaces complejas
✓ Manejar errores de red

## 💡 Tips y Trucos

### Debugging
```javascript
// Para ver qué elementos estás seleccionando:
console.log(document.getElementById('miId'));

// Para ver todos los elementos que coinciden:
console.log(document.querySelectorAll('.miClase'));

// Para ver el contenido actual de un elemento:
console.log(elemento.innerHTML);
```

### Trabajar con Múltiples Elementos
```javascript
// En lugar de hacer esto múltiples veces:
document.getElementById('elemento1').style.color = 'red';
document.getElementById('elemento2').style.color = 'red';

// Haz esto:
document.querySelectorAll('.mi-clase').forEach(el => {
  el.style.color = 'red';
});
```

### Crear Elementos de Forma Limpia
```javascript
// En lugar de:
elemento.innerHTML = '<button>Clic</button>';

// Mejor:
const btn = document.createElement('button');
btn.textContent = 'Clic';
elemento.appendChild(btn);
```

## 🔍 Respuestas a Preguntas Comunes

**P: ¿Cuál es la diferencia entre innerHTML y innerText?**
R: innerHTML interpreta HTML, innerText solo texto. Usa innerText para datos del usuario.

**P: ¿Por qué algunas cosas no funcionan?**
R: Abre la consola (F12) y busca errores rojos. El 90% de los problemas se ven en la consola.

**P: ¿Cómo sé si estoy haciendo bien el ejercicio?**
R: Si funciona, ¡lo hiciste bien! Luego enfócate en hacerlo más limpio y eficiente.

**P: ¿Qué hago después de terminar los ejercicios?**
R: Combina conceptos - crea tu propia aplicación pequeña usando lo que aprendiste.

## 📋 Autoevaluación

Después de completar todos los ejercicios:

1. Abre **cuestionario_autoevaluacion.html**
2. Responde todas las preguntas sin ver las respuestas primero
3. Verifica tu calificación
4. Para cada pregunta que falles, revisa nuevamente ese ejercicio

**Puntaje Recomendado:** 80% o superior para pasar a proyectos más complejos

## 🔗 Referencia Rápida

**Seleccionar elementos:**
- `getElementById()` - por ID
- `querySelector()` - primer elemento que coincida
- `querySelectorAll()` - todos los que coincidan

**Crear elementos:**
- `createElement()` - crear elemento
- `createTextNode()` - crear texto
- `appendChild()` - agregar elemento

**Manipular estilos:**
- `classList.add()` - agregar clase
- `classList.remove()` - quitar clase
- `classList.toggle()` - alternar clase

**Eventos útiles:**
- `click` - cuando se hace clic
- `input` - mientras se escribe
- `change` - después de cambiar
- `submit` - al enviar formulario

## 📞 Necesitas Ayuda?

1. Abre la **guia_referencia_rapida.html** para recordar sintaxis
2. Revisa el código comentado en los ejercicios
3. Prueba en la consola (F12) comandos pequeños
4. Busca ejemplos en MDN Web Docs

## ✅ Checklist de Progreso

- [ ] Ejercicio 1 completado y entendido
- [ ] Ejercicio 2 completado y entendido
- [ ] Ejercicio 3 completado y entendido
- [ ] Ejercicio 3.a completado y entendido
- [ ] Ejercicio propuesto completado
- [ ] Cuestionario respondido (80%+)
- [ ] Guía de referencia consultada y marcadas conceptos clave
- [ ] Creado un proyecto pequeño propio

---

**Última actualización:** Abril 2026
**Nivel de dificultad:** Principiante a Intermedio
**Tiempo total de estudio:** ~5-6 horas
