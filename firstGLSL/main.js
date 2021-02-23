import {loadFile} from "./loadFile.js";
import {createShader, createProgram, renderingBoard} from "./preRender.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const gl = canvas.getContext("webgl");

  const program = createProgram(gl, createShader(gl, "vert", loadFile("./first.vert")), createShader(gl, "frag", loadFile("./first.frag")));

  renderingBoard(gl, program);

  const uniLocation = gl.getUniformLocation(program, "resolution");

	const render = () => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform2fv(uniLocation, [canvas.width, canvas.height]);

		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    gl.flush();
    
    requestAnimationFrame(render);
	}

  render();
});