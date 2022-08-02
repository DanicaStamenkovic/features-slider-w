import sliderData from '../sliderData';
import { useRef, useEffect } from 'react';

const SliderText = ({ activeIndex }) => {
  const textWrapperRef = useRef(null);

  if (textWrapperRef.current) {
    textWrapperRef.current.querySelector('.caption-text.active').style.opacity = 0;
  }

  useEffect(() => {
      textWrapperRef.current.style.height = textWrapperRef.current.querySelector('.caption-text.active').clientHeight + 'px'
      setTimeout(() => {
        textWrapperRef.current.querySelector('.caption-text.active').style.opacity = 1;
      }, 300)
  })

  const cardText = sliderData.data.map((image, index) => {
    return (
      <h4 key={index} className={activeIndex ===  index ? "caption-text active" : "caption-text"}>{image.caption}</h4>
    );
  });

  return (
    <div className="caption-card" id="card" ref={textWrapperRef} >
        {cardText}
    </div>
  )
}

export default SliderText