import React, {Component} from 'react';
import $ from 'jquery';
import './App.css';
import Modal from "./Modal";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 10,
            height: 10,
            show: false,
            displayImg: null,
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

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    componentDidMount() {
        this.fetchPugs();
        this.setState({width: window.innerWidth, height: window.innerHeight});
        window.addEventListener("scroll", (e) => this.scrollEvent(e));
        window.addEventListener("resize", (e) => this.windowResize(e));
        window.addEventListener('mousedown', this.handleClickOutside);

    }

    windowResize() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    scrollEvent() {
        // Attribution - Reference from Bits and Pieces article
        let lastLi = $("ul#img-container > li:last-child")[0];
        let lastLiOffset = lastLi.offsetLeft + lastLi.clientWidth;
        let pageOffset = window.pageXOffset + window.innerWidth;
        if (pageOffset >= lastLiOffset - 2) {
            this.fetchPugs();
        }
    }

    handleClickOutside = (event) => {
        if (event.target.tagName == 'DIV') {
            this.hideModal()
        }
    }

    showModal = (ev) => {
        this.setState({show: true, displayImg: ev.target});
        console.log(ev.target)
    };

    hideModal = () => {
        this.setState({show: false});
    };

    render() {
        var that = this;
        var picsList = this.state.pictures.map(function (picture, index) {
            return <li key={index}><img src={picture} className="Pug-img" alt="Pug"
                                        style={{
                                            maxHeight: 0.65 * that.state.height,
                                            maxWidth: 0.9 * that.state.width
                                        }} onClick={that.showModal}
            /></li>
        })

        return (
            <div>
                <ul id="img-container">
                    {picsList}
                </ul>
                <div id={this.state.show ? 'modal-container' : ''} ref={this.setWrapperRef()}>
                    <Modal show={this.state.show} img={this.state.displayImg}/>
                </div>
            </div>
        );
    }
}

export default App;
