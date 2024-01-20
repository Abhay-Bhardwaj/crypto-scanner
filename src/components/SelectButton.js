import { makeStyles } from '@mui/styles';
import React from 'react'


const SelectButton = ({children, selected,onClick}) => {
    const usestyles = makeStyles((theme) => ({
        selectbutton:{
          border: '1px solid gold',
          borderRadius: '5px',
          padding: '10px',
          paddingLeft: '20px',
          paddingRight: '20px',
          fontFamily: 'Montserrat',
          cursor: 'pointer',
          backgroundColor: selected ? 'gold' : 'transparent',
          color: selected ? 'black' : '',
          fontWeight: selected ? '700' : '500',
          "&:hover": {
              backgroundColor: 'gold',
              color: 'black',
              },
              width: '22%',
        },
      }));

    const classess = usestyles();
  return (
    <span onClick={onClick} className={classess.selectbutton}>
        {children}
    </span>
  )
}

export default SelectButton