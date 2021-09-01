import React, { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';

import api from '../api/allDataUrl';

const TransactionList = () => {
  const getData = async () => {
    const response = await api.get();
    return response.data.data;
  };
  const [allData, setAllData] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const [searchPhrase, setSearchPhrase] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [10, 25, 50];

  useEffect(() => {
    const getAllData = async () => {
      const getAllData = await getData();
      if (getAllData) setAllData(getAllData);
      console.log(allData);
    };
    getAllData();
  }, []);

  const getRequestParams = (searchPhrase, page, pageSize) => {
    let params = {};

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

    api
      .get(params)
      .then((response) => {
        const { data, total } = response.data;

        setAllData(data);
        setCount(total);
        console.log(allData);
        console.log(count);

        console.log(response.data);
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
    setPage(1);
  };

  return (
    <div className="list row">
      <div className="col-md-8">
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
      </div>
      <div className="col-md-6">
        <h4>List Of All Senders</h4>

        <div className="mt-3">
          {'Senders per Page: '}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

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
        </div>

        <ul className="list-group">
          {allData &&
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
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentTransaction ? (
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
        )}
      </div>
    </div>
  );
};

export default TransactionList;
