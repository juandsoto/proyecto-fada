import { dinamico } from './algoritmos/dinamico';
import { voraz } from './algoritmos/voraz';

const { acumulado, respuesta } = dinamico;
console.log('-----> INFO ESTRATEGIA DINAMICA\n', acumulado);
console.log('-----> SOLUCION DINAMICA\n', respuesta);

const { solucion } = voraz;

console.log('-----> SOLUCION VORAZ\n', solucion);
