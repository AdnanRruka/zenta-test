import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { GlobalContext } from '../global/Store';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TransactionList = () => {
  let history = useHistory();
  const classes = useStyles();
  const {
    getData,
    setAllData,
    allData,
    searchPhrase,
    page,
    pageSize,
    count,
    setCurrentTransaction,
    setCurrentIndex,
    setPage,
    setPageSize,
    order,
    setOrder,
    setOrderBy,
    orderBy,
  } = useContext(GlobalContext);

  useEffect(() => {
    const getApi = async () => {
      const fetchedData = await getData();
      if (fetchedData) setAllData(fetchedData);
    };
    getApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newData = async () => {
      let query = `?pageSize=${pageSize}&page=${page}&order=${order}&orderBy=${orderBy}`;
      if (searchPhrase) {
        query += `&searchPhrase=${searchPhrase}`;
      }
      axios
        .get(`https://zentaapi.azurewebsites.net/transaction/Index${query}`)
        .then((res) => {
          setAllData(res.data.data);
          history.push(query);
        });
    };

    newData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, page, searchPhrase, order, orderBy]);

  const setActiveTransaction = (transaction, index) => {
    setCurrentTransaction(transaction);
    setCurrentIndex(index);
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
    <>
      <Pagination
        className="my-3"
        count={count}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />

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
      <Typography variant="h6" className={classes.title}>
        All Senders
      </Typography>
      <Divider />
      {allData &&
        allData.map((data, index) => (
          <ListItem
            onClick={() => setActiveTransaction(data, index)}
            button
            key={data}
          >
            <ListItemText primary={data.sender} />
          </ListItem>
        ))}
    </>
  );
};

export default TransactionList;
