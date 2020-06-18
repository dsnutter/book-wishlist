import React from 'react';
import Navigation from './components/navigation';
import BookList from './components/bookList'
import { makeStyles } from '@material-ui/core/styles';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation />
      <div className={classes.container}>
        <BookList />
      </div>
    </div>
  );
}

export default App;

const useStyles = makeStyles({
  root: {
    border: 0,
    textAlign: 'left',
  },
  container: {
    width: '75%',
    margin: '40px 40px 40px 40px',
  }
});