export interface Deployment {
    name: string,
    namespace: string,
    replicas: number,
    labels: string,
    pods: Pod[],
}
  
export interface Pod {
    name: string,
    status: string,
}
  
export interface Container {
    name: string,
    ports: Port[],
    ref?: React.RefObject<any>,
}
  
export interface Port {
    localPortRef: React.RefObject<any>,
    localPort: number,
    targetPort: number,
}
