import { changeTranslate } from '../../utils/utils';

const SliderDots = ({setActiveIndex, sliderRef, sliderWidth, activeIndex, length}) => {
    const moveDot = (index) => {
        setActiveIndex(index)
        changeTranslate(sliderRef.current, (index  * sliderWidth) , 'negative');
        sliderRef.current.style.pointerEvents = "none";
    }

    return (
        <>
            <ul className="container-dots">
                {Array.from({length: length}).map((item, index) => (
                    <li
                    key={index}
                    onClick={() => moveDot(index)}
                    className={activeIndex === index ? "dot active" : "dot"}
                    ></li>
                ))}
            </ul>
        </>
    )
}

export default SliderDots