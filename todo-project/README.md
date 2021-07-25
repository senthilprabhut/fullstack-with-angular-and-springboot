# Getting Started
Use the below commands to build the source code and run unit tests
We need github username and github token to download the packages from Github Package Repository. 
```shell
./gradlew build -Pghp.username=${GITHUB_USER} -Pghp.token=${GITHUB_TOKEN}    #builds the jar file
./gradlew build -xtest                                                       #ignores unit tests
./gradlew build -xcheck                                                      #ignores checkstyle, spotbugs and unit tests
```

# Liquibase
Use the below command to generate the liquibase changelog file
```
./gradlew liquibaseDiffChangelog -Pdb_username=postgres -Pdb_password=password
```

# Database
Use the below commands to run postgres in the local machine
```shell
docker pull postgres
docker run -d --name my-postgres -p 5432:5432 -e POSTGRES_PASSWORD=password postgres

docker exec -it my-postgres bash
root@9c7247f8fa85:/#
root@9c7247f8fa85:/# psql -U postgres
psql (13.3 (Debian 13.3-1.pgdg100+1))
Type "help" for help.
postgres=# 
postgres=# create database "todo-service";
```

# Docker Containers
Use the below command to build a docker image locally for todo-service with changeset as a tag and 
senthilprabhut/todo-service as the repository
The changeset passed in as build argument will be set as the label
```shell
commit=`git rev-parse --short HEAD`
docker build -f todo-service/docker/Dockerfile --build-arg COMMIT_ID=${commit} --build-arg GITHUB_USERNAME=${GITHUB_USERNAME} --build-arg GITHUB_TOKEN=${GITHUB_TOKEN} -t senthilprabhut/todo-service:10 .
```

Use the below command to run the docker container locally
```shell
#Image name is used here
docker run -d --name todo-service -e OKTA_CLIENT_ID=${OKTA_CLIENT_ID} -e OKTA_CLIENT_SECRET=${OKTA_CLIENT_SECRET} -e DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/todo-service -e DATASOURCE_USER=postgres -e DATASOURCE_PASS=password senthilprabhut/todo-service:10

#Image id is used here
docker run -d --name todo-service -e OKTA_CLIENT_ID=${OKTA_CLIENT_ID} -e OKTA_CLIENT_SECRET=${OKTA_CLIENT_SECRET} -e DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/todo-service -e DATASOURCE_USER=postgres -e DATASOURCE_PASS=password c0e8c2e6fd24
```

## Use Gradle to build image and push it to the repo
Use the below command to build the docker image locally
```shell
./gradlew dockerBuild -PdockerRegistry=docker.io/senthilprabhut -PbuildTag=10 -Pghp.username=${GITHUB_USERNAME} -Pghp.token=${GITHUB_TOKEN}
```

Use the below command to publish the docker image to repository
```shell
./gradlew dockerPush
```