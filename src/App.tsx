import React from 'react';
import './App.scss';
import AddColor from './components/AddColor/AddColor';
import ColorList from './components/ColorList/ColorList';
import FilterColors from './components/FilterColors/FilterColors';

class App extends React.Component {
  constructor(){
    super()
    this.colors = []
    this.addColor = this.addColor.bind(this);
  }
  addColor(color:string){
    this.setState({
      colors: [...this.colors, color]
    })
  }
  render(){
    return (
      <>
      <AddColor/>
      <FilterColors />
      <ColorList />
      </>
    );
  }
}

export default App;
