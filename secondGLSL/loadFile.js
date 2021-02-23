export const loadFile = (url) => {
  let text;
  let request = new XMLHttpRequest();
  request.open('GET', url, false);

  request.onreadystatechange = () => {
    if (request.readyState == 4) {
      if (request.status == 200) {
        console.log(request.responseText);
        text = request.responseText;
      } else {
        alert('読み込めてません "' + url + '"')
      }
    }
  };

  request.send(null);
  return text;
}