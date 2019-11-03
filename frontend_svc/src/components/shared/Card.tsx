import * as React from 'react';

interface CardProps {
  title: string,
  body: JSX.Element,
  button?: JSX.Element,
  footer?: string,
  image?: string,
}

class Card extends React.Component<CardProps> {
  render() {
    let footer: JSX.Element = <div></div>;
    if (this.props.footer && this.props.footer.length > 0) {
      footer = <div className="card-footer">
        <small className="text-muted">{ this.props.footer }</small>
      </div>
    }

    let image: JSX.Element = <div></div>;
    if (this.props.image) {
      image = <img src={require("../../assets/" + (this.props.image))} alt="" className="card-img-top" style={{maxHeight: '250px' }} />
    }

    return (
      <div className="card">
        { image }
        <div className="card-body">
          <h6 className="card-title">{ this.props.title }</h6>
          { this.props.body }
          { this.props.button }
        </div>
        { footer }
      </div>
    )
  }
}

export default Card;
