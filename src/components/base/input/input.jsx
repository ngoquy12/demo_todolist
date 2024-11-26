import "./input.css";

export default function Input({
  name,
  id,
  value,
  placeholder = "Nhập nội dung",
  type = "text",
  onChange,
}) {
  return (
    <>
      <input
        onChange={onChange}
        value={value}
        name={name}
        id={id}
        placeholder={placeholder}
        type={type}
        className="base-input"
      />
    </>
  );
}
