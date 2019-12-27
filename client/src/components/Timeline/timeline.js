import React from 'react';
import TimelineEvent from './timeline.event';
import * as _ from 'lodash';
import './timeline.styles.scss';


const defaultProps = {
  events: [],
  lineWidth: '100%',
}

class Timeline extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      ...defaultProps,
      ...props,
    };
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    this.containerRef.current.onscroll = _.throttle(this.onScroll, 1000);
    this.setState({
      lineWidth: this.lineWidth
    })
  }

  get lineWidth() {
    const len = this.containerRef.current.scrollWidth;
    return `${len}px`;
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({ 
      ...nextProps,
      lineWidth: this.lineWidth
    });
  }

  onScroll(event) {
    console.log(event)
  }

  render() {
    const { events } = this.state;
    return (
      <div className="timeline-container" ref={this.containerRef}>
        <div className="timeline" style={{ width: this.state.lineWidth }}></div>
        { events.map(event => <TimelineEvent event={ event }></TimelineEvent>) }
      </div>
    )
  }
}

export default Timeline;
