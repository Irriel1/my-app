// ListFilter.js
import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material';

const ListFilter = ({ filterOption, onFilterChange }) => {
  return (
    <Grid sx={{ minWidth: 120, margin: 2, display: "flex", alignItems: "center"}}>
      <FormControl fullWidth>
        <InputLabel id="list-filter-label">Vyber nákupní seznamy</InputLabel>
        <Select
          labelId="list-filter-label"
          id="list-filter"
          value={filterOption}
          label="Filter Lists"
          onChange={onFilterChange}
        >
          <MenuItem value="all">Všechny nákupní seznamy</MenuItem>
          <MenuItem value="active">Aktivní nákupní seznamy</MenuItem>
          <MenuItem value="archived">Archivované nákupní seznamy</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default ListFilter;
