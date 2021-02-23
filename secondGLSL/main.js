import {loadFile} from "./loadFile.js";
import {createShader, createProgram, renderingBoard} from "./preRender.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  let mouseX = canvas.width / 2.0, mouseY = canvas.height / 2.0;

  window.addEventListener("resize", () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  })

  canvas.addEventListener("mousemove", (e) => {
    mouseX = e.offsetX;
    mouseY = canvas.height - e.offsetY;
  });

  const gl = canvas.getContext("webgl");

  const program = createProgram(gl, createShader(gl, "vert", loadFile("./second.vert")), createShader(gl, "frag", loadFile("./second.frag")));

  renderingBoard(gl, program);

  const uniLocation = {};
  uniLocation.time = gl.getUniformLocation(program, "time");
  uniLocation.mouse = gl.getUniformLocation(program, "mouse");
  uniLocation.resolution = gl.getUniformLocation(program, "resolution");
  
  let startTime = new Date().getTime();

  let frameCount = 0;
	const render = () => {   
    frameCount++;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const currentTime = (new Date().getTime() - startTime) * 0.001;
    console.log((1 / currentTime) * frameCount + " fps");

    gl.uniform1f(uniLocation.time, currentTime);
    gl.uniform2fv(uniLocation.mouse, [mouseX, mouseY]);
    gl.uniform2fv(uniLocation.resolution, [canvas.width, canvas.height]);

		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    gl.flush();
    
    requestAnimationFrame(render);
	}

  render();
});