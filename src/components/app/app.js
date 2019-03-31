import React, { Component } from 'react';
import AppHeader from '../app-header';
import Field from '../field';
import Timer from '../timer';


import './app.css';

class App extends Component {
  state = {
    gameOn : false, // Игра началась?
    blocks : "8", // Размер поля
    tokens : "2", // Количество одинаковых картинок
    buttonTitle: 'Начать игру', // Название кнопки
    pausedTime: '0:00:00', // Время паузы
  }

  // Начало игры или пауза
  startStopGame = () => {
    let title;
    if (this.state.buttonTitle === 'Начать игру') 
      title = 'Пауза'
    else title = 'Начать игру';

    this.setState({gameOn : !this.state.gameOn,
                  buttonTitle: title,
              });
  }

  // Записываем время паузы
  setPausedTime = (pausedTime) => {
    this.setState({pausedTime});
  }

  changeField = (name, value) => {

    // Если меняем размер поля
    if (name === "blocks") {
      // Устанавливаем количество одинаковых картинок по-умолчанию
      switch (value) {
        case "6" :
        case "8" :
        case "10" :
        case "12" :
        this.setState({
          [name]: value,
          tokens: "2"
        })
        break;
        case "9" :
        this.setState({
          [name]: value,
          tokens: "3"
        })
        break;
        default: return
      }
    }
    // Иначе меняем количество картинок
    else this.setState({[name]: value});
  }
   
  render() {

    console.log(this.state.blocks);

    const {gameOn, blocks, tokens, buttonTitle, pausedTime} = this.state;

    // Количество пар
    const endCount = Math.pow(blocks, 2)/tokens

    let timer;
    let header;

    // Если игра началась, отрисовываем таймер
    if (gameOn) {
      timer = <Timer timer={gameOn} pausedTime={pausedTime}
      newPausedTime={this.setPausedTime}/>;
      header = <h2>Игра началась!</h2>      
    }
    // Иначе отрисовываем время паузы и настройки  
    else {
      timer = <p>Время: {pausedTime}</p>
      header = <AppHeader 
                onChangeField={this.changeField} blocks={blocks} tokens={tokens}/>;
    }

    return (
      <div className="App">
          
          {header}
          
          {timer}

          <Field play={gameOn} blocks={blocks} tokens={tokens}
            btitle={buttonTitle} endCount={endCount}
            startStopGame={this.startStopGame}/>        
      </div>
    );
  }
}

export default App;
