FROM node:16-alpine as build

WORKDIR /app
COPY package.json /app/package.json

COPY . /app
RUN yarn

ENV HOST=0.0.0.0
ARG COMMIT_HASH="none"
ARG COMMIT_TAG="none"
ENV COMMIT_HASH=$COMMIT_HASH
ENV COMMIT_TAG=$COMMIT_TAG
LABEL commit-hash=$COMMIT_HASH
LABEL commit-tag=$COMMIT_TAG

ENTRYPOINT [ "yarn", "start" ]

# # DEPLOY-Container
# FROM httpd:2.4-bullseye
# ARG COMMIT_HASH="none"
# ARG COMMIT_TAG="none"
# ENV COMMIT_HASH=$COMMIT_HASH
# ENV COMMIT_TAG=$COMMIT_TAG
# LABEL commit-hash=$COMMIT_HASH
# LABEL commit-tag=$COMMIT_TAG

# COPY --from=build /app/build /usr/local/apache2/htdocs

# ENTRYPOINT ["httpd", "-D", "FOREGROUND"]
