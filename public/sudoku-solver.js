const textArea = document.getElementById("text-input");
const sudoku = document.getElementById("sudoku-grid");
let sudokuArea = [];

const sudokuInput = document.getElementsByClassName("sudoku-input");
const clearButton = document.getElementById("clear-button");
const solveButton = document.getElementById("solve-button");
let errorDiv = document.getElementById("error-msg");
let puzzleArr;
let solution;
import { puzzlesAndSolutions } from "./puzzle-strings.js";

const Solver = function() {};
Solver.prototype.sudokuArr = object => {
  for (let i = 0; i < object.length; i++) {
    sudokuArea = Object.values(object).map(item => {
      return item.value;
    });
  }
};
Solver.prototype.setRowArr = arr => {
  for (let i = 0; i < arr.length; i++) {
    let rowArr = [];
    for (let j = 0; j < arr.length; j++) {
      if (arr[i].square[0] === arr[j].square[0]) {
        if (Number(arr[j].value)) {
          rowArr.push(arr[j].value);
        }
      }
    }
    arr[i].rowArr = rowArr;
  }
  return arr;
};
Solver.prototype.setColArr = arr => {
  for (let i = 0; i < arr.length; i++) {
    let colArr = [];
    for (let j = 0; j < arr.length; j++) {
      if (arr[i].square[1] === arr[j].square[1]) {
        if (Number(arr[j].value)) {
          colArr.push(arr[j].value);
        }
      }
    }
    arr[i].colArr = colArr;
  }
  return arr;
};
Solver.prototype.setZoneArr = arr => {
  for (let i = 0; i < arr.length; i++) {
    let zoneArr = [];
    for (let j = 0; j < arr.length; j++) {
      if (arr[i].zone === arr[j].zone) {
        if (Number(arr[j].value)) {
          zoneArr.push(arr[j].value);
        }
      }
    }
    arr[i].zoneArr = zoneArr;
  }
  return arr;
};
Solver.prototype.setPossibleArr = arr => {
  arr = arr.map(item => {
    let testArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let filteredArr = [];
    item.possibleNum = testArr.filter(x => {
      return !item.rowArr.includes(x);
    });

    item.possibleNum = item.possibleNum.filter(y => {
      return !item.colArr.includes(y);
    });
    item.possibleNum = item.possibleNum.filter(z => {
      return !item.zoneArr.includes(z);
    });

    return item;
  });
  return arr;
};
Solver.prototype.mapTextToSudoku = (text, dom) => {
  let arr = text.split("");
  arr = arr.map(item => {
    if (item === ".") {
      return "";
    } else {
      return item;
    }
  });
  for (let i = 0; i < dom.length; i++) {
    dom[i].value = arr[i];
  }
};

Solver.prototype.mapSudokuToText = (dom, text) => {
  if (text.length == 0) {
    text =
      ".................................................................................";
  }
  let textArr = text.split("");

  for (let i = 0; i < dom.length; i++) {
    textArr[i] = dom[i];
  }

  textArr = textArr.map(item => {
    if (Number(item) && Number(item) > 0 && Number(item) < 10) {
      return item;
    } else {
      return ".";
    }
  });

  return textArr.join("");
};
Solver.prototype.clear = () => {
  textArea.value = "";
  for (let i = 0; i < sudokuInput.length; i++) {
    sudokuInput[i].value = "";
  }
};

Solver.prototype.puzzlePicker = () => {
  let randomNum = Math.floor(Math.random() * 5);
  puzzleArr = puzzlesAndSolutions[randomNum];
};

Solver.prototype.refresh = arr => {
  arr = Solver.prototype.setRowArr(arr);
  arr = Solver.prototype.setColArr(arr);
  arr = Solver.prototype.setZoneArr(arr);
  arr = Solver.prototype.setPossibleArr(arr);

  return arr;
};
Solver.prototype.update = arr => {
  arr = arr.map(item => {
    if (item.value === "" && item.possibleNum.length === 1) {
      item.value = item.possibleNum[0];
      console.log(item.square, "aha", item.value);
    }
    return item;
  });
  return arr;
};
Solver.prototype.checkValid = input => {
  let text = input.split("");
  let result = text.reduce((a, b) => {
    return Number(a) + Number(b);
  });
  console.log(result);
  if (result == 405) {
    return true;
  } else return false;
};

