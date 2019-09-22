import React, {Component} from 'react';
import $ from 'jquery';
import './App.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
        };
    }

    fetchPugs() {
        fetch('/bomb?count=10')
            .then(res => res.json())
            .then((data) => {
                this.setState({pictures: [...this.state.pictures, ...data["pugs"]]})
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.fetchPugs();
        window.addEventListener("scroll", (e) => this.scrollEvent(e));
    }

    scrollEvent() {
        // Attribution - Reference from Bits and Pieces article
        let lastLi = $("ul#img-container > li:last-child")[0];
        let lastLiOffset = lastLi.offsetLeft + lastLi.clientWidth;
        let pageOffset = window.pageXOffset + window.innerWidth;
        if (pageOffset > lastLiOffset) {
            this.fetchPugs();
        }
    }

    render() {
        var picsList = this.state.pictures.map(function (picture, index) {
            return <li key={index}><img src={picture} className="Pug-img" alt="Pug Image"/></li>
        })

        return (
            <ul id="img-container">
                {picsList}
            </ul>
        );
    }
}

export default App;
