# Getting Started
Use the below commands to build the source code and run unit tests
```
./gradlew build          builds the jar file
./gradlew build -xtest   ignores unit tests
./gradlew build -xcheck  ignores checkstyle, spotbugs and unit tests
```

# Liquibase
Use the below command to generate the liquibase changelog file
```
./gradlew liquibaseDiffChangelog -Pdb_username=postgres -Pdb_password=password
```

# Docker Containers
Use the below command to build a docker image locally for ui-service with changeset as a tag and 
senthilprabhut/ui-service as the repository
The changeset passed in as build argument will be set as the label
```
changeset=`git rev-parse --short HEAD`
docker build -f ui-service/docker/Dockerfile --build-arg VERSION=${changeset} -t senthilprabhut/ui-service:$changeset .
```
You can use gradle to build a local image and push it to the repo

Use the below command to build the docker image locally
```
./gradlew dockerBuild -PdockerRegistry=docker.io/senthilprabhut -PbuildTag=10
```

Use the below command to publish the docker image to repository
```
./gradlew dockerPush
```