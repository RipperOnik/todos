import React from "react";

interface CheckBoxProps {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

function CheckBox({ id, label, onChange, checked }: CheckBoxProps) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        data-testid="todo-item"
        id={id}
        onChange={onChange}
        checked={checked}
      />
      <label
        className="form-check-label"
        htmlFor={id}
        style={{
          textDecoration: checked ? "line-through" : "none",
          color: checked ? "grey" : "black",
        }}
      >
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
