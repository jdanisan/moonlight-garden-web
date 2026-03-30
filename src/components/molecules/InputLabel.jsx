export function InputLabel({
  label,
  type = "text",
  name,
  value,
  onChange,
  options = [],
  placeholder,
  id
}) {
  // Si no se pasa id, usamos el name como fallback
  const fieldId = id || name;

  return (
    <div className="form-field">
      {label && <label htmlFor={fieldId}>{label}</label>}

      {type === "select" ? (
        <select id={fieldId} name={name} value={value} onChange={onChange}>
          <option value="">{placeholder || "Select option"}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
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
        />
      )}
    </div>
  );
}