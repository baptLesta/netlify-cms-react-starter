import React from 'react';
import css from './styles.scss';
import propTypes from 'prop-types';

const TestComponent = props => {
  return (
    <div className={css.component}>
      coucou
    </div>
  );
};

TestComponent.propTypes = {};
TestComponent.defaultProps = {};

export default TestComponent;
