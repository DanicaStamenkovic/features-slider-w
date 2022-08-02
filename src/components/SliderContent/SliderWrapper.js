import { useRef, useEffect, useState, useCallback } from 'react';
import { changeTranslate, getClientXEvent, catchActiveSlider } from '../../utils/utils';
import SliderButtons from '../Pagination/SliderArrows';
import SliderDots from '../Pagination/SliderDots';

const SliderWrapper = ({ activeIndex, setActiveIndex, length, arrows, autoplay, children }) => {
    const sliderRef = useRef(null);
    const [ sliderWidth, setSliderWidth ] = useState(null);
    const [ onTouchPosition, setOnTouchPosition ] = useState(null);
    const [ onSwipe, setOnSwipe ] = useState(0);
    const [ currentTouchPosition, setCurrentTouchPosition ] = useState(0);

    const next = useCallback(() => {
        if (activeIndex === length - 1) {
            setActiveIndex(0);
            changeTranslate(sliderRef.current, 0 , 'negative');
        } else {
            setActiveIndex(activeIndex + 1);
            changeTranslate(sliderRef.current, ((activeIndex + 1) * sliderWidth) , 'negative');
        }

        sliderRef.current.style.pointerEvents = "none";
    },[activeIndex, length, setActiveIndex, sliderWidth])

    const prev = () => {
        if (activeIndex === 0) {
            setActiveIndex(length - 1);
            changeTranslate(sliderRef.current, ((length - 1) * sliderWidth) , 'negative');
        } else {
            setActiveIndex(activeIndex - 1);
            changeTranslate(sliderRef.current, ((activeIndex - 1) * sliderWidth) , 'negative');
        }

        sliderRef.current.style.pointerEvents = "none";
    };

    useEffect(() => {
        setSliderWidth(sliderRef.current.offsetWidth);

        if ( autoplay === 'true' ) {
            const intervalId = setInterval(() => {
                next();
            }, 3000);
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [setSliderWidth, autoplay, next])

    const onTouch = (e) => {
        const getStyle = window.getComputedStyle(sliderRef.current)
        const translateX = new DOMMatrixReadOnly(getStyle.transform)
        sliderRef.current.style.pointerEvents = "auto";

        setOnTouchPosition({
            event: getClientXEvent(e),
            transformTranslate: translateX.m41,
        });

        setOnSwipe(getClientXEvent(e));
    }

    const onTouchMove = (e) => {
        e.preventDefault();
        setOnSwipe(getClientXEvent(e));

        if (onTouchPosition === null) {
            return;
        }

        const swipeRes = onSwipe;
        setCurrentTouchPosition(swipeRes - getClientXEvent(e));

        const translateValue = onTouchPosition.transformTranslate + (getClientXEvent(e) - onTouchPosition.event)
        changeTranslate(sliderRef.current, translateValue , 'positive');
    }

    const onTouchEnd = (e) => {
        if(!onTouchPosition) {
            return
        }

        catchActiveSlider(currentTouchPosition, length, setActiveIndex, sliderWidth, activeIndex, sliderRef);
        setOnTouchPosition(null)
    }

    return (
        <div 
            className='slider-box'
            onMouseDown={onTouch}
            onTouchStart={onTouch}>
            <div 
                className="slider-wrapper" 
                ref={sliderRef}
                onMouseMove={onTouchMove}
                onMouseLeave={onTouchEnd}
                onMouseUp={onTouchEnd}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}>
                {children} 
            </div>
            { arrows === 'true' && <SliderButtons moveSlide={prev} direction={"prev"}/>}
            { arrows === 'true' && <SliderButtons moveSlide={next} direction={"next"} />}
            <SliderDots 
                setActiveIndex={setActiveIndex}
                sliderRef={sliderRef}
                sliderWidth={sliderWidth}
                activeIndex={activeIndex}
                length={length}
            />
        </div>
    );
}

export default SliderWrapper