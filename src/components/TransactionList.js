import React, { useEffect, useContext } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { GlobalContext } from '../global/Store';
import api from '../api/allDataUrl';
import axios from 'axios';

const TransactionList = () => {
  const {
    getData,
    setAllData,
    allData,
    searchPhrase,
    page,
    pageSize,
    setCount,
    count,
    setCurrentTransaction,
    setCurrentIndex,
    setSearchPhrase,
    setPage,
    setPageSize,
    pageSizes,
    currentIndex,
    currentTransaction,
  } = useContext(GlobalContext);

  useEffect(() => {
    const getAllData = async () => {
      const getAllData = await getData();
      if (getAllData) setAllData(getAllData);
      console.log(allData);
    };
    getAllData();
  }, []);

  useEffect(() => {
    const newData = async () => {
      axios
        .get(
          `https://zentaapi.azurewebsites.net/transaction/Index?pageSize=${pageSize}&page=${page}&searchPhrase=${searchPhrase}`
        )
        .then((res) => {
          setAllData(res.data.data);
        });
    };
    newData();
  }, [pageSize, page, searchPhrase]);

  const getRequestParams = (searchPhrase, page, pageSize) => {
    let params = {};
    console.log(searchPhrase, page, pageSize);
    if (searchPhrase) {
      params['searchPhrase'] = searchPhrase;
    }

    if (page) {
      params['page'] = page - 1;
    }

    if (pageSize) {
      params['size'] = pageSize;
    }
    return params;
  };

  const retrieveTransactions = () => {
    const params = getRequestParams(searchPhrase, page, pageSize);

    axios
      .get('https://zentaapi.azurewebsites.net/transaction/Index', params)
      .then((response) => {
        const { data, total } = response.data;
        setAllData(data);
        setCount(total);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveTransaction = (transaction, index) => {
    setCurrentTransaction(transaction);
    setCurrentIndex(index);
  };

  const onChangeSearchPhrase = (e) => {
    setSearchPhrase(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    // setCount(Math.round(event.target.value / count));
    console.log(count);
    setPage(1);
  };

  return (
    <div className="list row">
      {/* <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchPhrase}
            onChange={onChangeSearchPhrase}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveTransactions}
            >
              Search
            </button>
          </div>
        </div>
      </div> */}
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
      <div className="col-md-6">
        {/* <h4>List Of All Senders</h4> */}

        <div className="mt-3">
          {'Senders per Page: '}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* <ul className="list-group"> */}
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

        {/* {allData &&
            allData.map((data, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveTransaction(data, index)}
                key={index}
              >
                {data.sender}
              </li>
            ))} */}
        {/* </ul> */}
      </div>
      <div className="col-md-6">
        {/* {currentTransaction ? (
          <div>
            <h4>Customer List</h4>
            <div>
              <label>
                <strong>Sender:</strong>
              </label>{' '}
              {currentTransaction.sender}
            </div>
            <div>
              <label>
                <strong>payIn:</strong>
              </label>{' '}
              {currentTransaction.payIn}
            </div>
            <div>
              <label>
                <strong>PayOut:</strong>
              </label>{' '}
              {currentTransaction.payOut}
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Transaction Made By Customer...</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TransactionList;
