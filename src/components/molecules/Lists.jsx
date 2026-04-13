export function List({ items = [], renderItem, className = "" }) {
  if (!items.length) return null;

  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={item.id || index}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}