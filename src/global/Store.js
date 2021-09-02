import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api/allDataUrl';

export const GlobalContext = React.createContext();

const Store = ({ children }) => {
  const history = useHistory();
  console.log(history);
  const getData = async () => {
    const response = await api.get();
    console.log(response);
    setCount(response.data.lastPage);
    setPage(response.data.from);
    return response.data.data;
  };
  const [allData, setAllData] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const [searchPhrase, setSearchPhrase] = useState('');
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Store;