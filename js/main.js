function start() {
  $("#start").hide();

  $("#background-game").append("<div id='player' class='animation_player'></div>");
  $("#background-game").append("<div id='enemy1' class='animation_enemy1'></div>");
  $("#background-game").append("<div id='enemy2'></div>");
  $("#background-game").append("<div id='friend' class='animation_friend'></div>");

  var game = {
    pressed: {},
    timer: setInterval(loop, 30)
  }

  const KEYS = {
    W: 87,
    S: 83,
    D: 68
  }

  const SPEED = 5;
  var enemy1PositionY = parseInt(Math.random() * 334);

  function loop() {
    moveBackground();
    movePlayer();
    moveEnemy1();
  }

  $(document).keydown(function (e) {
    game.pressed[e.which] = true;
  });

  $(document).keyup(function (e) {
    game.pressed[e.which] = false;
  });

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
    }
  }

  function moveEnemy1() {
    positionX = parseInt($("#enemy1").css("left"));
    $("#enemy1").css("left", positionX - SPEED);
    $("#enemy1").css("top", enemy1PositionY);

    if (positionX <= -30) {
      enemy1PositionY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", enemy1PositionY);
    }
  }

  function moveBackground() {
    left = parseInt($("#background-game").css("background-position"));
    $("#background-game").css("background-position", left - 1);
  }
}