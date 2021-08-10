# Docker Compose Instructions
To start the containers, use the below command
```shell
docker-compose up -d
```

To bring down the containers, use the command
```shell
docker-compose down
```

# K3D Instructions

```shell
mkdir /tmp/k3dvol/postgresdata
mkdir /tmp/k3dvol/dashboards
cp monitoring/grafana/provisioning/dashboard/*.json /tmp/k3dvol/dashboards

k3d cluster create todo-cluster -p 4200:80@loadbalancer --api-port 6550 --volume /tmp/k3dvol:/tmp/k3dvol --servers 1 --agents 1

kubectl config use-context k3d-todo-cluster
kubectl create ns monitoring

k3d cluster delete todo-cluster
```

# Helm Instructions
Folling values need to be set before installing the helm charts
- `slackWebhook` in `values.yaml`
- `client-id` and `client-secret` in `0021-todo-secret.yaml`
- `client-id` in `0033-todo-ui-secret.yaml`

```shell
helm install todo ./todo-chart --namespace default --wait --timeout 300s

helm uninstall todo
```

### Helm - prometheus, alert manager, grafana
Now that our pods are running, we have the option to use the Prometheus dashboard right from our local machine. This is done by using the following command:
```shell
kubectl port-forward -n monitoring prometheus 9090
```
Now visit http://127.0.0.1:9090 to access the Prometheus dashboard. Otherwise, you can access the dashboard via http://localhost:4200/prometheus
You can visit http://localhost:4200/alerts to access Alert Manager dashboard.
Visit http://127.0.0.1:3000 to access Grafana dashboards. Use the `admin`/`password` combination to login.


# Note about resolving angular app running on nginx
Reference: https://stackoverflow.com/questions/65766633/call-to-api-from-angular-in-nginx-does-not-resolve-docker-service-name

In current context, when you access your Angular app from browser, you're using the Angular app in host machine, in host network, not inside container anymore, your Angular app is exposed by mapping port from container to host machine. Therefore when you make an API request, it'll coming from host machine -> docker container, at that time, host machine will try to resolve service name in current context and of course from host machine there's no service name

Therefore, for all browser apps, even you deploy it using docker container, but when you call API, mostly you'll have to use localhost:<mapped_port> or something that resolve to host machine not inside docker container (Eg: domain name).
