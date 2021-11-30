import * as fs from 'fs';
import * as path from 'path';

let matriz = [];

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

const matrizArr = input.split('@');
const cantidadPaises: number = matrizArr.length;
const cantidadEquipos: number = matrizArr[0].split(' ').length - 1;

function parseMatriz() {
  for (let i = cantidadPaises - 1; i >= 0; i--) {
    matriz.push(matrizArr[i].split(' ').map(s => Number(s)));
  }

  return { matriz, cantidadEquipos, cantidadPaises };
}

export default parseMatriz();
