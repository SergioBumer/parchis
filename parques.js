function throwDices() {
  var dice1 = Math.ceil(Math.random() * 6);
  var dice2 = Math.ceil(Math.random() * 6);

  return [dice1, dice2, dice1 === dice2];
}
function createPlayers() {
  var players = [];
  for (var i = 0; i < 6; i++) {
    players.push({
      id: i + 1,
      tokensInJail: createTokens(i),
      tokensInBoard: [],
      tokensFree: [],
      startPosition: 5 + 17 * i,
    });
  }
  return players;
}

var colors = ["Blue", "Red", "Yellow", "Black", "Green", "White"];

function createTokens(playerIndex) {
  var tokens = [];
  for (var i = 0; i < 4; i++) {
    tokens.push({
      id: (playerIndex + 1).toString() + i.toString(),
      color: colors[playerIndex],
    });
  }
  return tokens;
}

function calculatePitches(player) {
  if (player?.tokensInBoard === 0) {
    return 3;
  }
  return 1;
}

function changePlayer(playerIndex, jugadores) {
  if (playerIndex === jugadores.length - 1) {
    return 0;
  }
  return playerIndex + 1;
}

function pairHandler(players, playerIndex, result) {
  var normalPair = [2, 3, 4, 5];
  if (
    !normalPair.includes(result[0]) ||
    players[playerIndex].tokensInJail.length <= 2
  ) {
    players[playerIndex].tokensInJail.forEach((element) => {
      players[playerIndex].tokensInBoard.push(element);
    });
    players[playerIndex].tokensInJail = [];
  } else {
    for (let i = 0; i < 2; i++) {
      players[playerIndex].tokensInBoard.push(
        players[playerIndex].tokensInJail.pop()
      );
    }
  }
}

var dado1 = 1;
var dado2 = 1;
var gameOver = true;

var playerIndex = 0;
var totalLanzamientos = 0;
var players = createPlayers();
// Prueba de juegos hasta consegui
/* var testGamesInMaxThrows = true;
var expectedThrows = 4;
var testExpectedGames = 0;
while (testGamesInMaxThrows) { */
while (gameOver) {
  var turnos = calculatePitches(players[playerIndex]);
  /* console.log(
      `El jugador ${players[playerIndex].id} tiene ${turnos} turnos.`
    ); */
  while (turnos > 0) {
    var resultado = throwDices();
    console.log(resultado);
    totalLanzamientos++;
    if (resultado[2]) {
      /* console.log(
        `El jugador ${players[playerIndex].id} saca la ficha ${
          players[playerIndex].tokensInJail[
            players[playerIndex].tokensInJail.length - 1
          ].id
        }`
      ); */
      players[playerIndex].tokensInBoard.push(
        players[playerIndex].tokensInJail.pop()
      );
      /* console.log(
          `El jugador ${players[playerIndex].id} tiene ${
            players[playerIndex].tokensInJail.length
          } ${
            players[playerIndex].tokensInJail.length === 1 ? "ficha" : "fichas"
          } en la carcel`
        ); */
      if (players[playerIndex].tokensInJail.length === 0) {
        console.log(`El jugador ${players[playerIndex].id} gana la partida!!!`);
        console.log(
          `El jugador inicia la partida en ${players[playerIndex].startPosition} !!!`
        );
        console.log(totalLanzamientos);
        gameOver = false;
        /* if (totalLanzamientos === expectedThrows) {
            testGamesInMaxThrows = false;
          }
          testExpectedGames++;
          gameOver = false;
          turnos = 0; */
      }
    } else {
      turnos--;
    }
  }

  playerIndex = changePlayer(playerIndex, players);
}

/*   restartGame();
} */

//console.log(`Number of games at test Achieved: ${testExpectedGames}`);

function restartGame() {
  playerIndex = 0;
  players = createPlayers();
  totalLanzamientos = 0;
  gameOver = true;
}
