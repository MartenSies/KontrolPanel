import React from 'react';


class FormGroup extends React.Component {
  render() {
    return <div className="form-group">
    	{this.props.children}
	</div>
  }
}

export default FormGroup;