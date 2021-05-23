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

  var TECLAS = {
    W: 87,
    S: 83,
    D: 68
  }

  function loop() {
    moveBackground();
    movePlayer();
  }

  $(document).keydown(function (e) {
    game.pressed[e.which] = true;
  });

  $(document).keyup(function (e) {
    game.pressed[e.which] = false;
  });

  function movePlayer() {
    if (game.pressed[TECLAS.W]) {
      var top = parseInt($("#player").css("top"));
      $("#player").css("top", top - 10);
    }

    if (game.pressed[TECLAS.S]) {
      var top = parseInt($("#player").css("top"));
      $("#player").css("top", top + 10);
    }

    if (game.pressed[TECLAS.D]) {
    }
  }

  function moveBackground() {
    left = parseInt($("#background-game").css("background-position"));
    $("#background-game").css("background-position", left - 1);
  }
}