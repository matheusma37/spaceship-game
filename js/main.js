function start() {
  $("#start").hide();

  $("#background-game").append("<div id='player' class='animation_player'></div>");
  $("#background-game").append("<div id='enemy1' class='animation_enemy1'></div>");
  $("#background-game").append("<div id='enemy2'></div>");
  $("#background-game").append("<div id='friend' class='animation_friend'></div>");
  $("#background-game").append("<div id='score'></div>");
  $("#background-game").append("<div id='energy'></div>");

  var game = {
    pressed: {},
    timer: setInterval(loop, 30),
    points: 0,
    saved: 0,
    lost: 0,
    currentEnergy: 3
  }

  const KEYS = {
    W: 87,
    S: 83,
    D: 68
  }

  var speed = 5;
  var enemy1PositionY = parseInt(Math.random() * 334);
  var canShoot = true;
  var gameOver = false;

  var shootSound = document.getElementById("shoot-sound");
  var explosionSound = document.getElementById("explosion-sound");
  var music = document.getElementById("music");
  var gameOverSound = document.getElementById("game-over-sound");
  var lostSound = document.getElementById("lost-sound");
  var rescueSound = document.getElementById("rescue-sound");

  gameOverSound.pause();
  music.addEventListener("ended", () => { music.currentTime = 0; music.play(); }, false);
  music.play();

  function loop() {
    moveBackground();
    movePlayer();
    moveEnemy1();
    moveEnemy2();
    moveFriend();
    collision();
    score();
    energy();
  }

  $(document).keydown(function (e) {
    game.pressed[e.which] = true;
  });

  $(document).keyup(function (e) {
    game.pressed[e.which] = false;
  });

  function moveBackground() {
    left = parseInt($("#background-game").css("background-position"));
    $("#background-game").css("background-position", left - 1);
  }

  function movePlayer() {
    if (game.pressed[KEYS.W]) {
      var top = parseInt($("#player").css("top"));
      if (top >= 10) {
        $("#player").css("top", top - 10);
      }
    }

    if (game.pressed[KEYS.S]) {
      var top = parseInt($("#player").css("top"));
      if (top <= 444) {
        $("#player").css("top", top + 10);
      }
    }

    if (game.pressed[KEYS.D]) {
      shoot();
    }
  }

  function moveEnemy1() {
    positionX = parseInt($("#enemy1").css("left"));
    $("#enemy1").css("left", positionX - speed);
    $("#enemy1").css("top", enemy1PositionY);

    if (positionX <= -30) {
      enemy1PositionY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", enemy1PositionY);
    }
  }

  function moveEnemy2() {
    positionX = parseInt($("#enemy2").css("left"));
    $("#enemy2").css("left", positionX - 3);

    if (positionX <= 0) {
      $("#enemy2").css("left", 775);
    }
  }

  function moveFriend() {
    positionX = parseInt($("#friend").css("left"));
    $("#friend").css("left", positionX + 1);

    if (positionX > 906) {
      $("#friend").css("left", 0);
    }
  }

  function shoot() {
    if (canShoot) {
      shootSound.play();
      canShoot = false;
      let top = parseInt($("#player").css("top"));
      let positionX = parseInt($("#player").css("left"))
      let shootX = positionX + 190;
      let topShoot = top + 37;
      $("#background-game").append("<div id='shoot'></div>");
      $("#shoot").css("top", topShoot);
      $("#shoot").css("left", shootX);
      var shootTime = window.setInterval(makeShoot, 30);
    }

    function makeShoot() {
      positionX = parseInt($("#shoot").css("left"));
      $("#shoot").css("left", positionX + 15);

      if (positionX > 900) {
        window.clearInterval(shootTime);
        shootTime = null;
        $("#shoot").remove();
        canShoot = true;
      }
    }
  }

  function collision() {
    var collision1 = ($("#player").collision($("#enemy1")));
    var collision2 = ($("#player").collision($("#enemy2")));
    var collision3 = ($("#shoot").collision($("#enemy1")));
    var collision4 = ($("#shoot").collision($("#enemy2")));
    var collision5 = ($("#player").collision($("#friend")));
    var collision6 = ($("#enemy2").collision($("#friend")));

    if (collision1.length > 0) {
      game.currentEnergy--;
      let enemy1X = parseInt($("#enemy1").css("left"));
      let enemy1Y = parseInt($("#enemy1").css("top"));
      explosion1(enemy1X, enemy1Y);

      positionY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", positionY);
    }

    if (collision2.length > 0) {
      game.currentEnergy--;
      let enemy2X = parseInt($("#enemy2").css("left"));
      let enemy2Y = parseInt($("#enemy2").css("top"));
      explosion2(enemy2X, enemy2Y);
      $("#enemy2").remove();
      replaceEnemy2();
    }

    if (collision3.length > 0) {
      speed += 0.3;
      game.points += 100;

      let enemy1X = parseInt($("#enemy1").css("left"));
      let enemy1Y = parseInt($("#enemy1").css("top"));

      explosion1(enemy1X, enemy1Y);
      $("#shoot").css("left", 950);

      positionY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", positionY);
    }

    if (collision4.length > 0) {
      game.points += 50;

      let enemy2X = parseInt($("#enemy2").css("left"));
      let enemy2Y = parseInt($("#enemy2").css("top"));
      $("#enemy2").remove();

      explosion2(enemy2X, enemy2Y);
      $("#shoot").css("left", 950);
      replaceEnemy2();
    }

    if (collision5.length > 0) {
      rescueSound.play();
      game.saved++;
      replaceFriend();
      $("#friend").remove();
    }

    if (collision6.length > 0) {
      lostSound.play();
      game.lost++;

      friendX = parseInt($("#friend").css("left"));
      friendY = parseInt($("#friend").css("top"));
      explosion3(friendX, friendY);

      $("#friend").remove();
      replaceFriend();
    }
  }

  function explosion1(enemy1X, enemy1Y) {
    explosionSound.play();
    $("#background-game").append("<div id='explosion1'></div");
    $("#explosion1").css("background-image", "url(images/explosion.png)");
    var div = $("#explosion1");
    div.css("top", enemy1Y);
    div.css("left", enemy1X);
    div.animate({ width: 200, opacity: 0 }, "slow");

    var timeExplosion = window.setInterval(removeExplosion, 1000);

    function removeExplosion() {
      div.remove();
      window.clearInterval(timeExplosion);
      timeExplosion = null;
    }
  }

  function explosion2(enemy2X, enemy2Y) {
    explosionSound.play();
    $("#background-game").append("<div id='explosion2'></div");
    $("#explosion2").css("background-image", "url(images/explosion.png)");
    var div2 = $("#explosion2");
    div2.css("top", enemy2Y);
    div2.css("left", enemy2X);
    div2.animate({ width: 200, opacity: 0 }, "slow");

    var timeExplosion2 = window.setInterval(removeExplosion2, 1000);

    function removeExplosion2() {
      div2.remove();
      window.clearInterval(timeExplosion2);
      timeExplosion2 = null;
    }
  }

  function explosion3(friendX, friendY) {
    $("#background-game").append("<div id='explosion3' class='animation_friend_death'></div");
    $("#explosion3").css("top", friendY);
    $("#explosion3").css("left", friendX);

    var timeExplosion3 = window.setInterval(resetExplosion3, 1000);
    function resetExplosion3() {
      $("#explosion3").remove();
      window.clearInterval(timeExplosion3);
      timeExplosion3 = null;
    }
  }

  function replaceEnemy2() {
    var timeCollision4 = window.setInterval(replace4, 5000);

    function replace4() {
      window.clearInterval(timeCollision4);
      timeCollision4 = null;
      if (!gameOver) {
        $("#background-game").append("<div id=enemy2></div");
      }
    }
  }

  function replaceFriend() {
    var timeFriend = window.setInterval(replace6, 6000);

    function replace6() {
      window.clearInterval(timeFriend);
      timeFriend = null;
      if (!gameOver) {
        $("#background-game").append("<div id='friend' class='animation_friend'></div>");
      }
    }
  }

  function score() {
    $("#score").html("<h2> Pontos: " + game.points + " Salvos: " + game.saved + " Perdidos: " + game.lost + "</h2>");
  }

  function energy() {
    if (game.currentEnergy == 3) {
      $("#energy").css("background-image", "url(images/energy3.png)");
    }

    if (game.currentEnergy == 2) {
      $("#energy").css("background-image", "url(images/energy2.png)");
    }

    if (game.currentEnergy == 1) {
      $("#energy").css("background-image", "url(images/energy1.png)");
    }

    if (game.currentEnergy == 0) {
      $("#energy").css("background-image", "url(images/energy0.png)");
      endGame();
    }
  }

  function endGame() {
    gameOver = true;
    music.pause();
    gameOverSound.play();

    window.clearInterval(game.timer);
    game.timer = null;

    $("#player").remove();
    $("#enemy1").remove();
    $("#enemy2").remove();
    $("#friend").remove();

    $("#background-game").append("<div id='end-game'></div>");

    $("#end-game").html("<h1> Game Over </h1><p>Sua pontuação foi: " + game.points + "</p>"
      + "<div id='restart' onclick='restartGame()'><h3>Jogar Novamente</h3></div>");
  }
}

function restartGame() {
  $("#end-game").remove();
  start();
}