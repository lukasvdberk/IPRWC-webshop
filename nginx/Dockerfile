FROM tutum/nginx

RUN rm /etc/nginx/sites-enabled/default

USER $user

COPY sites-enabled/ /etc/nginx/sites-enabled
