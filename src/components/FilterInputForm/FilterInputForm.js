import Button from 'components/Button';
import React, { useState } from 'react';
import * as S from "./style";
import * as C from 'constant'
import CheckBox from 'components/CheckBox';

const FilterInputForm = ({ buttonLabel, placeholder, list, onDelete, handleAddClick }) => {
    const [text, setText] = useState()

    const Capitalize = (str) => {
        return str.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    }
    return (
        <S.Form>
            <Button label={buttonLabel} variant={C.VARIANT.outlined} onClick={() => handleAddClick(text)} />
            <S.Input type="text" placeholder={placeholder} onChange={(t) => setText(Capitalize(t.target.value))} />
            {list.map(item => <CheckBox key={item} label={item} isChecked color="secondary" onChange={() => onDelete(item)} />)}
        </S.Form>

    );
}

export default FilterInputForm;