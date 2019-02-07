import React from 'react';
import HomeHero from '../HomeHero';
import CountryHero  from '../CountryHero';
import PageScroller from '../PageScroller';

const LayoutIndex = (props) => {
  const {
    home,
    countries
  } = props;

  const CountriesHero = countries.map( (country, i) => (
    <CountryHero
      className='section'
      imageSrc={country.imageCover}
      key={i} />
  ));

  return (
    <div>
      <PageScroller>
        <HomeHero
          className='section'
          imageSrc={home.imageCover}
        />
        {CountriesHero}
      </PageScroller>
    </div>
  );
};

export default LayoutIndex;
