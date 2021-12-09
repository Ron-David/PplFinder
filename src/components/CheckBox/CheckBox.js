import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";

const CheckBox = ({ color = "primary", isChecked, onChange, label, value }) => {
  const handleChange = () => {
    onChange && onChange(value);
  };
  return (
    <S.CheckBox>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleChange} color={color} />}
        label={label}
      />
    </S.CheckBox>
  );
};

export default CheckBox;
