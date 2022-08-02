import { Button } from 'reactstrap';

const SliderButtons = ({ direction, moveSlide }) => {
  return (
    <Button
        onClick={moveSlide}
        className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
        {direction === "next" ? <>&#10509;</> : <>&#10510;</>}
    </Button>
  )
}

export default SliderButtons;