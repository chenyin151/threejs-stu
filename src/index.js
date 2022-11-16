import { Hello } from './hello'
import { Vector2 } from './lib/three/src/math/Vector2.js';
document.querySelector('#root').appendChild(Hello());
var vec2 = new Vector2()
// vec2.subVectors( new Vector2(4,2), new Vector2(1,1))
// vec2.multiply(new Vector2(2,3))
vec2.set(4,4);
vec2.clampScalar(2,3)
debugger