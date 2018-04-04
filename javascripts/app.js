
// Rover Object Goes Here
// ======================
let rover = {
  direction: 'N',
  x: 4,
  y: 4,
  travelog: []
};

const DIRECTIONS = {
  North: 'N',
  South: 'S',
  East: 'E',
  West: 'W'
};

const COMANDS = {
  Left: 'l',
  Right: 'r',
  Forward: 'f',
  Backward: 'b'
}

//0 ----> Vacio / 1 ----> Obstáculo
let grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
];

function resetRobot(rover) {
  rover.direction = 'N',
    rover.x = 4,
    rover.y = 4,
    rover.travelog = []
};

function resetHTML() {
  document.getElementById('x').innerHTML = '-';
  document.getElementById('y').innerHTML = '-';
  document.getElementById('dir').innerHTML = '-';
  document.getElementById('log').innerHTML = '-';
  document.getElementById('out-grid').innerHTML = '';
  document.getElementById('obbstacle').innerHTML = '';
}

function start() {
  resetRobot(rover);
  resetHTML();
  console.log('Ejemplo comando: ffrfflflbf');
  var comand = document.getElementById('comand').value;

  if (validateComand(comand)) {
    console.log('Algún caracter del comando es erroneo');
    alert("Algún caracter del comando es erroneo");
  } else {
    insertComand(comand, rover);
  }

  actualizarDatosRobot(rover);
  console.log(rover);
};

function actualizarDatosRobot(rover) {
  document.getElementById('x').innerHTML = rover.x;
  document.getElementById('y').innerHTML = rover.y;
  document.getElementById('dir').innerHTML = rover.direction;
  document.getElementById('log').innerHTML = '';
  rover.travelog.forEach(element => {
    document.getElementById('log').innerHTML = `${document.getElementById('log').innerHTML}  [${element}] `
  });
};

function sumX(rover) {
  rover.x += 1;
};

function sumY(rover) {
  rover.y += 1;
};

function resY(rover) {
  rover.y -= 1;
};

function resX(rover) {
  rover.x -= 1;
};

function turnLeft(rover) {
  switch (rover.direction) {
    case DIRECTIONS.North:
      rover.direction = DIRECTIONS.West
      break;
    case DIRECTIONS.South:
      rover.direction = DIRECTIONS.East
      break;
    case DIRECTIONS.East:
      rover.direction = DIRECTIONS.North
      break;
    case DIRECTIONS.West:
      rover.direction = DIRECTIONS.South
      break;
  }
};

function turnRight(rover) {
  switch (rover.direction) {
    case DIRECTIONS.North:
      rover.direction = DIRECTIONS.East;
      break;
    case DIRECTIONS.South:
      rover.direction = DIRECTIONS.West;
      break;
    case DIRECTIONS.East:
      rover.direction = DIRECTIONS.South;
      break;
    case DIRECTIONS.West:
      rover.direction = DIRECTIONS.North;
      break;
  }
};

function moveForward(rover) {
  switch (rover.direction) {
    case DIRECTIONS.North:
      if (rover.y > 0) {
        resY(rover);
      } else {
        outOfGrid('North');
      }
      break;
    case DIRECTIONS.South:
      if (rover.y < 9) {
        sumY(rover);
      } else {
        outOfGrid('South');
      }
      break;
    case DIRECTIONS.East:
      if (rover.x < 9) {
        sumX(rover);
      } else {
        outOfGrid('East');
      }
      break;
    case DIRECTIONS.West:
      if (rover.x > 0) {
        resX(rover);
      } else {
        outOfGrid('West');
      }
      break;
  }
  rover.travelog.push([rover.x, rover.y]);

  checkObstacles(rover) ? checkObstaclesDo(rover) : '';

};

function moveBackward(rover) {
  switch (rover.direction) {
    case DIRECTIONS.North:
      if (rover.y < 9) {
        sumY(rover);
      } else {
        outOfGrid('South');
      }
      break;
    case DIRECTIONS.South:
      if (rover.y > 0) {
        resY(rover);
      } else {
        outOfGrid('North');
      }
      break;
    case DIRECTIONS.East:
      if (rover.x > 0) {
        resX(rover);
      } else {
        outOfGrid('West');
      }
      break;
    case DIRECTIONS.West:
      if (rover.x < 9) {
        sumX(rover);
      } else {
        outOfGrid('East');
      }
      break;
  }
  rover.travelog.push([rover.x, rover.y]);

  checkObstacles(rover) ? checkObstaclesDo(rover) : '';

};


function insertComand(comand, rover) {
  // tambien se puede hacer con spread operator 
  // let comandSplit = [...comand]
  let comandSplit = comand.toLowerCase().split('');
  comandSplit.forEach(element => {
    switch (element) {
      case COMANDS.Right:
        turnRight(rover);
        break;
      case COMANDS.Left:
        turnLeft(rover);
        break;
      case COMANDS.Forward:
        moveForward(rover);
        break;
      case COMANDS.Backward:
        moveBackward(rover);
        break;
    }
  });
};

function validateComand(comand) {
  let comandSplit = comand.toLowerCase().split('');
  return comandSplit.some(item => item !== 'r' && item !== 'l' && item !== 'f' && item !== 'b');
};

function checkObstacles(rover) {
  return grid[rover.y][rover.x] === 1 ? true : false
};

function checkObstaclesDo(rover) {
  rover.travelog.pop();
  if (rover.travelog.length) {
    rover.x = rover.travelog[rover.travelog.length - 1][0];
    rover.y = rover.travelog[rover.travelog.length - 1][1];
  }
  console.log('Hay un obstáculo, si puede seguirá su camino');
  document.getElementById('obbstacle').innerHTML = `Hay un obstáculo, si puede seguirá su camino`
};

function outOfGrid(direction) {
  console.log(`Out of the grid (${direction})`);
  document.getElementById('out-grid').innerHTML = `Out of the grid (${direction})`
};


