// Rover Object Goes Here
// ======================
let rover={
  direction:'N',
  x: 0,
  y: 0,
  travelog:[]
};

let comand = 'ffffffffffffffffffrfffffffffffff';

(function start(){
  insertComand(comand,rover);
  console.log(rover);
})();

// ======================
function turnLeft(rover){
  switch(rover.direction){
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

function turnRight(rover){
  switch(rover.direction){
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

function moveForward(rover){
  switch(rover.direction){
    case "N":
      if(rover.y < 10){
        rover.y += 1; 
      }else{
        console.log('Out of the grid');
      }
      break;
    case "S":
      if(rover.y > -10){
        rover.y -= 1;
      }else{
        console.log('Out of the grid');
      }
      break;
    case "E":
      if(rover.x < 10){
        rover.x += 1; 
      }else{
        console.log('Out of the grid');
      }
      break;
    case "W":
      if(rover.x > -10){
        rover.x -= 1; 
      }else{
        console.log('Out of the grid');
      } 
      break;
  }
  rover.travelog.push([rover.x,rover.y]);
}


function insertComand(comand,rover){
  // tambien se puede hacer con spread operator 
  // let comandos = [...comand]
  let comandos = comand.split('');
  comandos.forEach(element => {
    switch(element){
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      case "f":
        moveForward(rover);
        break;
    }
  });
}

