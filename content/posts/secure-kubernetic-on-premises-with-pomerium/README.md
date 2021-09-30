---
title: 'Secure Kubernetic on-premises with Pomerium'
excerpt: 'Deploy Kubernetic on-premises and secure it using Pomerium. With Kubernetic Team you can now deploy Kubernetic on your own cluster. In previous blog post we discussed how to secure it on GKE using Identity-Aware Proxy (IAP). In this blog we’ll extend on that by running Pomerium as Identity-Aware Proxy on your own cluster so that you can deploy it anywhere.'
date: '2020-12-18'
coverImage: /blog/secure-kubernetic-on-premises-with-pomerium/deployments.png
---

Deploy Kubernetic on-premises and secure it using Pomerium.

![Kubernetic running on-premises using Pomerium for authentication](/blog/secure-kubernetic-on-premises-with-pomerium/deployments.png)

With Kubernetic Team you can now deploy Kubernetic on your own cluster. In previous [blog post](/blog/running-securely-kubernetic-on-premises-with-identity-aware-proxy) we discussed how to secure it on GKE using Identity-Aware Proxy (IAP). In this blog we’ll extend on that by running Pomerium as Identity-Aware Proxy on your own cluster so that you can deploy it anywhere.

## What we’ll be doing

In this tutorial we’ll run:

* **GKE** for our Kubernetes cluster.
* **Nginx** as Ingress Controller.
* **Cert-Manager** as Let’s Encrypt SSL Certificate provider.
* **Kubernetic Team** as Single-Pane of Glass.
* **Pomerium** as Identity-Aware Proxy.
* **GitHub** as Identity Provider.

We'll assign a wildcard domain `*.demo.kubernetic.com` to our cluster and expose the dashboard under `dashboard.demo.kubernetic.com`. During the tutorial you can use your own subdomain.

## 1. Create Kubernetes Cluster

First, make sure you have configured properly your glcoud and it is up-to-date (Update the zone and region to your preferences):

```yaml
gcloud config set project <PROJECT_ID>
gcloud config set compute/zone europe-west1-b
gcloud config set compute/region europe-west1
gcloud components update
```

Then, create a cluster and get the credentials for kubectl with the following commands:

```sh
gcloud container clusters create kubernetic --num-nodes 1
gcloud container clusters get-credentials kubernetic
```

verify that everything is ok:

```sh
$ kubectl get nodes
NAME                                        STATUS   ROLES    AGE    VERSION
gke-kubernetic-default-pool-ce91e247-bxgd   Ready    <none>   2m2s   v1.16.15-gke.4901
```

## 2. Deploy Kubernetic

