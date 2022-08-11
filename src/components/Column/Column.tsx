import { useMemo } from "react";
import "./Column.css";

interface Props {
  items: any[];
}

export function Column(props: Props) {
  const { items } = props;

  const listItemsMarkup = useMemo(() => {
    return new Array(items.length).fill(true).map((_, index) => {
      return <li className="Column-ListItem">{index}</li>;
    });
  }, [items]);

  return (
    <div className="Column">
      <ul className="Column-ListContiner">{listItemsMarkup}</ul>
    </div>
  );
}
