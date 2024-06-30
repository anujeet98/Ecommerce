import { Fragment } from 'react';
import MainHeader from './MainHeader';
import classes from './Layout.module.css'

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <div className={classes.backdrop}>
        <main>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
