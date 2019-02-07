import React from 'react';
import css from './styles.scss';
import HomeHero from '../HomeHero';

const LayoutIndex = (props) => {
  return (
    <div className={css.component}>
      <HomeHero
        imageSrc={}
      />
      <CountryHero
        imageSrc={}
      />
    </div>
  );
};

export default LayoutIndex;
