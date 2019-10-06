FROM python:3.7-alpine

WORKDIR backend_svc

COPY setup.py setup.py
COPY README.txt README.txt
COPY CHANGES.txt CHANGES.txt
COPY ./backend_svc ./backend_svc
COPY development.ini development.ini

RUN pip install -e .

CMD ["pserve", "development.ini"]