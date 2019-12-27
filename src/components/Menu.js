import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

const Menu = props => {
  return (
    <nav className='nav-wrapper green'>
      <div className='container' style={{ marginRight: 10 }}>
        <Link to='/' className='brand-logo center'>
          Spożywczak
        </Link>
        <ul className='right'>
          <li key='Management'>
            <Link to='/manage'>Management</Link>
          </li>
          <li key='Orders'>
            <Link to='/orders'>Zamówienia</Link>
          </li>
          <li key='Cart'>
            <Link to='/cart'>
              <i className='material-icons'>shopping_basket</i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
