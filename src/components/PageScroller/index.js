import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const previousTouchMove = Symbol();
const scrolling = Symbol();
const wheelScroll = Symbol();
const touchMove = Symbol();
const keyPress = Symbol();
const onWindowResized = Symbol();
const scrollWindowUp = Symbol();
const scrollWindowDown = Symbol();
const setRenderComponents = Symbol();


const ANIMATION_TIMER = 200;
const KEY_UP = 38;
const KEY_DOWN = 40;

export default class ReactPageScroller extends React.Component {
  static propTypes = {
    animationTimer: PropTypes.number,
    transitionTimingFunction: PropTypes.string,
    pageOnChange: PropTypes.func,
    scrollUnavailable: PropTypes.func,
    containerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    containerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    blockScrollUp: PropTypes.bool,
    blockScrollDown: PropTypes.bool
  };

  static defaultProps = {
    animationTimer: 1000,
    transitionTimingFunction: 'ease-in-out',
    containerHeight: '100vh',
    containerWidth: '100vw',
    blockScrollUp: false,
    blockScrollDown: false
  };

  constructor(props) {
    super(props);
    this.state = { componentIndex: 0, componentsToRenderLength: props.children.length };
    this[previousTouchMove] = null;
    this[scrolling] = false;
  }

  componentDidMount = () => {
    window.addEventListener('resize', this[onWindowResized]);

    document.ontouchmove = (event) => {
      event.preventDefault();
    };

    this._pageContainer.addEventListener('touchmove', this[touchMove]);
    this._pageContainer.addEventListener('keydown', this[keyPress]);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this[onWindowResized]);

    this._pageContainer.removeEventListener('touchmove', this[touchMove]);
    this._pageContainer.removeEventListener('keydown', this[keyPress]);
  };

  render() {
    const { animationTimer, transitionTimingFunction, containerHeight, containerWidth } = this.props;

    return (
      <div style={{ height: containerHeight, width: containerWidth, overflow: 'hidden' }}>
        <div ref={c => this._pageContainer = c}
          onWheel={this[wheelScroll]}
          style={{
            height: '100%',
            width: '100%',
            transition: `transform ${animationTimer}ms ${transitionTimingFunction}`
          }}
        >
          {this[setRenderComponents]()}
        </div>
      </div>
    );
  }

  [wheelScroll] = (event) => {
    if (event.deltaY < 0) {
      this[scrollWindowUp]();
    } else {
      this[scrollWindowDown]();
    }
  };

  [touchMove] = (event) => {
    if (!_.isNull(this[previousTouchMove])) {
      if (event.touches[0].clientY > this[previousTouchMove]) {
        this[scrollWindowUp]();
      } else {
        this[scrollWindowDown]();
      }
    } else {
      this[previousTouchMove] = event.touches[0].clientY;
    }
  };

  [keyPress] = (event) => {
    if (_.isEqual(event.keyCode, KEY_UP)) {
      this[scrollWindowUp]();
    }
    if (_.isEqual(event.keyCode, KEY_DOWN)) {
      this[scrollWindowDown]();
    }
  };

  [onWindowResized] = () => {
    this.forceUpdate();
  };

  renderChildComponent(childComponent, index) {
    const classes = index === 0 ? 'slide-hero is-visible' : 'slide-hero';
    return (
      <div key={index} ref={c => this['container_' + index] = c}
        style={{ height: '100%', width: '100%' }}
        className={classes}
      >
        {childComponent}
      </div>
    );
  }

  [setRenderComponents] = () => {
    let newComponentsToRender = [];

    newComponentsToRender = React.Children.map(
      this.props.children, this.renderChildComponent.bind(this)
    );

    return newComponentsToRender;
  };

  scrollWindowFromTo = (oldIndex, newActiveIndex) => {
    const activeSlide = this['container_' + (newActiveIndex)];
    const oldSlide = this['container_' + (oldIndex)];

    if (!_.isNil(activeSlide)) {
      this[scrolling] = true;
      oldSlide.classList.remove('is-visible');
      activeSlide.classList.add('is-visible');

      if (this.props.pageOnChange) {
        this.props.pageOnChange(this.state.componentIndex);
      }

      setTimeout(() => {
        this.setState((prevState) => ({ componentIndex: newActiveIndex }), () => {
          this[scrolling] = false;
          this[previousTouchMove] = null;
        });
      }, this.props.animationTimer + ANIMATION_TIMER);

    } else if (this.props.scrollUnavailable) {
      this.props.scrollUnavailable();
    }
  }

  [scrollWindowUp] = () => {
    const oldIndex = this.state.componentIndex;
    const newActiveIndex = oldIndex - 1;

    if (!this[scrolling] && !this.props.blockScrollUp) {
      this.scrollWindowFromTo(oldIndex, newActiveIndex);
    }
  };

  [scrollWindowDown] = () => {
    const oldIndex = this.state.componentIndex;
    const newActiveIndex = oldIndex + 1;

    if (!this[scrolling] && !this.props.blockScrollDown) {
      if (!this[scrolling] && !this.props.blockScrollUp) {
        this.scrollWindowFromTo(oldIndex, newActiveIndex);
      }
    }
  };
}
