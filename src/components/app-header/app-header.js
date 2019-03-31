import React, {Component} from 'react';


export default class AppHeader extends Component {
    state = {
        curTime: '0:00:00'
     }


 
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.props.onChangeField(name, value);
    }

    render() {

        const { blocks, tokens } = this.props;

    return (
        <div className="app-header">
            <h2 className="mb-4">Найди одинаковые картинки</h2>
            
            <form>
                <div className="form-group row mx-0">
                    <label className="col-form-label col-sm-4 text-right">Размер поля</label>
                        <div className="col-sm-3">
                        <select defaultValue={blocks} name="blocks"
                            className="form-control col-sm-6" 
                            onChange={this.handleUserInput}>
                            <option value="6">6x6</option>
                            <option value="8">8x8</option>
                            <option value="9">9x9</option>
                            <option value="10">10x10</option>
                            <option value="12">12x12</option>
                        </select>
                        </div>
                </div>
                <div className="form-group row mx-0">
                    <label className="col-form-label col-sm-4 text-right">Кол-во одинаковых блоков</label>
                        <div className="col-sm-2">
                            <Select blocks={blocks} tokens={tokens}
                                handleUserInput={this.handleUserInput} />
                        </div>
                </div>
            </form> 

        </div>

        )
    }
}

// Возвращаем варианты выбора количества одинаковых картинок
const Select = ({blocks, tokens, handleUserInput}) => {
    
    switch (blocks) {
        case "6": return(
            <select defaultValue={tokens} name="tokens"
                        className="form-control col-sm-6" 
                        onChange={handleUserInput}>
            
                <option value="2">2</option>
                <option value="3">3</option>            
            </select>
        )

        case "8": return(
            <select defaultValue={tokens} name="tokens"
                        className="form-control col-sm-6" 
                        onChange={handleUserInput}>
            
                <option value="2">2</option>
            </select>
        )

        case "9": return(
            <select defaultValue={tokens} name="tokens"
                        className="form-control col-sm-6" 
                        onChange={handleUserInput}>
            
                <option value="3">3</option>            
            </select>
        )

        case "10": return(
            <select defaultValue={tokens} name="tokens"
                        className="form-control col-sm-6" 
                        onChange={handleUserInput}>
            
                <option value="2">2</option>
                <option value="4">4</option>            
            </select>
        )

        case "12": return(
            <select defaultValue={tokens} name="tokens"
                        className="form-control col-sm-6" 
                        onChange={handleUserInput}>
            
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>              
            </select>
        )
        default:
        return (<p className="text-danger">Error!!!</p>)


    }
}