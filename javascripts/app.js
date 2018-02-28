// Rover Object Goes Here
// ======================
let rover = {
  direction: 'N',
  x: 0,
  y: 0,
  travelog: []
};

  //let comand = 'ffffffffffffffffffrfffffffffffff';

  (function start() {
    console.log("Ejemplo comando: ffrfflflbf")
    var comand = prompt('Introduzca un comando: ', '');
    if (comand === null) {
      console.log("Se ha cancelado la introducción de comandos");
    } else {
      if (validateComand(comand)) {
        console.log("Algún caracter del comando es erroneo");
      } else {
        insertComand(comand, rover);
      }
    }

    console.log(rover);
  })();

// ======================

function sumX(rover) {
  rover.x += 1;
}

function sumY(rover) {
  rover.y += 1;
}

function resY(rover) {
  rover.y -= 1;
}

function resY(rover) {
  rover.x -= 1;
}

function turnLeft(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = 'W'
      break;
    case "S":
      rover.direction = 'E'
      break;
    case "E":
      rover.direction = 'N'
      break;
    case "W":
      rover.direction = 'S'
      break;
  }

}

function turnRight(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = 'E';
      break;
    case "S":
      rover.direction = 'W';
      break;
    case "E":
      rover.direction = 'S';
      break;
    case "W":
      rover.direction = 'N';
      break;
  }
}

function moveForward(rover) {
  switch (rover.direction) {
    case "N":
      if (rover.y < 10) {
        sumY(rover);
      } else {
        console.log('Out of the grid');
      }
      break;
    case "S":
      if (rover.y > -10) {
        resY(rover);
      } else {
        console.log('Out of the grid');
      }
      break;
    case "E":
      if (rover.x < 10) {
        sumX(rover);
      } else {
        console.log('Out of the grid');
      }
      break;
    case "W":
      if (rover.x > -10) {
        resX(rover);
      } else {
        console.log('Out of the grid');
      }
      break;
  }
  rover.travelog.push([rover.x, rover.y]);
}

function moveBackward(rover) {
  switch (rover.direction) {
    case "N":
      if (rover.y > -10) {
        resY(rover);
      } else {
        console.log('Out of the grid');
      }
      break;
    case "S":
      if (rover.y < 10) {
        sumY(rover);
      } else {
        console.log('Out of the grid');
      }
      break;
    case "E":
      if (rover.x > -10) {
        resX(rover);
      } else {
        console.log('Out of the grid');
      }
      break;
    case "W":
      if (rover.x < 10) {
        sumX(rover);
      } else {
        console.log('Out of the grid');
      }
      break;
  }
  rover.travelog.push([rover.x, rover.y]);
}


function insertComand(comand, rover) {
  // tambien se puede hacer con spread operator 
  // let comandSplit = [...comand]
  let comandSplit = comand.toLowerCase().split('');
  comandSplit.forEach(element => {
    switch (element) {
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      case "f":
        moveForward(rover);
        break;
      case "b":
        moveBackward(rover);
        break;
    }
  });
}

function validateComand(comand) {
  let comandSplit = comand.toLowerCase().split('');
  return comandSplit.some(item => item !== 'r' && item !== 'l' && item !== 'f' && item !== 'b')
}
