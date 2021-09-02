import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { GlobalContext } from '../global/Store';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Pagination from '@material-ui/lab/Pagination';
import TransactionList from './TransactionList';
import api from '../api/allDataUrl';
import axios from 'axios';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    margin: theme.spacing(4, 2, 2),
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft() {
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

  const classes = useStyles();

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const onChangeSearchPhrase = (e) => {
    setSearchPhrase(e.target.value);
  };

  const retrieveTransactions = (e) => {
    e.preventDefault();
    const params = getRequestParams(searchPhrase, page, pageSize);

    axios
      .get('https://zentaapi.azurewebsites.net/transaction/Index', params)
      .then((response) => {
        const { data, total } = response.data;
        // console.log(data);
        setAllData(data);
        setCount(total);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

  // const handlePageSizeChange = (event) => {
  //   setPageSize(event.target.value);
  //   setPage(1);
  //   console.log(`/page=${event.target.value}`);
  // };

  // console.log(allData);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchPhrase}
                onChange={onChangeSearchPhrase}
              />
              <div className="input-group-append">
                {/* <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={retrieveTransactions}
                >
                  Search
                </button> */}
              </div>
            </div>
          </div>
          {/* <Pagination
            className="my-3 "
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          /> */}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {/* <div className={classes.toolbar} />
        {'Senders per Page: '}
        <select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select> */}
        <Typography variant="h6" className={classes.title}>
          All Senders
        </Typography>
        <Divider />
        <List>
          <TransactionList />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
      </main>
    </div>
  );
}
