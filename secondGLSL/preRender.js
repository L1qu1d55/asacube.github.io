import {createVBO, createIBO} from "./bufferObject.js";

export const createShader = (gl, type, shaderText) => {
  let shader;
  
  switch(type) {
    case 'vert':
      shader = gl.createShader(gl.VERTEX_SHADER);
      break;
    case 'frag':
      shader = gl.createShader(gl.FRAGMENT_SHADER);
      break;
    default :
      return;
  }
  
  gl.shaderSource(shader, shaderText);
  gl.compileShader(shader);
  
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  } else {
    console.log(gl.getShaderInfoLog(shader));
  }
}

export const createProgram = (gl, vs, fs) => {
  const program = gl.createProgram();
  
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
        
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.useProgram(program);
    return program;
  } else {
    console.log(gl.getProgramInfoLog(program));
  }
}

export const renderingBoard = (gl, program) => {
  const position = [
    -1.0,  1.0,  0.0,
     1.0,  1.0,  0.0,
    -1.0, -1.0,  0.0,
     1.0, -1.0,  0.0
  ];
  const index = [
    0, 2, 1,
    1, 2, 3
  ];
  const vertexVBO = createVBO(gl, position);
  const attLocation = gl.getAttribLocation(program, "position");
  const attStride = 3;
  const indexIBO = createIBO(gl, index);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexVBO);
  gl.enableVertexAttribArray(attLocation);
  gl.vertexAttribPointer(attLocation, attStride, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexIBO);
}