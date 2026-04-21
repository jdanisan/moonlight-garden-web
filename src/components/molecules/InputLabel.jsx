export function InputLabel({
   label,
  type = "text",
  name,
  value,
  onChange,
  options = [],
  placeholder,
  id,
  className,
}) {
  const fieldId = id || name;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] cursor-pointer gap-2.5 items-center">
      {label && <label className="font-bold text-sm" htmlFor={fieldId}>{label}</label>}

      {type === "select" ? (
        <select id={fieldId} name={name} value={value} onChange={onChange} className={className}>
          <option  value="">{placeholder || "Select option"}</option>
          {options.map((opt) => (
            <option className="text-sm " key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
        />
      )}
    </div>
  );
}