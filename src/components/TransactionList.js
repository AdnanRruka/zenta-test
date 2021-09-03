import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { GlobalContext } from '../global/Store';
import { makeStyles } from '@material-ui/core/styles';
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
    setCurrentTransaction,
    setCurrentIndex,
    order,
    orderBy,
    startDate,
    endDate,
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
      if (startDate) {
        query += `&startDate=${startDate}`;
      }
      if (endDate) {
        query += `&endDate=${endDate}`;
      }

      axios
        .get(`https://zentaapi.azurewebsites.net/transaction/Index`, {
          params: {
            pageSize,
            page,
            searchPhrase,
            order,
            orderBy,
            startDate,
            endDate,
          },
        })
        .then((res) => {
          setAllData(res.data.data);
          history.push(query);
        });
    };

    newData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, page, searchPhrase, order, orderBy, startDate, endDate]);

  const setActiveTransaction = (transaction, index) => {
    setCurrentTransaction(transaction);
    setCurrentIndex(index);
  };

  return (
    <>
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
