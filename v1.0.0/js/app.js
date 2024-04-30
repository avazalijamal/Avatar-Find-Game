const personaj = [];
const count = 9;
var checked = [];
var _open = [];
var close = [];
var can = 3;
var zaman = 10;
var xal = 0;
var interval;
var izin;

window.addEventListener("load", function () {
  const heart = document.querySelector("#heart");
  const timer = document.querySelector("#timer");
  const score = document.querySelector("#score");
  const game = document.querySelectorAll("#game div");
  const control = document.querySelector("#control");
  const end = document.querySelector("#end");

  heart.innerText = can;
  timer.innerText = zaman;
  score.innerText = xal;

  for (let i = 0; i < game.length; i++) {
    personaj.push(Random(1, count));
    game[i].innerHTML = `<img src="./img/personaj/${personaj[i]}.png">`;
  }

  interval = setInterval(function () {
    if (zaman > 0) {
      zaman--;
      timer.innerText = zaman;
    } else {
      clearInterval(interval);
      for (let i = 0; i < game.length; i++)
        game[i].style.transform =
          "rotateY(720deg) rotateX(720deg) rotateZ(720deg)";

      setTimeout(function () {
        for (let i = 0; i < game.length; i++) game[i].innerHTML = "";

        zaman = 59;
        timer.innerText = zaman;

        interval=setInterval(function(){

          if(zaman>0){
            zaman--;
            timer.innerText=zaman;
          }else{
            clearInterval(interval);

            do{
              izin=confirm("Size verilen zamani bitirdiniz. Yeniden baslayaqmi?");
            }while(!izin);
            open("index.html","_parent");

          }

        },1000);

        Start();
      }, 1000);
    }
  }, 1000);

  function Start() {
    for (let i = 0; i < game.length; i++) {
      game[i].addEventListener("click", function () {
        if (checked.indexOf(i) == -1) {
          game[i].style.backgroundImage = "url(../img/assets/check.png)";
          checked.push(i);
        }
      });
    }
  }

  control.addEventListener("click", function () {
    if (checked.length > 1) {
      let controlStatus = true;
      let _xal = 0;

      for (let i = 0; i < checked.length - 1; i++) {
        let a = checked[i];
        let b = checked[i + 1];

        game[a].innerHTML = `<img src="./img/personaj/${personaj[a]}.png">`;
        game[b].innerHTML = `<img src="./img/personaj/${personaj[b]}.png">`;

        if (personaj[a] === personaj[b]) {
          _xal += personaj[a] + personaj[b];
        } else {
          _xal = 0;
          controlStatus = false;
        }
      }

      if (controlStatus) {
        xal += _xal;
        score.innerText = xal;
        for (let i = 0; i < checked.length; i++) _open.push(checked[i]);
        checked = [];
      } else {
        can--;
        heart.innerText=can;

        if(!can){
          do{
            izin=confirm("butun canlariniz bitdi yeniden baslasinmi?");
          }while(!izin);
          open("index.html",'_parent');
        }

        setTimeout(function () {
          for (let i = 0; i < checked.length; i++) {
            let a = checked[i];
            game[a].innerHTML = "";
            game[a].style.backgroundImage = "url(../img/assets/back.png)";
          }
          checked = [];
        }, 3000);
      }
    }
  });

  end.addEventListener("click", function () {
    for (let i = 0; i < personaj.length; i++)
      if (_open.indexOf(i) == -1) close.push(i);

    let endStatus = true;
    let _endXal = 0;

    for (let i = 0; i < close.length - 1; i++) {
      let a = close[i];
      let b = close[i + 1];

      game[a].innerHTML = `<img src="./img/personaj/${personaj[a]}.png">`;
      game[b].innerHTML = `<img src="./img/personaj/${personaj[b]}.png">`;

      _endXal += personaj[a] + personaj[b];
    }

    for (let i = 0; i < close.length; i++) {
      let a = close[i];
      for (let j = i + 1; j < close.length; j++) {
        let b = close[j];
        if (personaj[a] === personaj[b]) {
          endStatus = false;
          break;
        }
      }
    }

    if (endStatus) xal += _endXal;
    else xal -= _endXal;

    score.innerText = xal;
  });

  function Random(s, e) {
    return Math.floor(s + Math.random() * (e - s));
  }
});
