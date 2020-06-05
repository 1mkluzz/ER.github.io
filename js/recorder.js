'use strict'

let log = console.log.bind(console),
  id = val => document.getElementById(val),
  ul = id('ul'),
  gUMbtn = id('gUMbtn'),
  start = id('start'),
  stop = id('stop'),
  stream,
  recorder,
  counter=1,
  chunks,
  media;


gUMbtn.onclick = e => {
  let mv = id('mediaVideo'),
      mediaOptions = {
        video: {
          tag: 'video',
          type: 'video/webm',
          ext: '.mp4',
          gUM: {video: true, audio: true}
        },
        audio: {
          tag: 'audio',
          type: 'audio/ogg',
          ext: '.ogg',
          gUM: {audio: true}
        }
      };
  media = mv.checked ? mediaOptions.video : mediaOptions.audio;
  navigator.mediaDevices.getUserMedia(media.gUM).then(_stream => {
    stream = _stream;
    id('gUMArea').style.display = 'none';
    id('btns').style.display = 'inherit';
    start.removeAttribute('disabled');
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
      chunks.push(e.data);
      if(recorder.state == 'inactive')  makeLink();
    };
    log('got media successfully');
  }).catch(log);
}

start.onclick = e => {
  start.disabled = true;
  stop.removeAttribute('disabled');
  chunks=[];
  recorder.start();
}


stop.onclick = e => {
  stop.disabled = true;
  recorder.stop();
  start.removeAttribute('disabled');
}



function makeLink(){
  let blob = new Blob(chunks, {type: media.type })
    , url = URL.createObjectURL(blob)
    , li = document.createElement('li')
    , mt = document.createElement(media.tag)
    , hf = document.createElement('a')
  ;
  var text = document.getElementById("result_final").innerHTML,
      blob2 = new Blob([text], { type: 'text/plain' }),
      anchor = document.createElement('a'),
      li2 = document.createElement('li'),
      hf2 = document.createElement('a')
      ;

  anchor.href = (window.webkitURL || window.URL).createObjectURL(blob2);
  anchor.download = `download ${counter} .txt`;
  anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
  //anchor.click();

  // ficheiro audio e botoes audio box
  mt.controls = true;
  mt.src = url;
  hf.href = url;
  hf.download = `download_${counter}${media.ext}`;
  hf.innerHTML = `</br>download_${counter}${media.ext}`;
  li.appendChild(mt);
  li.appendChild(hf);
  ul.appendChild(li);


  // ficheiro texto
  hf2.href = (window.webkitURL || window.URL).createObjectURL(blob2);
  hf2.download = `download_${counter}.txt`;
  hf2.innerHTML = `download_${counter++}.txt`;
  li2.appendChild(hf2);
  ul.appendChild(li2);
}