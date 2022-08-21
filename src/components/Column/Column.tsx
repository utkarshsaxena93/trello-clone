import { useMemo, useState } from "react";
import "./Column.css";

interface Props {
  items: any[];
}

export function Column(props: Props) {
  const { items } = props;
  const [draggingItemId, setDraggingItemId] = useState<number | null>(null);

  const listItemsMarkup = useMemo(() => {
    return new Array(items.length).fill(true).map((_, index) => {
      function handleDragStart(event: React.DragEvent<HTMLElement>) {
        console.log("onDragStart", event.currentTarget.innerHTML);
        setDraggingItemId(index);
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
        draggingItemId === index && "Column-ListItemDragging"
      }`;

      return (
        <li
          key={index}
          className={className}
          draggable="true"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {index}
        </li>
      );
    });
  }, [draggingItemId, items.length]);

  function handleDrop(event: React.DragEvent<HTMLElement>) {
    console.log("handleDrop", event.dataTransfer.getData("text"));
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
