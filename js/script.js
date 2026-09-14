// Array de datos curiosos sobre Laurie Anderson
const datosCuriosos = [
    "Laurie Anderson fue una de las primeras artistas en combinar performance, música experimental y tecnología en la escena del arte contemporáneo.",
    "Su tema O Superman se convirtió en un éxito inesperado en 1981 y llegó al segundo puesto en los rankings del Reino Unido.",
    "Diseñó su propio violín eléctrico que le permitía tocar sonidos digitales y activar efectos con sensores.",
    "Ha colaborado con artistas como Lou Reed, con quien estuvo casada hasta su fallecimiento en 2013.",
    "En 2002 fue nombrada la primera artista residente de la NASA, desarrollando obras inspiradas en la exploración espacial.",
    "Su instalación de realidad virtual Chalkroom recibió el premio a mejor experiencia inmersiva en el Festival de Cine de Venecia en 2017.",
    "Utiliza su propia voz alterada digitalmente como herramienta narrativa y estética en muchas de sus obras.",
    "Ha creado instalaciones multimedia que combinan texto, imagen y sonido en entornos sensoriales de gran escala.",
    "Su obra cruza permanentemente los límites entre arte, ciencia, política y poesía.",
    "Sigue siendo una figura activa e influyente en el arte digital y ha experimentado con inteligencia artificial en proyectos recientes."
];

let indiceActual = 0;

// Botón Siguiente
const botonDato = document.getElementById('botonDato');
const textoDato = document.getElementById('textoDato');

if (botonDato) {
    botonDato.addEventListener('click', function() {
        textoDato.textContent = datosCuriosos[indiceActual];
        indiceActual = (indiceActual + 1) % datosCuriosos.length;
    });
}

// Botón Diseño
const botonDiseno = document.getElementById('botonDiseno');
const textoDiseno = document.getElementById('textoDiseno');

if (botonDiseno) {
    botonDiseno.addEventListener('click', function() {
        document.body.classList.toggle('galeria-alt');
        
        if (document.body.classList.contains('galeria-alt')) {
            textoDiseno.textContent = 'Diseño alternativo activado. Haz clic para volver.';
        } else {
            textoDiseno.textContent = 'Si se le hace incómodo, haga click.';
        }
    });
}

// Variables globales
let cantidadObras = 0;
let tiempoTransferencia = 0;
let costoMensual = 0;
let obrasGuardadas = [];
let contadorObras = 0;

// Capturo los elementos del DOM
let inputCO = document.querySelector('#CO');
let inputTT = document.querySelector('#TT');
let inputCM = document.querySelector('#CM');
let inputNombre = document.querySelector('#O');
let inputMinutos = document.querySelector('#M');
let inputMB = document.querySelector('#MB');

let paso1 = document.querySelector('#paso1');
let paso2 = document.querySelector('#paso2');
let btnSiguiente = document.querySelector('#S');
let btnGuardarObra = document.querySelector('#GO');
let btnCalcular = document.querySelector('#paso3');

// PASO 1: Confirmar datos iniciales
btnSiguiente.addEventListener('click', function() {
    // Validar que los campos no estén vacíos
    if (inputCO.value === '' || inputTT.value === '' || inputCM.value === '') {
        alert('Por favor completa todos los campos');
        return;
    }

    if (inputCO.value <= 0 || inputTT.value <= 0 || inputCM.value <= 0) {
        alert('Los valores deben ser mayores a 0');
        return;
    }

    // Guardar valores
    cantidadObras = parseInt(inputCO.value);
    tiempoTransferencia = parseInt(inputTT.value);
    costoMensual = parseInt(inputCM.value);

    // Deshabilitar paso 1
    inputCO.disabled = true;
    inputTT.disabled = true;
    inputCM.disabled = true;
    btnSiguiente.disabled = true;

    // Mostrar paso 2
    paso2.hidden = false;
    inputNombre.focus();
});

