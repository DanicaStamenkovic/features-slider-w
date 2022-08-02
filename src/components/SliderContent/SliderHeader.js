import sliderData from '../sliderData';
import { useEffect, useState, useRef } from 'react';

const SliderHeader = ({ sliderDirection }) => {
  const purpleLineRef = useRef(null);
  const [ isInViewport, setIsinViewport ] = useState(false);

  const callbackFunction = ([entry]) => {
    setIsinViewport(entry.isIntersecting);
  }

  useEffect(() => {
    const purpleLineRefCurrent = purpleLineRef.current;
    if (purpleLineRefCurrent) {
      const observer = new IntersectionObserver(callbackFunction);
      observer.observe(purpleLineRefCurrent)

      return () => {
          observer.unobserve(purpleLineRefCurrent)
      }
    }
  }, [purpleLineRef])

  return (
    <div className={sliderDirection === "left" ? "slider-header left" : sliderDirection === "right" ? "slider-header right" : "slider-header center"} >
        <span className='slider-header__tag'>{ sliderData.header.tag }</span>
        <h2 className='slider-header__title'>
          { sliderData.header.title }
          <span ref={purpleLineRef} className={isInViewport ? "purple-line inView" : "purple-line"}></span>
        </h2>
        <p className='slider-header__subtitle'>{ sliderData.header.subtitle }</p>
    </div>
  )
}

export default SliderHeader