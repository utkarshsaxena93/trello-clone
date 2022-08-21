import { useMemo, useState } from "react";
import "./Column.css";

// North start: https://master--5fc05e08a4a65d0021ae0bf2.chromatic.com/?path=/story/presets-sortable-vertical--basic-setup
// Start with creating a sortable list using HTML drag and drop
// then update the code to use Intersection observer, etc. for a more
// robust drag and drop solution.

export function Column() {
  const [items, setItems] = useState(
    new Array(getRandomInt(5, 10)).fill(true).map((_, index) => index)
  );
  const [draggingItemId, setDraggingItemId] = useState<number | null>(null);

  const listItemsMarkup = useMemo(() => {
    return items.map((content, index) => {
      function handleDragStart(event: React.DragEvent<HTMLElement>) {
        setDraggingItemId(content);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text", String(index));
      }

      function handleDragOver(event: React.DragEvent<HTMLElement>) {
        event?.preventDefault();
        return false;
      }

      function handleDragEnd(event: React.DragEvent<HTMLElement>) {
        setDraggingItemId(null);
      }

      const className = `Column-ListItem ${
        draggingItemId === content && "Column-ListItemDragging"
      }`;

      return (
        <li
          key={content}
          className={className}
          draggable="true"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {content}
        </li>
      );
    });
  }, [draggingItemId, items]);

  function handleDrop(event: React.DragEvent<HTMLElement>) {
    const prevIndex = Number(event.dataTransfer.getData("text"));
    console.log({ prevIndex });
    const newIndex = 3;
    setItems(arrayMove(items, prevIndex, newIndex));
    event?.preventDefault();
    return false;
  }

  function handleDragOver(event: React.DragEvent<HTMLElement>) {
    event?.preventDefault();
    return false;
  }

  return (
    <div className="Column">
      <ul
        className="Column-ListContiner"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {listItemsMarkup}
      </ul>
    </div>
  );
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arrayMove(arr: any[], prevIndex: number, newIndex: number) {
  let newItems = [...arr];
  newItems[prevIndex] = newItems.splice(newIndex, 1, newItems[prevIndex])[0];
  return [...newItems];
}
