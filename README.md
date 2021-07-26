# Docker Compose Instructions
To start the containers, use the below command
```shell
docker-compose up -d
```

To bring down the containers, use the command
```shell
docker-compose down
```

### Note about resolving angular app running on nginx
Reference: https://stackoverflow.com/questions/65766633/call-to-api-from-angular-in-nginx-does-not-resolve-docker-service-name

In current context, when you access your Angular app from browser, you're using the Angular app in host machine, in host network, not inside container anymore, your Angular app is exposed by mapping port from container to host machine. Therefore when you make an API request, it'll coming from host machine -> docker container, at that time, host machine will try to resolve service name in current context and of course from host machine there's no service name

Therefore, for all browser apps, even you deploy it using docker container, but when you call API, mostly you'll have to use localhost:<mapped_port> or something that resolve to host machine not inside docker container (Eg: domain name).
