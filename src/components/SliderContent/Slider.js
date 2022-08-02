import { useState } from 'react';
import './../../assets/scss/slides.scss'
import SliderText from './SliderText';
import SliderWrapper from './SliderWrapper';
import SliderHeader from './SliderHeader';

const Slider = ({ autoplay, arrows, sliderDirection, sliderData }) => {
    const length = sliderData.data.length;

    let [ activeIndex, setActiveIndex ] = useState(0);

    const slides = sliderData.data.map((image, index) => {
        return (
            <div 
            className={activeIndex ===  index ? "slide active" : "slide"}
            key={image.key}>
                <img src={image.src} alt={image.alt} draggable="false" />
            </div>
        );
    });

    return (
        <div className={"slider " + sliderDirection}>
            <SliderHeader sliderDirection={sliderDirection}/>
            <div className="slider-container">
                <div className="row">
                    <SliderText activeIndex={activeIndex} />
                    <div className="pagination-indicator">
                        <span className="pagination-indicator__current"> 0{activeIndex+1} </span>
                        /
                        <span className="pagination-indicator__all"> 0{length}</span>
                    </div>
                    <SliderWrapper 
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        length={length}
                        arrows={arrows}
                        autoplay={autoplay}>
                        {slides}
                    </SliderWrapper>
                </div>
            </div>
        </div>
    )
}

export default Slider