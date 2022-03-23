import { Select, FormControl, MenuItem, SelectChangeEvent } from '@mui/material';

import React from 'react';

type Props = {
  value: string | number | undefined;
  minWidth?: number;
  options: { label: string | number, value: string | number }[];
  displayEmpty?: boolean;
  handleChange?: ((event: SelectChangeEvent<any>, child: React.ReactNode) => void) | undefined;
}

function SelectBox(props: Props) {
  const { value, options, handleChange, displayEmpty, minWidth } = props;

  return (
    <FormControl sx={{ m: 1, minWidth: minWidth ? minWidth : 130 }}>
      <Select
        value={value}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {displayEmpty ? <MenuItem value=""></MenuItem> : ""}
        {options.map((option) => 
          <MenuItem
            key={option.value}
            value={option.value}
          >
              {option.label}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

export default SelectBox;