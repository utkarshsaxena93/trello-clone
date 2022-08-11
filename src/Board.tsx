import React, { useMemo } from "react";
import { Column } from "./components/Column/Column";

import "./Board.css";

const NUMBER_OF_COLUMNS = 3;

function Board() {
  const columnMarkup = useMemo(() => {
    return new Array(NUMBER_OF_COLUMNS).fill(true).map((_, index) => {
      return <Column />;
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

export default Board;
