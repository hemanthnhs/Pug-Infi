import React, {Component} from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
        };
    }

    componentDidMount() {
        fetch('/bomb?count=10')
            .then(res => res.json())
            .then((data) => {
                this.setState({pictures: data["pugs"]})
            })
            .catch(console.log)
    }

    render() {
        var namesList = this.state.pictures.map(function(picture){
            return <img src={picture} className="Pug-img" alt="Pug Image" />
        })

        return (
            <div id = "img-container">
                {namesList}
            </div>
        );
    }
}

export default App;
