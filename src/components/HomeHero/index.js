import React from 'react';
import css from './styles.scss';
import propTypes from 'prop-types';

class HomeHero extends React.Component {
  render() {
    const bgImageInlineStyle = { backgroundImage: `url(${this.props.imageSrc})` };

    return (
      <div ref="$component" className={css.component} style={ bgImageInlineStyle }>
        coucou
      </div>
    );
  }
};

HomeHero.propTypes = {
  imageSrc: propTypes.string.isRequired
};

HomeHero.defaultProps = {};

export default HomeHero;
