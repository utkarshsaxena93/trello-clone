import { useMemo } from "react";
import { Column } from "./components/Column/Column";

import "./Board.css";

const NUMBER_OF_COLUMNS = 5;

function Board() {
  const columnMarkup = useMemo(() => {
    return new Array(NUMBER_OF_COLUMNS).fill(true).map((_, index) => {
      return (
        <Column key={index} items={new Array(getRandomInt(5, 10)).fill(true)} />
      );
    });
  }, []);

  return (
    <div
      className="Board"
      style={{
        gridTemplateColumns: `repeat(${NUMBER_OF_COLUMNS}, auto)`,
      }}
    >
      {columnMarkup}
    </div>
  );
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Board;
