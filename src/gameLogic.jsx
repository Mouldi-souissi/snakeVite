export const loadGame = () => {
  let grid = [
    { x: 0, y: 0, isSnake: true, isFood: false, part: "tail" },
    { x: 1, y: 0, isSnake: true, isFood: false, part: "head" },
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
      return insertFood(grid);
    } else {
      console.log({ x, y });
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
  const xLimInf = 0;
  const xLimSup = 2;
  const yLimInf = 0;
  const yLimSup = 2;
  // vars
  let updatedGrid = [];
  let tail = {};
  let destination = {};
  let head = {};
  const snakeLength = grid.filter((square) => square.isSnake).length;

  // helpers
  const checkLim = (position, limInf, limSup) => {
    if (position < limInf || position > limSup) {
      return false;
    } else {
      return true;
    }
  };
  const swapSquares = (tail, destination, head, grid) => {
    let updatedGrid = grid.map((square) => {
      if (square.x === tail.x && square.y === tail.y) {
        square = {
          x: tail.x,
          y: tail.y,
          isSnake: false,
          isFood: false,
        };
      }
      if (square.x === destination.x && square.y === destination.y) {
        square = {
          x: destination.x,
          y: destination.y,
          isSnake: true,
          isFood: false,
          part: "head",
        };
      }
      if (snakeLength > 2) {
        // case snake with body parts
        if (square.part === snakeLength) {
          square = {
            x: square.x,
            y: square.y,
            isSnake: true,
            isFood: false,
            part: "tail",
          };
        }
        if (square.x === head.x && square.y === head.y) {
          square = {
            x: square.x,
            y: square.y,
            isSnake: true,
            isFood: false,
            part: snakeLength,
          };
        }
      } else {
        // case snake with two parts head and tail
        if (square.x === head.x && square.y === head.y) {
          square = {
            x: head.x,
            y: head.y,
            isSnake: true,
            isFood: false,
            part: "tail",
          };
        }
      }

      return square;
    });
    return updatedGrid;
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
  const eatFood = (head, destination, grid) => {
    let updatedGrid = grid.map((square) => {
      if (square.x === head.x && square.y === head.y) {
        square = {
          x: head.x,
          y: head.y,
          isSnake: true,
          isFood: false,
          part: snakeLength + 1,
        };
      }
      if (square.x === destination.x && square.y === destination.y) {
        square = {
          x: destination.x,
          y: destination.y,
          isSnake: true,
          isFood: false,
          part: "head",
        };
      }
      return square;
    });
    updatedGrid = insertFood(updatedGrid);
    return updatedGrid;
  };

  // check rules
  if (checkRules(actualDirection, previousDirection)) {
    // move cases
    if (actualDirection === "right") {
      updatedGrid = grid.map((square, i, grid) => {
        if (square.part === "tail") {
          tail = square;
        }
        if (square.part === "head") {
          destination = { x: square.x + 1, y: square.y };
          head = square;
        }
        return square;
      });
      if (
        checkLim(destination.x, xLimInf, xLimSup) &&
        destination.y === head.y
      ) {
        const isFood = grid.find(
          (square) => square.x === destination.x && square.y === destination.y
        ).isFood;
        updatedGrid = isFood
          ? eatFood(head, destination, updatedGrid)
          : swapSquares(tail, destination, head, updatedGrid);
      }
    }
    if (actualDirection === "left") {
      updatedGrid = grid.map((square, i, grid) => {
        if (square.part === "tail") {
          tail = square;
        }
        if (square.part === "head") {
          destination = { x: square.x - 1, y: square.y };
          head = square;
        }
        return square;
      });
      if (
        checkLim(destination.x, xLimInf, xLimSup) &&
        destination.y === head.y
      ) {
        const isFood = grid.find(
          (square) => square.x === destination.x && square.y === destination.y
        ).isFood;
        updatedGrid = isFood
          ? eatFood(head, destination, updatedGrid)
          : swapSquares(tail, destination, head, updatedGrid);
      }
    }
    if (actualDirection === "down") {
      updatedGrid = grid.map((square, i, grid) => {
        if (square.part === "tail") {
          tail = square;
        }
        if (square.part === "head") {
          destination = { x: square.x, y: square.y + 1 };
          head = square;
        }
        return square;
      });
      if (checkLim(destination.y, yLimInf, yLimSup)) {
        const isFood = grid.find(
          (square) => square.x === destination.x && square.y === destination.y
        ).isFood;
        updatedGrid = isFood
          ? eatFood(head, destination, updatedGrid)
          : swapSquares(tail, destination, head, updatedGrid);
      }
    }
    if (actualDirection === "up") {
      updatedGrid = grid.map((square, i, grid) => {
        if (square.part === "tail") {
          tail = square;
        }
        if (square.part === "head") {
          destination = { x: square.x, y: square.y - 1 };
          head = square;
        }
        return square;
      });
      if (checkLim(destination.y, yLimInf, yLimSup)) {
        const isFood = grid.find(
          (square) => square.x === destination.x && square.y === destination.y
        ).isFood;
        updatedGrid = isFood
          ? eatFood(head, destination, updatedGrid)
          : swapSquares(tail, destination, head, updatedGrid);
      }
    }
  }
  const conditionalReturn = updatedGrid.length
    ? { updatedGrid, actualDirection }
    : { updatedGrid: grid, actualDirection: previousDirection };
  return conditionalReturn;
};

export const moveSnakeManual = (grid, direction, previousDirection) => {
  let snakeLength = grid.filter((square) => square.snake).length;
  let updatedGrid = [];

  if (previousDirection === direction) {
    console.log("illegal move");
  }
  if (direction === "down") {
    updatedGrid = grid.map((square) => {
      if (square.isSnake && square.part && square.part === "head") {
        updatedGrid = moveSnakeAuto(grid, "down");
      }
      return square;
    });
  }
  if (direction === "up") {
  }
  if (direction === "left") {
  }
  if (direction === "right") {
  }
};
