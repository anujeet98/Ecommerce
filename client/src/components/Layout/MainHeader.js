// import CartButton from '../../../../../REACT/ReduxCart/src/components/Cart/CartButton';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <h1>MERN Ecomm</h1>
      <nav>
        <ul>
          <li>
            <span style={{color: 'white'}}>Cart</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
