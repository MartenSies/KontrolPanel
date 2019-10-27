import React from 'react';
import ExposePort from './ExposePort';


class ExposeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      container: this.props.container
    };
    this.execute = this.execute.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ container: nextProps.container });
  }

  execute(deployment_name, namespace) {
    this.state.container.ports.forEach((port) => {
      port.localPortRef.current.execute(deployment_name, namespace);
    })
  }

  render() {
    var container = this.state.container;
    return (
      <div>
        <label className="col-form-label">{container.name}</label>
        { container.ports && container.ports.map((port, pi) => {
          return <ExposePort
            key={pi}
            labels={this.props.labels}
            containerName={container.name}
            localPort={port.localPort}
            targetPort={port.targetPort}
            ref={port.localPortRef} />
        })}
      </div>
    )
  }
}

export default ExposeContainer;