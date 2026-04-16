export function List({ items = [], renderItem, className = "", classNameLi="" }) {
  if (!items.length) return null;

  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={item.id || index} className={classNameLi}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}