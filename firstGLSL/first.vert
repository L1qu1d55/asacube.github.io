// attribure 頂点ごとに異なるデータを受け取る
// uniform 全ての頂点に対して一律に処理される情報
// varying 頂点シェーダとフラグメントシェーダの橋渡し
attribute vec3 position;

void main(void) {
  gl_Position = vec4(position, 1.0);
}