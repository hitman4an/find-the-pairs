import React, { Component } from 'react';

import './field.css';

export default class Field extends Component {

counter = 0;
resultsArray = [];
blockInput = false;

onStartGame = (e) => {
    e.preventDefault();
    const { curTime } = this.props;
    this.props.startStopGame(curTime);
}



shuffle(array){
    for(let j, x, i = array.length; 
            i; j = Math.floor(Math.random() * i), x = array[--i],   
                    array[i] = array[j], array[j] = x);
    return array;
    }

// Создаем массив картинок

createArray(blocks, tokens) {
    let imagesArray = [];
    
    //Количество картинок
    const imagesQnt = Math.pow(blocks, 2)/tokens;
    
    //Дублируем картинки по количеству повторных
    for (let i=1; i<= tokens; i++)
        for (let j=1; j <= imagesQnt ; j++) 
            imagesArray.push(j);
    
    // Перемешиваем картинки
        
    imagesArray = this.shuffle(imagesArray);
    
    return imagesArray;
}

// Проверка нажатой картинки

checkImage = (e) => {
    // Если игра не начата и ввод заблокирован ничего не делаем
    if (!this.props.play || this.blockInput) return;

    // Если картника не перевернута и не отработана
    if (e.target.className !== 'flipped' && e.target.className !== 'correct') {
        e.target.className = 'flipped';
        
        // Получаем id картинки и записываем в массив результатов
        const result = e.target.dataset.item;
        this.resultsArray.push(result);
      
    }
    
    // Если открыто N картинок
    // eslint-disable-next-line
    if (this.resultsArray.length == this.props.tokens) {

    // блокируем ввод
    this.blockInput = true;
    
    // Проверяем открытые картинки

    for (let i=0; i < this.resultsArray.length-1; i++) {

        // Если картинки одинаковые, продолжаем цикл
        if (this.resultsArray[i] === this.resultsArray[i+1]) {
            continue;
        }

        // Если есть хоть одно не совпадение переворачиваем картинки и очищаем массив            
        else {
            this.checkClass("reverse");
            this.resultsArray = [];
            return;
        }
    
    }

    // Если все картинки совпадают, убираем их с поля.
    
         this.checkClass("correct");
        
        // Увеличиваем счетчик найденных картинок и проверяем кол-во
        this.counter++;
            if(this.counter === this.props.endCount) {
                alert("You won!!!");
                this.props.startStopGame(this.props.curTime);              
            }
        this.resultsArray = [];
    }

       
}


// Процедура изменения классов полей
//____________________________________________
// flipped = перевернутая картинка
// reverse = не перевернутая картинка
// correct = отработанная картинка (угаданная)
checkClass = (className) => {

    // Находим перевернутые картинки
    const x = document.getElementsByClassName('flipped');

    setTimeout(() => {

      for(let i = (x.length - 1); i >= 0; i--) {
        x[i].className = className;
      }

      // Разблокируем ввод
      this.blockInput = false;
  
    }, 1000);
  
  }

    render() {

        // размер поля для стиля
        const size = this.props.blocks;

        console.log('size', size);
        console.log('endCount', this.props.endCount);


        // Создаем картинки
        const cards = this.createArray(this.props.blocks, this.props.tokens);

        const field = cards.map((item, index) => {
            return (
                <div data-item={item} key={index}
                    data-view="card" className="reverse"
                    onClick={this.checkImage}></div>
            )
        });


        return (
        <div>
            <form>
                <button className="btn btn-primary mr-4"
                onClick={this.onStartGame}>{this.props.btitle}</button>

                <button className="btn btn-primary" type="submit"
                onClick={this.onReset}>Сброс</button>
            </form>

            <div className={`field${size} mt-4`}>
                {field}
            </div>
            
        </div>
        )
    }
}