import info from '../data/read';
import { Referencia, Respuesta } from '../interfaces/interfaces';

let { matriz, cantidadEquipos, cantidadPaises } = info;
let acumulado: Referencia[] = [
  {
    beneficio: matriz[0],
    decision: matriz[0].map((_, index) => index)
  }
];
let maximos: Referencia = { beneficio: [0], decision: [0] };
let fila: number[] = [];
let resultado: number = 0;
let respuesta: Respuesta = {
  beneficioMaximo: 0,
  asignacion: []
};

function main() {
  //por cada pais
  for (let pais = 1; pais <= cantidadPaises - 2; pais++) {
    //por los equipos disponibles
    for (let disponibles = 1; disponibles <= cantidadEquipos; disponibles++) {
      fila.push(acumulado[0].beneficio[disponibles]);
      //por los equipos asignados al pais actual
      for (let indicePais = 1; indicePais <= disponibles; indicePais++) {
        let actual: number = matriz[pais][indicePais];
        let complemento: number = disponibles - indicePais;
        resultado = actual + acumulado[0].beneficio[complemento];
        fila.push(resultado);
      }
      // beneficio del pais con cada cantidad de equipos
      agregarMaximo();
    }
    acumulado.unshift(maximos);
    maximos = { beneficio: [0], decision: [0] };
  }

  maximos = { beneficio: [], decision: [] };
  const ultimoPais = matriz.at(-1);
  for (let i = 0; i < ultimoPais.length; i++) {
    let actual: number = ultimoPais[i];
    let complemento: number = cantidadEquipos - i;
    resultado = actual + acumulado[0].beneficio[complemento];
    fila.push(resultado);
  }
  agregarMaximo();
  acumulado.unshift(maximos);
  maximos = { beneficio: [], decision: [] };

  construirRespuesta();
}

function agregarMaximo(): void {
  let maximo = Math.max(...fila.slice());
  maximos.beneficio.push(maximo);
  maximos.decision.push(fila.indexOf(maximo));
  fila = [];
}

function construirRespuesta(): void {
  respuesta.beneficioMaximo = acumulado[0].beneficio[0];
  respuesta.asignacion.push(acumulado[0].decision[0]);
  let indice: number = cantidadEquipos - acumulado[0].decision[0];
  acumulado.forEach(item => {
    item.decision.forEach((decision, i) => {
      if (indice === i) {
        respuesta.asignacion.push(decision);
        indice -= decision;
      }
    });
  });
}

main();

export const dinamico = {
  acumulado,
  respuesta
};
