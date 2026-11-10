
let valorActual = "0";
let valorAnterior = null;
let operador = null;
let reiniciarPantalla = false;

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
    if (reiniciarPantalla) {
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
    if (operador === null || valorAnterior === null) {
        return;
    }

    const segundoValor = parseFloat(valorActual);
    let resultado;

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
        }
    });
});

document.getElementById("calcular").addEventListener("click", calcular);

actualizarPantalla();
