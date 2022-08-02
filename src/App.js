import Slider from "./components/SliderContent/Slider";
import SliderData from './components/sliderData';
import './App.css';

function App() {

  return (
    <div className="App">
      <Slider autoplay={'true'} arrows={'false'} sliderDirection={"center"} sliderData={SliderData}/>
      <Slider autoplay={'false'} arrows={'true'} sliderDirection={"left"} sliderData={SliderData} />
      <Slider autoplay={'true'} arrows={'false'} sliderDirection={"right"} sliderData={SliderData}/>
    </div>
  );
}

export default App;
