/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let solver;

suite("Functional Tests", () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    solver = require("../public/sudoku-solver.js");
  });

  suite("Text area and sudoku grid update automatically", () => {
    // Entering a valid number in the text area populates
    // the correct cell in the sudoku grid with that number
    test("Valid number in text area populates correct cell in grid", done => {
      let textArea = document.getElementById("text-input").value;
      let sudokuInput = document.getElementsByClassName("sudoku-input");

      let string =
        "923456789.1........333.......4444......5555.....5556666....666.77777.7777....8888";

      textArea = string;

      solver.mapTextToSudoku(textArea, sudokuInput);
      let A1 = document.getElementById("A1").value;
      let B2 = document.getElementById("B2").value;
      let C3 = document.getElementById("C3").value;
      let D4 = document.getElementById("D4").value;
      let E5 = document.getElementById("E5").value;
      let F6 = document.getElementById("F6").value;
      let G7 = document.getElementById("G7").value;
      let H8 = document.getElementById("H8").value;
      let I9 = document.getElementById("I9").value;
      assert.equal(textArea[0], A1);
      assert.equal(textArea[10], B2);
      assert.equal(textArea[20], C3);
      assert.equal(textArea[30], D4);
      assert.equal(textArea[40], E5);
      assert.equal(textArea[50], F6);
      assert.equal(textArea[60], G7);
      assert.equal(textArea[70], H8);
      assert.equal(textArea[80], I9);
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test("Valid number in grid updates the puzzle string in the text area", done => {
      let sudokuInput = document.getElementsByClassName("sudoku-input");

      sudokuInput[0].value = "1";
      sudokuInput[10].value = "2";
      sudokuInput[20].value = "3";
      sudokuInput[30].value = "4";
      sudokuInput[40].value = "5";
      sudokuInput[50].value = "6";
      sudokuInput[60].value = "7";
      sudokuInput[70].value = "8";
      sudokuInput[80].value = "9";

      let sudokuArea;
      for (let i = 0; i < sudokuInput.length; i++) {
        sudokuArea = Object.values(sudokuInput).map(item => {
          return item.value;
        });
      }

      let textArea = document.getElementById("text-input").value;

      textArea = solver.mapSudokuToText(sudokuArea, textArea);
      assert.equal(textArea[0], sudokuInput[0].value);
      assert.equal(textArea[10], sudokuInput[10].value);
      assert.equal(textArea[20], sudokuInput[20].value);
      assert.equal(textArea[30], sudokuInput[30].value);
      assert.equal(textArea[40], sudokuInput[40].value);
      assert.equal(textArea[50], sudokuInput[50].value);
      assert.equal(textArea[60], sudokuInput[60].value);
      assert.equal(textArea[70], sudokuInput[70].value);
      assert.equal(textArea[80], sudokuInput[80].value);
      done();
    });
  });

  suite("Clear and solve buttons", () => {
    // Pressing the "Clear" button clears the sudoku
    // grid and the text area
    test("Function clearInput()", done => {
      solver.clear();
      let textArea = document.getElementById("text-input").value;
      let sudokuInput = document.getElementsByClassName("sudoku-input");

      assert.equal(textArea.length, 0);
      assert.equal(sudokuInput[0].value.length, 0);
      assert.equal(sudokuInput[10].value.length, 0);
      assert.equal(sudokuInput[20].value.length, 0);
      assert.equal(sudokuInput[30].value.length, 0);
      assert.equal(sudokuInput[40].value.length, 0);
      assert.equal(sudokuInput[50].value.length, 0);
      assert.equal(sudokuInput[60].value.length, 0);
      assert.equal(sudokuInput[70].value.length, 0);
      assert.equal(sudokuInput[80].value.length, 0);

      done();
    });

    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test("Function showSolution(solve(input))", done => {
      const output =
        "769235418851496372432178956174569283395842761628713549283657194516924837947381625";
      const input =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let sudokuInput = document.getElementsByClassName("sudoku-input");
      solver.checkLength(input);
      let textArea = document.getElementById("text-input").value;
      let sudokuArea;
      for (let i = 0; i < sudokuInput.length; i++) {
        sudokuArea = Object.values(sudokuInput).map(item => {
          return item.value;
        });
      }
      assert.equal(textArea, output);
      assert.equal(textArea[0], sudokuArea[0]);
      assert.equal(textArea[10], sudokuArea[10]);
      assert.equal(textArea[20], sudokuArea[20]);
      assert.equal(textArea[30], sudokuArea[30]);
      assert.equal(textArea[40], sudokuArea[40]);
      assert.equal(textArea[50], sudokuArea[50]);
      assert.equal(textArea[60], sudokuArea[60]);
      assert.equal(textArea[70], sudokuArea[70]);
      assert.equal(textArea[80], sudokuArea[80]);

      done();

      // done();
    });
  });
});
