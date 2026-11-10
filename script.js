
let valorActual = "0";
let valorAnterior = null;
let operador = null;
let reiniciarPantalla = false;
let hayError = false;

const pantalla = document.getElementById("resultado");
const operacion = document.getElementById("operacion");

function actualizarPantalla() {
    pantalla.value = valorActual;
}

function mostrarOperacion() {
    const simbolos = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    if (operador !== null && valorAnterior !== null) {
        operacion.textContent =
            `${valorAnterior} ${simbolos[operador]} ${reiniciarPantalla ? "" : valorActual}`;
    } else {
        operacion.textContent = "";
    }
}

function agregarNumero(numero) {
    if (hayError) {
        valorActual = numero;
        hayError = false;
    } else if (reiniciarPantalla) {
        valorActual = numero;
        reiniciarPantalla = false;
    } else {
        valorActual = valorActual === "0"
            ? numero
            : valorActual + numero;
    }

    actualizarPantalla();
    mostrarOperacion();
}


function agregarDecimal() {
    if (hayError || reiniciarPantalla) {
        valorActual = "0.";
        hayError = false;
        reiniciarPantalla = false;
    } else if (!valorActual.includes(".")) {
        valorActual += ".";
    }

    actualizarPantalla();
    mostrarOperacion();
}


function seleccionarOperador(nuevoOperador) {
    if (operador !== null && !reiniciarPantalla) {
        calcular();
    }

    valorAnterior = parseFloat(valorActual);
    operador = nuevoOperador;
    reiniciarPantalla = true;

    mostrarOperacion();
}

function calcular() {
    if (hayError || operador === null || valorAnterior === null) {
        return;
    }

    const segundoValor = parseFloat(valorActual);
    let resultado;

    if (operador === "/" && segundoValor === 0) {
        valorActual = "Error";
        operacion.textContent = "No se puede dividir entre cero";

        valorAnterior = null;
        operador = null;
        reiniciarPantalla = true;
        hayError = true;

        actualizarPantalla();
        return;
    }

    switch (operador) {
        case "+":
            resultado = valorAnterior + segundoValor;
            break;
        case "-":
            resultado = valorAnterior - segundoValor;
            break;
        case "*":
            resultado = valorAnterior * segundoValor;
            break;
        case "/":
            resultado = valorAnterior / segundoValor;
            break;
    }

    operacion.textContent =
        `${valorAnterior} ${operador === "*" ? "×" : operador === "/" ? "÷" : operador} ${segundoValor} =`;

    valorActual = String(resultado);
    valorAnterior = null;
    operador = null;
    reiniciarPantalla = true;

    actualizarPantalla();
}

document.getElementById("limpiar").addEventListener("click", () => {
    valorActual = "0";
    valorAnterior = null;
    operador = null;
    reiniciarPantalla = false;
    hayError = false;

    operacion.textContent = "";
    actualizarPantalla();
});

document.getElementById("borrar").addEventListener("click", () => {
    if (reiniciarPantalla) {
        valorActual = "0";
        reiniciarPantalla = false;
    } else {
        valorActual = valorActual.length > 1
            ? valorActual.slice(0, -1)
            : "0";
    }

    actualizarPantalla();
    mostrarOperacion();
});

document.querySelectorAll("[data-valor]").forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.dataset.valor;

        if (["+", "-", "*", "/"].includes(valor)) {
            seleccionarOperador(valor);
        } else if (/^[0-9]$/.test(valor)) {
            agregarNumero(valor);
        } else if (valor === ".") {
            agregarDecimal();
        }
    });
});

document.getElementById("calcular").addEventListener("click", calcular);

actualizarPantalla();

// Permitir utilizar la calculadora con el teclado
document.addEventListener("keydown", (event) => {
    const tecla = event.key;

    if (/^[0-9]$/.test(tecla)) {
        agregarNumero(tecla);
    } else if (["+", "-", "*", "/"].includes(tecla)) {
        seleccionarOperador(tecla);
    } else if (tecla === "Enter" || tecla === "=") {
        event.preventDefault();
        calcular();
    } else if (tecla === "Backspace") {
        event.preventDefault();
        document.getElementById("borrar").click();
    } else if (tecla === "Escape") {
        document.getElementById("limpiar").click();
    } else if (tecla === "." || tecla === ",") {
        agregarDecimal();
    }

});
