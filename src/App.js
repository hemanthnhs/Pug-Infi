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

    fetchNewData() {
        this.fetchPugs();
        console.log("hola");
    };

    componentDidMount() {
        this.fetchPugs();
        window.addEventListener("scroll", (e) => this.scrollEvent(e));
    }

    scrollEvent() {
        // Attribution - Reference from Bits and Pieces article
        var lastLi = document.querySelector("ul#img-container > li:last-child");
        var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        var pageOffset = window.pageYOffset + window.innerHeight;
        if (pageOffset > lastLiOffset) {
            this.fetchNewData();
        }
    }

    render() {
        var picsList = this.state.pictures.map(function (picture) {
            return <li><img src={picture} className="Pug-img" alt="Pug Image"/></li>
        })

        return (
            <ul id="img-container">
                {picsList}
            </ul>
        );
    }
}

export default App;
