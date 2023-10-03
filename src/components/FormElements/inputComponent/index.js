export default function InputComponent({
  label,
  placeholder,
  type,
  onChange,
  value,
}) {
  return (
    <div className="relative">
      <p className="pt-0 pr-3 pb-0 -mt-2 mr-0 mb-0 ml-2 font-medium text-gray-600">
        {label}
      </p>
      <input
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="border placeholder:gray-500 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl4
        mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-lg  text-start p-1"
      />
    </div>
  );
}