Solver.prototype.solve = arr => {
  Solver.prototype.refresh(arr);
  Solver.prototype.update(arr);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value == "") {
      Solver.prototype.solve(arr);
      break;
    } else {
      sudokuArea = arr.map(item => {
        return item.value;
      });

      textArea.value = Solver.prototype.mapSudokuToText(
        sudokuArea,
        textArea.value
      );
      if (Solver.prototype.checkValid(textArea.value)) {
        Solver.prototype.mapTextToSudoku(textArea.value, sudokuInput);
      } else {
        console.log("Not a valid solution");
      }
    }
  }
};
Solver.prototype.checkLength = input => {
  if (input.length != 81) {
    errorDiv.innerText = "Error: Expected puzzle to be 81 characters long.";
  } else {
    let sudokuObj;

    for (let i = 0; i < sudokuInput.length; i++) {
      sudokuObj = Object.values(sudokuInput).map(item => {
        return new Object({
          value: item.value,
          square: item.id,
          zone:
            (item.id[0] === "A" || item.id[0] === "B" || item.id[0] === "C") &&
            item.id[1] < 4
              ? "AC13"
              : (item.id[0] === "A" ||
                  item.id[0] === "B" ||
                  item.id[0] === "C") &&
                item.id[1] < 7
              ? "AC26"
              : (item.id[0] === "A" ||
                  item.id[0] === "B" ||
                  item.id[0] === "C") &&
                item.id[1] < 10
              ? "AC79"
              : (item.id[0] === "D" ||
                  item.id[0] === "E" ||
                  item.id[0] === "F") &&
                item.id[1] < 4
              ? "DF13"
              : (item.id[0] === "D" ||
                  item.id[0] === "E" ||
                  item.id[0] === "F") &&
                item.id[1] < 7
              ? "DF26"
              : (item.id[0] === "D" ||
                  item.id[0] === "E" ||
                  item.id[0] === "F") &&
                item.id[1] < 10
              ? "DF79"
              : (item.id[0] === "G" ||
                  item.id[0] === "H" ||
                  item.id[0] === "I") &&
                item.id[1] < 4
              ? "GI13"
              : (item.id[0] === "G" ||
                  item.id[0] === "H" ||
                  item.id[0] === "I") &&
                item.id[1] < 7
              ? "GI46"
              : (item.id[0] === "G" ||
                  item.id[0] === "H" ||
                  item.id[0] === "I") &&
                item.id[1] < 10
              ? "GI79"
              : "",
          row: item.id[0],
          col: item.id[1],
          rowArr: [],
          colArr: [],
          zoneArr: [],
          possibleNum: []
        });
      });
    }

    errorDiv.innerText = "";
    Solver.prototype.solve(sudokuObj);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Load a simple puzzle into the text area
  Solver.prototype.puzzlePicker();

  textArea.value = puzzleArr[0];
  Solver.prototype.mapTextToSudoku(textArea.value, sudokuInput);
  Solver.prototype.sudokuArr(sudokuInput);
});

textArea.addEventListener("keyup", event => {
  if ((event.keyCode >= 49 && event.keyCode <= 57) || event.keyCode == 190) {
    Solver.prototype.mapTextToSudoku(textArea.value, sudokuInput);
    Solver.prototype.sudokuArr(sudokuInput);
  }
});
textArea.addEventListener("paste", () => {
  Solver.prototype.mapTextToSudoku(textArea.value, sudokuInput);
  Solver.prototype.sudokuArr(sudokuInput);
});
sudoku.addEventListener("keyup", () => {
  if (event.keyCode >= 49 && event.keyCode <= 57) {
    Solver.prototype.sudokuArr(sudokuInput);

    textArea.value = Solver.prototype.mapSudokuToText(
      sudokuArea,
      textArea.value
    );
  }
});
clearButton.addEventListener("click", () => {
  Solver.prototype.clear();
});
solveButton.addEventListener("click", () => {
  Solver.prototype.checkLength(textArea.value);
});

let solver = new Solver();

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = solver;
} catch (e) {
  console.log(e);
}
