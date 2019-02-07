import React from 'react';
import css from './styles.scss';
import propTypes from 'prop-types';

const CountryHero = props => {
  const bgImageInlineStyle = { backgroundImage: `url(${props.imageSrc})` };

  return (
    <div className={css.component} style={ bgImageInlineStyle }>
      coucou
    </div>
  );
};

CountryHero.propTypes = {
  imageSrc: propTypes.string.isRequired
};

CountryHero.defaultProps = {};

export default CountryHero;
