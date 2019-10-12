FROM python:3.7-alpine

ARG KUBE_LATEST_VERSION="v1.10.2" 
ARG HELM_VERSION="v2.10.0" 

ENV HELM_HOME="/usr/local/bin/"
ENV HELM_BINARY="/usr/local/bin/helm"
RUN apk add --no-cache ca-certificates bash \
    && wget -q https://storage.googleapis.com/kubernetes-release/release/${KUBE_LATEST_VERSION}/bin/linux/amd64/kubectl -O /usr/local/bin/kubectl \
    && chmod +x /usr/local/bin/kubectl \
    && wget -q http://storage.googleapis.com/kubernetes-helm/helm-${HELM_VERSION}-linux-amd64.tar.gz -O - | tar -xzO linux-amd64/helm > /usr/local/bin/helm \
    && chmod +x /usr/local/bin/helm
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR backend_svc

COPY setup.py setup.py
COPY README.txt README.txt
COPY CHANGES.txt CHANGES.txt
COPY ./backend_svc ./backend_svc
COPY development.ini development.ini

RUN pip install -e .

CMD ["pserve", "development.ini"]