// Rover Object Goes Here
// ======================
let rover = {
  direction: 'N',
  x: 4,
  y: 4,
  travelog: []
};

//0 ----> Vacio / 1 ----> Obstáculo
var grind = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
[0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 1, 0, 0]];

function resetRobot(rover){
  rover.direction = 'N',
  rover.x = 4,
  rover.y = 4,
  rover.travelog = []
};

function resetHTML(){
  document.getElementById('x').innerHTML='-';
  document.getElementById('y').innerHTML='-';
  document.getElementById('dir').innerHTML='-';
  document.getElementById('log').innerHTML= '-';
  document.getElementById('out-grid').innerHTML='';
  document.getElementById('obbstacle').innerHTML='';
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

function actualizarDatosRobot(rover){
  document.getElementById('x').innerHTML=rover.x;
  document.getElementById('y').innerHTML=rover.y;
  document.getElementById('dir').innerHTML=rover.direction;
  document.getElementById('log').innerHTML='';
  rover.travelog.forEach(element => {
    document.getElementById('log').innerHTML= `${document.getElementById('log').innerHTML}  [${element}] `
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
    case 'N':
      rover.direction = 'W'
      break;
    case 'S':
      rover.direction = 'E'
      break;
    case 'E':
      rover.direction = 'N'
      break;
    case 'W':
      rover.direction = 'S'
      break;
  }
};

function turnRight(rover) {
  switch (rover.direction) {
    case 'N':
      rover.direction = 'E';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'E':
      rover.direction = 'S';
      break;
    case 'W':
      rover.direction = 'N';
      break;
  }
};

function moveForward(rover) {
  switch (rover.direction) {
    case 'N':
      if (rover.y > 0) {
        resY(rover);
      } else {
        console.log('Out of the grid (North)');
        outOfGrid('North');
      }
      break;
    case 'S':
      if (rover.y < 9) {
        sumY(rover);
      } else {
        console.log('Out of the grid (South)');
        outOfGrid('South');
      }
      break;
    case 'E':
      if (rover.x < 9) {
        sumX(rover);
      } else {
        console.log('Out of the grid (East)');
        outOfGrid('East');
      }
      break;
    case 'W':
      if (rover.x > 0) {
        resX(rover);
      } else {
        console.log('Out of the grid (West)');
        outOfGrid('West');
      }
      break;
  }
  rover.travelog.push([rover.x, rover.y]);

  checkObstacles(rover) ? checkObstaclesDo(rover) : '';

};

function moveBackward(rover) {
  switch (rover.direction) {
    case 'N':
      if (rover.y < 9) {
        sumY(rover);
      } else {
        console.log('Out of the grid (South)');
        outOfGrid('South');
      }
      break;
    case 'S':
      if (rover.y > 0) {
        resY(rover);
      } else {
        console.log('Out of the grid (North)');
        outOfGrid('North');
      }
      break;
    case 'E':
      if (rover.x > 0) {
        resX(rover);
      } else {
        console.log('Out of the grid (West)');
        outOfGrid('West');
      }
      break;
    case 'W':
      if (rover.x < 9) {
        sumX(rover);
      } else {
        console.log('Out of the grid (East)');
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
      case 'r':
        turnRight(rover);
        break;
      case 'l':
        turnLeft(rover);
        break;
      case 'f':
        moveForward(rover);
        break;
      case 'b':
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
  return grind[rover.y][rover.x] === 1 ? true : false
};

function checkObstaclesDo(rover) {
  rover.travelog.pop();
  if(rover.travelog.length){
    rover.x = rover.travelog[rover.travelog.length - 1][0];
    rover.y = rover.travelog[rover.travelog.length - 1][1];
  }
  console.log('Hay un obstáculo, si puede seguirá su camino');
  document.getElementById('obbstacle').innerHTML=`Hay un obstáculo, si puede seguirá su camino`
};

function outOfGrid(direction){
  document.getElementById('out-grid').innerHTML=`Out of the grid (${direction})`
};


