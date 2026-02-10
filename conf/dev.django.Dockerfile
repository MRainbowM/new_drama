FROM python:3.11.3
ENV PYTHONUNBUFFERED 1 
RUN mkdir -p /backend 
RUN mkdir -p /backend/static 
RUN apt update
RUN apt install gettext -y
RUN apt -y install libz-dev libjpeg-dev libfreetype6-dev python-dev
WORKDIR /backend
COPY ./backend/requirements.txt /backend/requirements.txt
COPY ./backend/requirements.dev.txt /backend/requirements.dev.txt

RUN pip install -U pip && pip install -U setuptools && pip install -r requirements.txt && pip install -r requirements.dev.txt
