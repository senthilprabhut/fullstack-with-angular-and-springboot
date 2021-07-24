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
docker run -d --name todo-service senthilprabhut/todo-service:10    #Image name is used here
docker run -d --name todo-service c0e8c2e6fd24                      #Image id is used here
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