We use [helm](https://helm.sh/) to install kubernetic as chart, the repository is [here](https://github.com/harbur/kubernetic-charts). You can find chart documentation in [kubernetic](https://github.com/harbur/kubernetic-charts/blob/master/charts/kubernetic/README.md) subdirectory.

```sh
# add repository
helm repo add kubernetic https://charts.kubernetic.com
helm repo up
```

create a `kubernetic-values.yaml`:

```yaml
config:
  auth:
    type: pomerium
  pomerium:
    jwksURI: https://authenticate.demo.kubernetic.com/.well-known/pomerium/jwks.json
```

Install release:

```sh
helm install kubernetic kubernetic/kubernetic \
  -f kubernetic-values.yaml
```

Once deployed you can test it by port-forwarding locally the service:

```sh
kubectl port-forward svc/kubernetic-frontend 8888:80
```

Open browser on http://localhost:8888 and you should see the following:

![Kubernetic setup process on first launch](/blog/secure-kubernetic-on-premises-with-pomerium/end-user-agreement.png)

You can stop port-forward now, let’s focus on the the rest of the setup.

## 3. Deploy Nginx Ingress Controller

GKE comes with it’s own Ingress Controller, but in order to do a setup that is portable to other environments, we’ll be using [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx/). As an added benefit this is also more cost-effective as you can re-use the same LoadBalancer of the ingress controller for multiple services.

To install simply do:

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml
```

Get the External IP of the Ingress controller:

```sh
$ kubectl get svc -n ingress-nginx
NAME                     TYPE         CLUSTER-IP   EXTERNAL-IP   ...
ingress-nginx-controller LoadBalancer 10.3.241.251 35.240.21.252 ...
```

Make sure there is connectivity (you may need to check the firewall rules). It should respond with an Nginx “404 Not Found” message:

```yaml
$ curl 35.240.21.252
<html>
<head><title>404 Not Found</title></head>
<body>
<center><h1>404 Not Found</h1></center>
<hr><center>nginx</center>
</body>
</html>For more details check the documentation here.
```

You can now setup your wildcard domain `*.demo.kubernetic.com` to point to the Ingress IP.

Once your DNS is setup you can verify it responds ok (it may take some time for DNS servers to propagate your change):

```sh
$ dig echo.demo.kubernetic.com +short
35.240.21.252
```

You can now do a quick test of a deployment, service and ingress, first save the following as `echo-ingress.yaml` :

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: echo
spec:
  rules:
  - host: echo.demo.kubernetic.com
    http:
      paths:
      - backend:
          serviceName: echo
          servicePort: 80
```

then install the following:

```sh
# create deployment
kubectl create deployment echo --image=k8s.gcr.io/echoserver:1.4

# create service
kubectl expose deployment echo --port=8080

# create ingress
kubectl create -f echo-ingress.yaml
```

open a browser to http://echo.demo.kubernetic.com (change subdomain to match yours) and you will see the following:

```sh
CLIENT VALUES:
client_address=10.0.0.15
command=GET
real path=/
query=nil
request_version=1.1
request_uri=http://echo.demo.kubernetic.com:8080/
...
```

Let’s cleanup now our test:

```sh
kubectl delete deployment/echo service/echo ingress/echo
```

## 4. Setup SSL Certificate with Let’s Encrypt & Cert Manager

Now that we have ingress put in place, let’s add [cert-manager](https://cert-manager.io/docs/) to handle SSL certificates using Let’s Encrypt.

```sh
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.1.0/cert-manager.yaml
```

We’re using Google CloudDNS to solve DNS01 ACME challenges, so we’ll be following [this guide](https://cert-manager.io/docs/configuration/acme/dns01/google/), if you use a different DNS check the cert-manager documentation on how to setup properly.

First we need to setup a service-account:

```sh
# create service-account
PROJECT_ID=myproject-id
gcloud iam service-accounts create dns01-solver --display-name "dns01-solver"
```

In the command above, replace **myproject-id** with the ID of your project.

```sh
gcloud projects add-iam-policy-binding $PROJECT_ID \
   --member serviceAccount:dns01-solver@$PROJECT_ID.iam.gserviceaccount.com \
   --role roles/dns.admin
```

Now create a static service account secret:

```sh
gcloud iam service-accounts keys create key.json \
   --iam-account dns01-solver@$PROJECT_ID.iam.gserviceaccount.com
kubectl create secret generic clouddns-dns01-solver-svc-acct \
   --from-file=key.json -n cert-manager
```

Now create a ClusterIssuer:

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-dns01-prod
spec:
  acme:
    email: EMAIL_ADDRESS
    privateKeySecretRef:
      name: letsncrypt-dns01-prod
    server: https://acme-v02.api.letsencrypt.org/directory
    solvers:
      - dns01:
          cloudDNS:
            project: PROJECT_ID
            serviceAccountSecretRef:
              key: key.json
              name: clouddns-dns01-solver-svc-acct
```

Replace `EMAIL_ADDRESS` and `PROJECT_ID` with actual values.

Now let’s test this:

```yaml
cat <<EOF > test-resources.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: cert-manager-test
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: test-cert
  namespace: cert-manager-test
spec:
  dnsNames:
    - test.demo.kubernetic.com
  secretName: test-cert-tls
  issuerRef:
    name: letsencrypt-dns01-prod
    kind: ClusterIssuer
EOF
```

Update the `dnsName` and create the test resources:

```sh
$ kubectl apply -f test-resources.yaml 
```

Check the status of the certificate (it may take some time until DNS is propagated):

```sh
$ kubectl get certificate -n cert-manager-test
NAME        READY   SECRET                 AGE
echo-cert   True    test-cert-tls          56s
```

You can now cleanup the test resources:

```sh
$ kubectl delete -f test-resources.yaml
```

Let’s integrate now cert-manager with the ingress controller:

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: echo
  annotations:
    kubernetes.io/ingress.class: nginx
    kubernetes.io/tls-acme: "true"
    cert-manager.io/cluster-issuer: letsencrypt-dns01-prod
spec:
  rules:
  - host: echo.demo.kubernetic.com
    http:
      paths:
      - backend:
          serviceName: echo
          servicePort: 8080
  tls:
  - hosts:
    - echo.demo.kubernetic.com
    secretName: echo-cert
```

Save the file as `echo-https-ingress.yaml`

and run:

```sh
# create deployment
kubectl create deployment echo --image=k8s.gcr.io/echoserver:1.4

# create service
kubectl expose deployment echo --port=8080

# create ingress with https
kubectl create -f echo-https-ingress.yaml
```

wait for the certificate to be generated:

```sh
$ kubectl get certificate
NAME             READY   SECRET           AGE
echo-cert        True    echo-cert        2m45s
```

open a browser to https://echo.demo.kubernetic.com (change subdomain to match yours) and you will see be connected with a valid let’s encrypt certificate:

![Certificate](/blog/secure-kubernetic-on-premises-with-pomerium/certificate.png)

## 5. Prepare GitHub OAuth

We now have connectivity to services from the web using SSL, let’s secure them using an Identity-Aware Proxy [Pomerium](https://www.pomerium.com/docs/) so that only authenticated users can access the URL, and [GitHub](https://github.com/) as Identity Provider using OAuth.

To do that go to GitHub Settings section under your profile icon:

![Profile](/blog/secure-kubernetic-on-premises-with-pomerium/profile.png)

Navigate to: Settings > Developer Settings > Oauth Apps > New OAuth App

![Register OAuth](/blog/secure-kubernetic-on-premises-with-pomerium/register-oauth.png)

Register a new OAuth App with the following details:

* **Name**: Demo Cluster
* **Homepage URL**: https://dashboard.demo.kubernetic.com
* **Authorization callback URL**: https://authenticate.demo.kubernetic.com/oauth2/callback

updating the subdomain with your actual one.

Once registered, you can note done the CLIENT_ID and the CLIENT_SECRET, we’ll be using them on the next section.

## 6. Setup Pomerium

We’ll be using helm to install pomerium, so let’s add first the repository:


```sh
helm repo add pomerium https://helm.pomerium.io
helm repo up
```

Now create the following as `pomerium-values.yaml`


```yaml
authenticate:
  idp:
    provider: "github"
    clientID: "CLIENT_ID"
    clientSecret: "CLIENT_SECRET"
config:
  rootDomain: demo.kubernetic.com
  policy:
    - from: http://dashboard.demo.kubernetic.com
      to: http://kubernetic-frontend.default.svc.cluster.local:80
      allow_websockets: true
      pass_identity_headers: true
      allowed_users:
        - USER_EMAIL
ingress:
  enabled: false
```

replacing `CLIENT_ID`, `CLIENT_SECRET` and `USER_EMAIL` with your values.

to install pomerium:

```sh
helm install pomerium pomerium/pomerium -f pomerium-values.yaml
```

to install ingress we’ll do it separately, save the following file as `pomerium-ingress.yaml`

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    kubernetes.io/tls-acme: "true"
    cert-manager.io/cluster-issuer: letsencrypt-dns01-prod
    nginx.ingress.kubernetes.io/backend-protocol: HTTPS
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
  name: pomerium
spec:
  rules:
  - host: '*.demo.kubernetic.com'
    http:
      paths:
      - backend:
          serviceName: pomerium-proxy
          servicePort: https
  - host: authorize.demo.kubernetic.com
    http:
      paths:
      - backend:
          serviceName: pomerium-authorize
          servicePort: https
  - host: authenticate.demo.kubernetic.com
    http:
      paths:
      - backend:
          serviceName: pomerium-authenticate
          servicePort: https
  tls:
  - hosts:
    - '*.demo.kubernetic.com'
    secretName: demo.kubernetic.com-tls
```

Install ingress:

```sh
kubectl apply -f pomerium-ingress.yaml
```

Now navigate to https://dashboard.demo.kubernetic.com/

It will redirect to the GitHub to grant access:

![Authorize App](/blog/secure-kubernetic-on-premises-with-pomerium/authorize-app.png)

Once authorized it will redirect to Kubernetic setup page:

![End User Agreement](/blog/secure-kubernetic-on-premises-with-pomerium/end-user-agreement.png)

## 7. License Activation

Now that we have authenticated properly, we can continue with the setup process. You can request a free trial key [here](https://www.kubernetic.com/team/trial), which is valid for 30 days for up to 10 users. Once received, fill in the activation code and add the admin email address (this must match the one you logged in previously on GitHub, so that you can be granted admin privileges).

![Kubernetic setup process](/blog/secure-kubernetic-on-premises-with-pomerium/license-activation.png)

## 8. Setup Kubernetes Privileges

Once you fill-in the activation code you will be redirected to the dashboard, but an error message will appear:

![Logged-in user without any Kubernetes privileges cannot do much](/blog/secure-kubernetic-on-premises-with-pomerium/no-privileges.png)

This is because your user doesn’t have any privileges granted in Kubernetes cluster itself.

Since our user is the admin, let’s grant ourselves cluster-admin as an example:

```sh
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user $(gcloud config get-value account)
```

Refresh the screen and you can now access the dashboard and navigate on all resources:

![The dashboard of your cluster](/blog/secure-kubernetic-on-premises-with-pomerium/dashboard.png)

![Deployments on default namespace of your cluster](/blog/secure-kubernetic-on-premises-with-pomerium/deployments-demo.png)

## Cleanup


```sh
# delete pomerium
helm delete pomerium
kubectl delete ingress pomerium

# delete kubernetic
helm delete kubernetic

# delete echo
kubectl delete ingress/echo deploy/echo svc/echo

# delete cert-manager
kubectl delete -f https://github.com/jetstack/cert-manager/releases/download/v1.1.0/cert-manager.yaml

# delete nginx ingress controller
kubectl delete -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml

# delete cluster
gcloud container clusters delete kubernetic
```

## Summary

We did a setup of a Kubernetes cluster on GKE from scratch, configured a domain to point to a running Kubernetic instance inside the cluster, secured it with Pomerium Identity-Aware Proxy (IAP) and GitHub as Identity Provider, and provided a UI for all authenticated users to manage their corresponding resources on the cluster.

We’ve also did a blog post how to secure it using Google’s own IAP [here](/blog/running-securely-kubernetic-on-premises-with-identity-aware-proxy).

Kubernetic is a single-pane of glass for managing your clusters, focused to provide **productivity for power users** and **discoverability for newcomers**.
