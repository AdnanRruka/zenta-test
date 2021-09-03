import React, { useContext } from 'react';

import { GlobalContext } from '../global/Store';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
}));

function FilterFunctions() {
  const classes = useStyles();
  const {
    page,
    pageSize,
    count,
    setPage,
    setPageSize,
    order,
    setOrder,
    setOrderBy,
    orderBy,
    endDate,
    startDate,
    setStartDate,
    setEndDate,
  } = useContext(GlobalContext);

  const handleDatePickerChange = (e) => {
    if (e.target.name === 'startDate') {
      setStartDate(e.target.value);
    }
    if (e.target.name === 'endDate') {
      setEndDate(e.target.value);
    }
  };

  const clearAllDates = (e) => {
    e.stopPropagation();
    setStartDate(null);
    setEndDate(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };
  const handleOrderChange = (event) => {
    if (event.target.value === 'Code' || event.target.value === 'time') {
      setOrderBy(event.target.value);
    } else {
      setOrder(event.target.value);
    }
    setPage(1);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Senders per Page:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={50}>Fifty</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Order:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={order}
          onChange={handleOrderChange}
        >
          <MenuItem value="asc">A-Z</MenuItem>
          <MenuItem value="desc">Z-A</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Order By:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={orderBy}
          onChange={handleOrderChange}
        >
          <MenuItem value="Code">Code</MenuItem>
          <MenuItem value="time">Time</MenuItem>
        </Select>
      </FormControl>
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Start Date"
          type="date"
          defaultValue={startDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          name="startDate"
          onChange={handleDatePickerChange}
        />
        <IconButton onClick={() => setStartDate(null)}>
          <ClearIcon />
        </IconButton>
      </form>
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="End Date"
          type="date"
          defaultValue={endDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
            // endAdornment: (
            //   <IconButton onClick={() => setEndDate(null)}>
            //     <ClearIcon />
            //   </IconButton>
            // ),
          }}
          name="endDate"
          onChange={handleDatePickerChange}
        />
        <IconButton onClick={() => setEndDate(null)}>
          <ClearIcon />
        </IconButton>
      </form>

      <Pagination
        count={count}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
    </div>
  );
}

export default FilterFunctions;
