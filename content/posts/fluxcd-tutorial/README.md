---
title: 'FluxCD Tutorial'
excerpt: 'FluxCD step by step tutorial with Kubernetic'
date: '2022-07-04'
---

# FluxCD Tutorial

Kubernetic now supports managing FluxCD resources. In this tutorial we'll show how to get started with FluxCD to do Continuous Delivery of your workflow and apply GitOps practices.

## Getting Started

We'll be following alongside the [Getting Started](https://fluxcd.io/docs/get-started/) from FluxCD website, you're invited to first do the FluxCD tutorial, but it is not required to be able to follow along here.

### Before you begin

To follow the guide, you need the following:

* **A Kubernetes cluster**. We recommend [Kubernetes kind](https://kind.sigs.k8s.io/docs/user/quick-start/) for trying Flux out in a local development environment.
* **A GitHub personal access token with repo permissions**. See the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
* **FluxCD installed on your cluster**: See FluxCD guide up to [Install Flux onto your cluster](https://fluxcd.io/docs/get-started/#install-flux-onto-your-cluster) step.

### Objectives

* Deploy a sample application using Flux Kustomization.
* Deploy a sample application using Flux HelmRelease.
* Perform GitOps using Flux.

### Prepare

All FluxCD resources should be created under the `fluxcd-system` namespace so that FluxCD can read them.

Make sure you selected the proper context (e.g. `kind-kind`), namespace and then go to the `gitrepositories` resource.

![fluxcd-namespace](/blog/fluxcd-tutorial/fluxcd-namespace.png)

If you installed properly the FluxCD before you should see a `flux-system` gitrepository that points to your `fleet-infra` repository.

### Deploy a sample application using Flux Kustomization

We'll be deploying an app from a public repository [github.com/stefanprodan/podinfo](https://github.com/stefanprodan/podinfo), podinfo is a tiny web application made with Go.

First we need to define our git repository as the source of our deployment. On `gitrepositories` resources click `Create` button (or press `C`) and fill-in the following:

* Name: `podinfo`
* URL: `https://github.com/stefanprodan/podinfo`

![podinfo-gitrepository](/blog/fluxcd-tutorial/podinfo-gitrepository.png)

By default the `master` branch will be monitored, but can be configured otherwise.

Once created it should be shown as Ready after a few seconds:

![podinfo-gitrepository-created](/blog/fluxcd-tutorial/podinfo-gitrepository-created.png)

Now let's deploy the app. On `kustomizations` resources click `Create` button (or press `C`) and fill-in the following:

* Name: `podinfo`
* Source: Choose `GitRepository/podinfo` from dropdown
* Target namespace: Choose `default` from dropdown
* Path: `./kustomize`
* Prune: `true`

![podinfo-kustomization](/blog/fluxcd-tutorial/podinfo-kustomization.png)

Once created it should be shown as Ready after a few seconds:

![podinfo-kustomization-created](/blog/fluxcd-tutorial/podinfo-kustomization-created.png)

Click on the newly created `podinfo` kustomization to see the resources that are created:

![podinfo-kustomization-view](/blog/fluxcd-tutorial/podinfo-kustomization-view.png)

You can now click on each of the created resources to navigate there.

* Click on the `podinfo` Deployment to view the corresponding Pods.
* Press `L` to view the logs.
* Go to `Ports` tab and port-forward the `http` port (right click > Start Port Forward).
* Click on the Local Port to open on a browser.

![podinfo](/blog/fluxcd-tutorial/podinfo.png)

Let's cleanup everything until now.

* Stop Port Forward.
* Go to `kustomizations` and delete `podinfo`. With prune enabled it will delete all generated resources.
* Go to `gitrepositories` and delete `podinfo`.

### Deploy a sample application using Flux HelmRelease

We can also deploy the app using a Helm chart. The `podinfo` contains also a chart we can use.

First we need to define the source of the helm repository. On `helmrepositories` resources click `Create` button (or press `C`) and fill-in the following:

* Name: `podinfo`
* URL: `https://stefanprodan.github.io/podinfo`

![podinfo-helmrepository](/blog/fluxcd-tutorial/podinfo-helmrepository.png)

Once created it should be shown as Ready after a few seconds:

![podinfo-helmrepository-created](/blog/fluxcd-tutorial/podinfo-gitrepository-created.png)

Now let's deploy the app. On `helmreleases` resources click `Create` button (or press `C`) and fill-in the following:

* Name: `podinfo`
* Source: Choose `HelmRepository/podinfo` from dropdown
* Chart: `podinfo`
* Target namespace: Choose `default` from dropdown

![podinfo-helmrelease](/blog/fluxcd-tutorial/podinfo-helmrelease.png)

Once created it should be shown as Ready after a few seconds:

![podinfo-helmrelease-created](/blog/fluxcd-tutorial/podinfo-helmrelease-created.png)

You can now go to `default` namespace and view deployments.

* Click on the `default-podinfo` Deployment to view the corresponding Pods.
* Press `L` to view the logs.
* Go to `Ports` tab and port-forward `http` (right click > Start Port Forward)
* Click on the Local Port to open on a browser.

![podinfo](/blog/fluxcd-tutorial/podinfo.png)

Let's cleanup everything again.

* Stop Port Forward.
* Go to `helmreleases` and delete `podinfo` (It will delete all generated resources).
* Go to `helmrepositories` and delete `podinfo`.

### Perform GitOps using Flux

Until now we created manually the Flux resources directly to Kubernetes but we didn't engage with any GitOps practices. Now we'll perform the same process as before but the resources will be stored in a Git repository and FluxCD will pull the resources from there.

You should already have a `fleet-infra` repository on your GitHub, we'll add the resources there.

On `gitrepositories` resources click `Create` button (or press `C`), fill-in the following and click `Preview`:

* Name: `podinfo`
* URL: `https://github.com/stefanprodan/podinfo`

![podinfo-gitrepository-preview](/blog/fluxcd-tutorial/podinfo-gitrepository-preview.png)

Click `Copy` to copy the YAML and store it inside `fleet-infra` repository under `./clusters/my-cluster/podinfo-source.yaml`:

Commit and push the `podinfo-source.yaml` file:

```shell
git add -A && git commit -m "Add podinfo GitRepository"
git push
```

On `kustomizations` resources click `Create` button (or press `C`), fill-in the following and click `Preview`:

* Name: `podinfo`
* Source: Choose `GitRepository/podinfo` from dropdown
* Target namespace: Choose `default` from dropdown
* Path: `./kustomize`
* Prune: `true`

![podinfo-kustomization-preview](/blog/fluxcd-tutorial/podinfo-kustomization-preview.png)

Click `Copy` to copy the YAML and store it inside `fleet-infra` repository under `./clusters/my-cluster/podinfo-kustomization.yaml`

Commit and push to the repository:

```shell
git add -A && git commit -m "Add podinfo Kustomization"
git push
```

Wait for reconciliation and once created it should be shown as Ready after a few seconds:

![podinfo-kustomization-created](/blog/fluxcd-tutorial/podinfo-kustomization-created.png)

Click on the newly created `podinfo` kustomization to see the resources that are created:

![podinfo-kustomization-view](/blog/fluxcd-tutorial/podinfo-kustomization-view.png)

You can now click on each of the created resources to navigate there.

* Click on the `podinfo` Deployment to view the corresponding Pods.
* Press `L` to view the logs.
* Go to `Ports` tab and port-forward the `http` port (right click > Start Port Forward).
* Click on the Local Port to open on a browser.

![podinfo](/blog/fluxcd-tutorial/podinfo.png)

## Summary

We created a `GitRepository` to connect to a public repository where a sample application is located and then deployed it using `Kustomization` to our cluster.

We also created a `HelmRepository` to connect to a [Helm repository](https://helm.sh/docs/topics/chart_repository/) a public HTTP Server that houses an `index.yaml` of charts. We then created a `HelmRelease` to deploy the sample app using a Helm chart.

Lastly we commited all our configuration to a `fleet-infra` repository, so that Flux pulls the configuration from the repository and syncs the cluster applying GitOps practices.
