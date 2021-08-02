# using multistage docker build: https://docs.docker.com/develop/develop-images/multistage-build/
# spring ref: https://spring.io/guides/topicals/spring-boot-docker/
# https://medium.com/@saboteurkid/docker-multistage-smaller-container-size-example-with-spring-boot-acdcf89c84c0
# Gradle image - https://hub.docker.com/_/gradle
# JDK Image - https://hub.docker.com/_/openjdk?tab=tags0

#--- temp stage to build fat jar ---
FROM gradle:7.1.1-jdk11 AS build
ENV BUILD_HOME=/opt/source
ENV SVC_NAME=todo-service
ENV SVC_HOME=$BUILD_HOME/$SVC_NAME
ENV DEPENDENCY_DIR=/opt/dependency

ARG GITHUB_USERNAME=unknown
ARG GITHUB_TOKEN=unknown

COPY . $BUILD_HOME
WORKDIR $BUILD_HOME
RUN ls -la $BUILD_HOME && gradle build -xcheck -Pghp.username=$GITHUB_USERNAME -Pghp.token=$GITHUB_TOKEN

WORKDIR $SVC_HOME/docker
RUN mkdir -p $DEPENDENCY_DIR && cp ./log4j2.xml $DEPENDENCY_DIR/ && cp ./entrypoint.sh $DEPENDENCY_DIR

WORKDIR $DEPENDENCY_DIR
RUN jar -xf $SVC_HOME/build/libs/*boot.jar

#--- actual docker image with dependencies (jdk buster images are debian based) ---
FROM arm64v8/openjdk:11.0.12-jre-buster

ENV APP_HOME=/opt/app
ARG DEPENDENCY=/opt/dependency

ARG BRANCH=unknown
ARG COMMIT_ID=unknown
ARG COMMIT_MSG=unknown
ARG VERSION=unknown
ARG CREATED=""
LABEL BRANCH=$BRANCH \
	  COMMIT_ID=$COMMIT_ID \
	  COMMIT_MSG=$COMMIT_MSG \
	  CREATED=$CREATED \
	  VERSION=$VERSION

COPY --from=build ${DEPENDENCY}/log4j2.xml $APP_HOME/
COPY --from=build ${DEPENDENCY}/entrypoint.sh $APP_HOME/
COPY --from=build ${DEPENDENCY}/META-INF $APP_HOME/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib $APP_HOME/lib
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes $APP_HOME

WORKDIR $APP_HOME
RUN ["chmod", "+x", "./entrypoint.sh"]

EXPOSE 8081
ENTRYPOINT ["./entrypoint.sh"]
