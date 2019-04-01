import React, { Component } from 'react';

export default class Timer extends Component {
       
    state = {
        curTime: '0:00:00'
    }

    componentDidMount() {
        if (this.props.timer) this.Interval = setInterval(this.startTimer, 10);
        else clearInterval(this.Interval);
        }

    startTimer = () => {       
        
        let minutes = Number(this.state.curTime.substring(0,1));
        let seconds = Number(this.state.curTime.substring(2,4));
        let tens = Number(this.state.curTime.substring(5,7));
    
        let textseconds;
        let texttens;
    
        tens++;
      
        if(tens <= 9){
            texttens = "0" + tens;
        }
      
        if (tens > 9){
            texttens = tens;
        }
        
      
        if (tens > 99) {
            seconds++;
            tens = 0;
            texttens = "00";
            textseconds = seconds;
        }
    
        if(seconds <= 9){
            textseconds = "0" + seconds;
        }
        
       
        if (seconds > 9){
          textseconds = seconds;
        }
    
        if (seconds > 59) {
            minutes++;
            seconds = 0;
            textseconds = "00";
        }
        
        const curTime = `${minutes}:${textseconds}:${texttens}`; 
    
        this.setState({curTime});
      
      }
    


    render () {

        return (
            <p>Время: {this.state.curTime}</p>
        )
    }
}