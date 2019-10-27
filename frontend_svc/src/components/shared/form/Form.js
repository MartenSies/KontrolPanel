import React from 'react';


class Form extends React.Component {
  render() {
    return <form>{this.props.children}</form>
  }
}

export default Form;