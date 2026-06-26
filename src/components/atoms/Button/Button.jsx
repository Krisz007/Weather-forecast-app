import "./Button.scss"

export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) => (
  <button
    type="button"
    className={`button ${variant} ${className}`.trim()}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
)
