function start() {
  $("#start").hide();

  $("#background-game").append("<div id='player' class='animation_player'></div>");
  $("#background-game").append("<div id='enemy1' class='animation_enemy1'></div>");
  $("#background-game").append("<div id='enemy2'></div>");
  $("#background-game").append("<div id='friend' class='animation_friend'></div>");

  var jogo = {}

  jogo.timer = setInterval(loop, 30);

  function loop() { moveBackground(); }

  function moveBackground() {
    left = parseInt($("#background-game").css("background-position"));
    $("#background-game").css("background-position", left - 1);
  }
}