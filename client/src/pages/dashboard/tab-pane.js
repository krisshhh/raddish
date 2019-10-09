import React, { Component } from 'react'
import { connect } from "react-redux";
import TapForm from '../../components/TapForm';
import { setTapDetails } from '../../actions/dashboard.actions';

const mapStateToProps = ({ dashboard }) => {
  const { activeTab, rabbitmq} = dashboard;
  const tab = dashboard.tabs[activeTab];
  return { tab, rabbitmq  };
};

function mapDispatchToProps(dispatch) {
  return {
    setTapDetails: form => dispatch(setTapDetails(form))
  };
}

class TabPaneComponent extends Component {

    constructor(props, context){
        super(props, context)
        this.state = { 
            ...props
        }
        this.formChange = this.formChange.bind(this);
    }

    formChange({ exchange, bindingKey }) {
      this.props.setTapDetails({ exchange, bindingKey });
    }

    render() {
      const { tab, rabbitmq } = this.state;
      return <>
        <TapForm tab={ tab } rabbitmq={ rabbitmq } formChange={ this.formChange } ></TapForm>
      </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabPaneComponent);
