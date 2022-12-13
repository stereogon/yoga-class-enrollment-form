import classNames from "classnames";

function InputField({ children, className, onChange, value, ...rest }) {
  const handleChange = (event) => {
    let value = event.target.value;
    if (rest.type === "number") {
      value = parseInt(value);
      if (isNaN(value)) {
        value = 0;
      }
    }
    onChange(value);
  };

  const classes = classNames(
    "p-3 w-60 border outline-none rounded shadow",
    "focus:ring",
    className
  );

  return (
    <input {...rest} className={classes} value={value} onChange={handleChange}>
      {children}
    </input>
  );
}

export default InputField;
