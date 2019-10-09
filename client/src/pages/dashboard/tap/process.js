import React, { Component } from "react";

class PublishProcessComponent extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick() {
        alert('hit');
    }

    render() {
        return (
            <p>Publish Process</p>
        )
    }
}

export default PublishProcessComponent;