// PASO 2: Guardar obras
btnGuardarObra.addEventListener('click', function() {
    // Validar campos
    if (inputNombre.value === '' || inputMinutos.value === '' || inputMB.value === '') {
        alert('Por favor completa todos los campos');
        return;
    }

    if (inputMinutos.value <= 0 || inputMB.value <= 0) {
        alert('La duración y el peso deben ser mayores a 0');
        return;
    }

    // Crear un objeto con los datos de la obra
    let obra = {
        nombre: inputNombre.value,
        minutos: parseInt(inputMinutos.value),
        mb: parseInt(inputMB.value)
    };

    // Guardar la obra en el array
    obrasGuardadas.push(obra);
    contadorObras++;

    // Limpiar campos
    inputNombre.value = '';
    inputMinutos.value = '';
    inputMB.value = '';
    inputNombre.focus();

    // Verificar si se completó la carga
    if (contadorObras === cantidadObras) {
        btnGuardarObra.disabled = true;
        btnCalcular.disabled = false;
    }
});

// PASO 3: Calcular resultados
btnCalcular.addEventListener('click', function() {
    calcularResultados();
});

function calcularResultados() {
    // Calcular duración total
    let duracionTotal = 0;
    
    for (let i = 0; i < obrasGuardadas.length; i++) {
        duracionTotal += obrasGuardadas[i].minutos;
    }

    // Calcular duración promedio
    let duracionPromedio = duracionTotal / obrasGuardadas.length;

    // Encontrar la obra de mayor duración
    let obraMasLarga = obrasGuardadas[0];
    
    for (let i = 1; i < obrasGuardadas.length; i++) {
        if (obrasGuardadas[i].minutos > obraMasLarga.minutos) {
            obraMasLarga = obrasGuardadas[i];
        }
    }

    // Calcular tiempo de descarga de la obra más larga
    let tiempoDescargaObraMasLarga = obraMasLarga.mb * tiempoTransferencia;

    // Calcular peso total de todas las obras
    let pesoTotal = 0;
    
    for (let i = 0; i < obrasGuardadas.length; i++) {
        pesoTotal += obrasGuardadas[i].mb;
    }

    // Calcular presupuesto anual (peso total × costo por MB × 12 meses)
    let presupuestoAnual = pesoTotal * costoMensual * 12;

    // Mostrar resultados
    mostrarResultados(duracionTotal, duracionPromedio, obraMasLarga, tiempoDescargaObraMasLarga, presupuestoAnual);
}

function mostrarResultados(duracionTotal, duracionPromedio, obraMasLarga, tiempoDescarga, presupuesto) {
    // Crear HTML con los resultados
    let resultadosHTML = '<div id="resultados">';
    resultadosHTML += '<h2>Resultados</h2>';
    resultadosHTML += '<p><strong>Duración total:</strong> ' + duracionTotal + ' minutos</p>';
    resultadosHTML += '<p><strong>Duración promedio:</strong> ' + duracionPromedio.toFixed(2) + ' minutos</p>';
    resultadosHTML += '<p><strong>Obra más larga:</strong> "' + obraMasLarga.nombre + '" (' + obraMasLarga.minutos + ' minutos)</p>';
    resultadosHTML += '<p><strong>Tiempo de descarga de la obra más larga:</strong> ' + tiempoDescarga + ' ms</p>';
    resultadosHTML += '<p><strong>Presupuesto anual:</strong> $' + presupuestoAnual + '</p>';
    resultadosHTML += '<button id="reiniciar" type="button">Reiniciar</button>';
    resultadosHTML += '</div>';

    // Agregar resultados al main
    let main = document.querySelector('main');
    main.innerHTML += resultadosHTML;

    // Agregar evento al botón reiniciar
    let btnReiniciar = document.querySelector('#reiniciar');
    btnReiniciar.addEventListener('click', function() {
        reiniciar();
    });
}

function reiniciar() {
    // Limpiar variables
    cantidadObras = 0;
    tiempoTransferencia = 0;
    costoMensual = 0;
    obrasGuardadas = [];
    contadorObras = 0;

    // Limpiar formulario
    inputCO.value = '';
    inputTT.value = '';
    inputCM.value = '';
    inputNombre.value = '';
    inputMinutos.value = '';
    inputMB.value = '';

    // Habilitar paso 1
    inputCO.disabled = false;
    inputTT.disabled = false;
    inputCM.disabled = false;
    btnSiguiente.disabled = false;

    // Deshabilitar paso 2
    paso2.hidden = true;
    btnGuardarObra.disabled = false;
    btnCalcular.disabled = true;

    // Eliminar resultados
    let resultados = document.querySelector('#resultados');
    if (resultados) {
        resultados.remove();
    }

    inputCO.focus();
}
