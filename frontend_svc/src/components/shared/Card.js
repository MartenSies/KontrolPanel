import React from 'react';


class Card extends React.Component {
  render() {
    let footer = ''
    if (this.props.footer && this.props.footer.length > 0) {
      footer = <div className="card-footer">
        <small className="text-muted">{ this.props.footer }</small>
      </div>
    }

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{ this.props.title }</h5>
          { this.props.body }
          { this.props.button }
        </div>
        { footer }
      </div>
    )
  }
}

export default Card;