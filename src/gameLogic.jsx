export const loadGame = () => {
  let grid = [
    { x: 0, y: 0, isSnake: true, isFood: false, part: 2 },
    { x: 1, y: 0, isSnake: true, isFood: false, part: 1 },
    { x: 2, y: 0, isSnake: false, isFood: false },
    { x: 0, y: 1, isSnake: false, isFood: false },
    { x: 1, y: 1, isSnake: false, isFood: false },
    { x: 2, y: 1, isSnake: false, isFood: false },
    { x: 0, y: 2, isSnake: false, isFood: false },
    { x: 1, y: 2, isSnake: false, isFood: false },
    { x: 2, y: 2, isSnake: false, isFood: false },
  ];

  let upadatedGrid = insertFood(grid);
  return upadatedGrid;
};
export const insertFood = (grid) => {
  const generateRandomFoodLocation = () => {
    // random
    const getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    };
    let x = getRandomIntInclusive(0, 2);
    let y = getRandomIntInclusive(0, 2);
    // food location should be diffent from snake location
    let isSnake = grid.find(
      (square) => square.x === x && square.y === y
    ).isSnake;

    if (isSnake) {
      // recursive fn
      return insertFood(grid);
    } else {
      return { x, y };
    }
  };
  const food = generateRandomFoodLocation();
  let updatedGrid = grid.map((square) => {
    if (square.x === food.x && square.y === food.y) {
      square.isFood = true;
    }
    return square;
  });
  return updatedGrid;
};

export const moveSnake = (grid, actualDirection, previousDirection) => {
  // grid limits
  const xLimSup = 2;
  const yLimSup = 2;

  // helpers
  const getDestination = (head, actualDirection) => {
    // case right
    if (actualDirection === "right") {
      return { x: head.x + 1, y: head.y };
    }
    // case left
    if (actualDirection === "left") {
      return { x: head.x - 1, y: head.y };
    }
    // case down
    if (actualDirection === "down") {
      return { x: head.x, y: head.y + 1 };
    }
    // case up
    if (actualDirection === "up") {
      return { x: head.x, y: head.y - 1 };
    }
  };
  const checkLim = (position, limInf, limSup) => {
    if (position < limInf || position > limSup) {
      return false;
    } else {
      return true;
    }
  };
  const checkRules = (actualDirection, previousDirection) => {
    // if (actualDirection === previousDirection) {
    //   return false;
    // }
    if (
      (actualDirection === "right" && previousDirection === "left") ||
      (actualDirection === "left" && previousDirection === "right")
    ) {
      return false;
    }
    if (
      (actualDirection === "up" && previousDirection === "down") ||
      (actualDirection === "down" && previousDirection === "up")
    ) {
      return false;
    }
    return true;
  };
  const swapSquares = (tail, destination, head, grid) => {
    let body = snake.filter((part) => part.part !== snake.length);
    let updatedGrid = grid.map((square) => {
      // reset previous tail
      if (square.x === tail.x && square.y === tail.y) {
        square = {
          x: square.x,
          y: square.y,
          isSnake: false,
          isFood: false,
        };
      }
      // assign new head
      if (square.x === destination.x && square.y === destination.y) {
        square = {
          x: square.x,
          y: square.y,
          isSnake: true,
          isFood: false,
          part: 1,
        };
      }
      // adjust snake body
      for (let i in body) {
        if (body[i].x === square.x && body[i].y === square.y) {
          square = {
            ...square,
            part: square.part + 1,
          };
        }
      }
      return square;
    });
    return updatedGrid;
  };
  const eatFood = (head, tail, destination, grid) => {
    const body = snake.filter((part) => part.part !== 1);
    let updatedGrid = grid.map((square) => {
      // reset previous head
      if (square.x === head.x && square.y === head.y) {
        square = {
          x: square.x,
          y: square.y,
          isSnake: true,
          isFood: false,
          part: 2,
        };
      }
      // assign new head
      if (square.x === destination.x && square.y === destination.y) {
        square = {
          x: square.x,
          y: square.y,
          isSnake: true,
          isFood: false,
          part: 1,
        };
      }
      // adjust snake body
      for (let i in body) {
        if (body[i].x === square.x && body[i].y === square.y) {
          square = {
            x: square.x,
            y: square.y,
            isSnake: true,
            isFood: false,
            part: square.part + 1,
          };
        }
      }

      return square;
    });
    // create new food square after eating
    updatedGrid = insertFood(updatedGrid);
    return updatedGrid;
  };

  // vars
  let updatedGrid = [];
  const snake = grid.filter((square) => square.isSnake);
  const head = grid.find((square) => square.part === 1);
  const tail = grid.find((square) => square.part === snake.length);
  const destination = getDestination(head, actualDirection);
  const isDestinationSnake = grid.find(
    (square) => square.x === destination.x && square.y === destination.y
  )?.isSnake;
  const isFood = grid.find(
    (square) => square.x === destination.x && square.y === destination.y
  )?.isFood;

  if (
    checkLim(destination.x, 0, xLimSup) &&
    checkLim(destination.y, 0, yLimSup) &&
    !isDestinationSnake
  ) {
    // check rules
    if (checkRules(actualDirection, previousDirection)) {
      updatedGrid = isFood
        ? eatFood(head, tail, destination, grid)
        : swapSquares(tail, destination, head, grid);
    }
  } else {
    return { updatedGrid, previousDirection };
  }

  return { updatedGrid, actualDirection };
};
