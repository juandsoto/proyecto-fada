import info from '../data/read';
import { Referencia, Respuesta } from '../interfaces/interfaces';

interface Relacion {
  beneficioRel: number;
  cantidadEquipos: number;
  pais: number;
}

let { matriz, cantidadEquipos, cantidadPaises } = info;

let equiposRestantes = cantidadEquipos;

let relacion: Relacion[] = [];
let respuesta: Respuesta = {
  beneficioMaximo: 0,
  asignacion: []
};

// ORDENAMIENTO
for (let pais = 0; pais < cantidadPaises; pais++) {
  let paisRel: number[] = matriz[pais].map((beneficio, index) => (index !== 0 ? Number((beneficio / index).toFixed(2)) : 0));
  let maximo: number = Math.max(...paisRel);
  relacion.push({
    beneficioRel: maximo,
    cantidadEquipos: paisRel.indexOf(maximo),
    pais
  });
}

relacion.sort((a, b) => b.beneficioRel - a.beneficioRel);

// CONSTRUCCION DE LA SOLUCION

for (let { cantidadEquipos, pais } of relacion) {
  if (equiposRestantes >= cantidadEquipos) {
    respuesta.beneficioMaximo += matriz[pais][cantidadEquipos];
    respuesta.asignacion[pais] = cantidadEquipos;
    equiposRestantes -= cantidadEquipos;
  } else {
    respuesta.beneficioMaximo += matriz[pais][equiposRestantes];
    respuesta.asignacion[pais] = equiposRestantes;
    equiposRestantes = 0;
  }
}

respuesta.asignacion.reverse();

export const voraz = {
  solucion: respuesta
};
