import React, { useState } from 'react';

import axios from 'axios';
export const GlobalContext = React.createContext();

const Store = ({ children }) => {
  const getData = async () => {
    const response = await axios.get(
      'https://zentaapi.azurewebsites.net/transaction/Index'
    );

    console.log(response);
    setCount(response.data.lastPage);
    setPage(response.data.from);
    setPageSize(response.data.pageSize);
    return response.data.data;
  };
  const [allData, setAllData] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Code');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const pageSizes = [10, 25, 50];

  return (
    <GlobalContext.Provider
      value={{
        allData,
        setAllData,
        currentTransaction,
        setCurrentTransaction,
        searchPhrase,
        setSearchPhrase,
        page,
        setPage,
        pageSize,
        setPageSize,
        pageSizes,
        currentIndex,
        setCurrentIndex,
        count,
        setCount,
        getData,
        order,
        setOrder,
        setOrderBy,
        orderBy,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Store;
