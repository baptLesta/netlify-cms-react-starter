import React from 'react';
import css from './styles.scss';
import propTypes from 'prop-types';

const HomeHero = props => {
  const bgImageInlineStyle = { backgroundImage: `url(${props.imageSrc})` };

  return (
    <div className={css.component} style={ bgImageInlineStyle }>
      coucou
    </div>
  );
};

HomeHero.propTypes = {
  imageSrc: propTypes.string.isRequired
};

HomeHero.defaultProps = {};

export default HomeHero;
