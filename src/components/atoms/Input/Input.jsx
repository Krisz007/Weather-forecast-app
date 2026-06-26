import "./Input.scss"

export const Input = ({
  value,
  onChange,
  placeholder = "",
  autoFocus = false,
  ...props
}) => (
  <input
    className="input"
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    autoFocus={autoFocus}
    {...props}
  />
)
