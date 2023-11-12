import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ handleFilterChange }) {
  const [option, setOption] = useState('');

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setOption(selectedOption);
    handleFilterChange(selectedOption);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Vyber filtraci</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label="option"
          onChange={handleChange}
        >
          <MenuItem value="all">Zobrazit všechny položky</MenuItem>
          <MenuItem value="checked">Zobrazit zaškrtnuté položky</MenuItem>
          <MenuItem value="unchecked">Zobrazit nezaškrtnuté položky</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}