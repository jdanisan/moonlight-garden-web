export function Input({ label, id,name, type = "text",value,onChange={onChange}, list }) {
  return (
    <div className="relative flex-1 items-center min-w-44  py-2 px-3 text-sm">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        list={list}
        placeholder=" "
        className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2
                   focus:outline-none"
      />

      <label
        htmlFor={id}
        className="absolute left-3 top-2 text-black px-1
                   transition-all duration-200
                   text-base
                   peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-base
                   peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-800"
      >
        {label}
      </label>
    </div>
  );
}