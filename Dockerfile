FROM python:3.10-slim-bullseye
WORKDIR /app/bot
ADD . ./
RUN pip3 install -r requirments.txt
CMD ["make", "run"]
