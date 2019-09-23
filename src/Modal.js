import React from "react";
import "./Modal.css";

export default class Modal extends React.Component {
    render() {
        if (!this.props.show) {
            return null;
        }

        return <div id="modal"><img id="img-popup" src={this.props.img.src} alt="Pug"/></div>;
    }
}