export function changeTranslate(element, newTranslate, operation) { 
    if ( operation === 'positive') {
        element.style.cssText = `
            transform: translateX(${newTranslate}px);
            transition: transform 0s;
            `;
    }

    if ( operation === 'negative' ) {
        element.style.cssText = `
        transform: translateX(${-newTranslate}px);
        `;
    }
}

export function getClientXEvent(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

export const catchActiveSlider = (currentTouchPosition, length, setActiveIndex, sliderWidth, activeIndex, sliderRef) => {
    let activeElement;
    let translateValue;

    Math.abs(currentTouchPosition) > 5 && (activeIndex += Math.sign(currentTouchPosition));
    if ( activeIndex === length ) {
        activeElement = 0;
    } else if (activeIndex < 0) {
        activeElement = length - 1;
        translateValue = ((length - 1) * sliderWidth);
    } else {
        activeElement = activeIndex;
        translateValue = Math.min((sliderWidth * activeElement), sliderWidth * (length - 1));
    }

    setActiveIndex(activeElement);
    changeTranslate(sliderRef.current, translateValue, 'negative');
}