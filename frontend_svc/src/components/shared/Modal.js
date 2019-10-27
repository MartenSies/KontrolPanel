import React from 'react';


class Modal extends React.Component {
  render() {
    return <div id={this.props.id} className="modal fade">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{this.props.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{this.props.body}</div>
          <div className="modal-footer justify-content-between">
            <div>{this.props.footerLeft}</div>
            <div>{this.props.footerRight}</div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Modal;