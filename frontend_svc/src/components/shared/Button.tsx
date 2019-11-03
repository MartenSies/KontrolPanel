import * as React from 'react';

interface ButtonProps {
  styleName?: string,
  isSecondary?: boolean,
  isPrimary?: boolean,
  isDanger?: boolean,
  dismissModal?: boolean,
  onClick?: () => void,
}

class Button extends React.Component<ButtonProps> {
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
    if (this.props.onClick) {
      extraAttrs['onClick'] = this.props.onClick;
    }
    return <button type="button" {...extraAttrs}>
      {this.props.children}
    </button>
  }
}

export default Button;