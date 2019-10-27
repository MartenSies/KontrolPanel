import React from 'react';

class Button extends React.Component {
  extraClassNames() {
  	var classNames = this.props.styleName ? 'btn ' + this.props.styleName : 'btn';
  	if (this.props.isSecondary) {
  		classNames += ' btn-secondary';
  	} else if (this.props.isPrimary) {
  		classNames += ' btn-primary';
  	} else if (this.props.isDanger) {
  		classNames += ' btn-danger';
  	}
  	return classNames;
  }

  render() {
    var extraAttrs = this.props.dismissModal ? {'data-dismiss': 'modal'} : {};
    extraAttrs['className'] = this.extraClassNames();
    extraAttrs['onClick'] = this.props.onClick ? this.props.onClick : '';
    return <button type="button" {...extraAttrs}>
      {this.props.children}
    </button>
  }
}

export default Button;