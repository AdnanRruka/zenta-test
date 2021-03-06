import React, { useContext } from 'react';
import { GlobalContext } from '../global/Store';

import { alpha, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import TransactionList from './TransactionList';
import FilterFunctions from './FilterFunctions';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  rootCard: {
    minWidth: 275,
  },
  title: {
    margin: theme.spacing(4, 2, 2),
  },
  titleCard: {
    fontSize: 14,
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
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PermanentDrawerLeft() {
  const {
    searchPhrase,
    setSearchPhrase,
    setPageSize,
    currentTransaction,
    setTransactionDetails,
    transactionDetails,
    allData,
  } = useContext(GlobalContext);

  const classes = useStyles();

  const onChangeSearchPhrase = (e) => {
    if (e.target.value) {
      setPageSize(50);
      setSearchPhrase(e.target.value);
    } else {
      setPageSize(10);
      setSearchPhrase('');
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={searchPhrase}
              onChange={onChangeSearchPhrase}
              placeholder="Search???"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button
            onClick={(e) => {
              setTransactionDetails(!transactionDetails);
            }}
            variant="outlined"
            color="default"
          >
            {transactionDetails
              ? 'Hide all transactions'
              : 'Show all transactions'}
          </Button>
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
        <List>
          <TransactionList />
        </List>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
        >
          <FilterFunctions />
        </Drawer>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          {transactionDetails ? (
            <>
              {allData &&
                allData.map((data, index) => (
                  <Card
                    className={classes.rootCard}
                    variant="outlined"
                    button
                    key={data.id}
                  >
                    <Typography
                      className={classes.titleCard}
                      color="textSecondary"
                      gutterBottom
                    >
                      Sender
                    </Typography>
                    <Typography variant="h6" component="h2">
                      {data.sender}
                    </Typography>
                    <Typography
                      className={classes.titleCard}
                      color="textSecondary"
                      gutterBottom
                    >
                      Recipient
                    </Typography>
                    <Typography variant="h6" component="h2">
                      {data.recipient}
                    </Typography>
                    <Card>
                      <Typography variant="textSecondary" component="h5">
                        Id: {data.id}
                      </Typography>
                      <Typography variant="textSecondary" component="h5">
                        Date: {data.time}
                      </Typography>
                      <Typography variant="textSecondary" component="h5">
                        Pay In: {data.payIn}
                      </Typography>
                      <Typography variant="textSecondary" component="h5">
                        Pay Out: {data.payOut}
                      </Typography>
                      <Typography variant="textSecondary" component="h5">
                        From Currency: {data.fromCurrency}
                      </Typography>
                      <Typography variant="textSecondary" component="h5">
                        To Currency: {data.toCurrency}
                      </Typography>
                      <Typography variant="textSecondary" component="h5">
                        Status: {data.status}
                      </Typography>
                    </Card>
                  </Card>
                ))}{' '}
            </>
          ) : (
            <>
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
                      <strong>Recipient:</strong>
                    </label>{' '}
                    {currentTransaction.recipient}
                  </div>
                  <div>
                    <label>
                      <strong>Date:</strong>
                    </label>{' '}
                    {currentTransaction.time}
                  </div>
                  <div>
                    <label>
                      <strong>ID:</strong>
                    </label>{' '}
                    {currentTransaction.id}
                  </div>
                  <div>
                    <label>
                      <strong>PayIn:</strong>
                    </label>{' '}
                    {currentTransaction.payIn}
                  </div>
                  <div>
                    <label>
                      <strong>PayOut:</strong>
                    </label>{' '}
                    {currentTransaction.payOut}
                  </div>
                  <div>
                    <label>
                      <strong>Status:</strong>
                    </label>{' '}
                    {currentTransaction.status}
                  </div>
                  <div>
                    <label>
                      <strong>From Currency:</strong>
                    </label>{' '}
                    {currentTransaction.fromCurrency}
                  </div>
                  <div>
                    <label>
                      <strong>To Currency:</strong>
                    </label>{' '}
                    {currentTransaction.toCurrency}
                  </div>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Transaction Made By Customer...</p>
                </div>
              )}
            </>
          )}
        </Typography>
      </main>
    </div>
  );
}
