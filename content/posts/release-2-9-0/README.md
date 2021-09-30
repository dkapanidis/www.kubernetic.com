---
title: 'Kubernetic 2.9.0 is released! — Control plane for your clusters'
excerpt: 'New version of Kubernetic is out. On this post we’ll be showcasing the features added in the two latest releases 2.8.0 and 2.9.0: Helm 3 support, events section, show allocated resources, previous logs and robustness'
date: '2020-07-14'
---

New version of Kubernetic is out. On this post we’ll be showcasing the features added in the two latest releases 2.8.0 and 2.9.0:

* Helm 3 support
* Events section
* Show allocated resources
* Previous logs
* Robustness

## Helm 3 support

With the [release of helm 3](https://helm.sh/blog/helm-3-released/), the installation of charts has gotten a lot easier and more secure by ditching tiller. Kubernetic now includes helm 3 out-of-the-box, without any necessary external installation (no helm binary client needed).

It integrates with existing configuration so if you already have repositories configured, you’ll be able to use them on Kubernetic directly, or you can easily manage them through the UI.

![Managing helm repositories](/blog/release-2-9-0/repositories.gif)

Once the repository is added you can then choose your favourite chart to be deployed, as an example we install Ghost, a blogging platform.

There is no need of initial setup of the kubernetes cluster, or other cluster-wide requirements, as long as you have write-privileges to the selected namespace you can deploy a chart release, isn’t that great?

![Deploy bitnami/ghost chart](/blog/release-2-9-0/deploy-release.gif)

Another important feature is the two-way tracking of resources. For example from the chart view you can see the existing releases, and from there you can drill-down to the created resources, but also drill-up from a resource created from a release to the release itself.

![Drill-down or drill-up of helm release resources](/blog/release-2-9-0/release-view.gif)

## Events

You can now view the events of each resource on a separate tab, for example below we can see the deployment replicas has been scaled up/down.

![Events Tab](/blog/release-2-9-0/events-tab.gif)

## Show allocated Resources

Now you can see the allocated resources on each node and get a better view of how much free/allocated resources you have on your clusters, on each node of course you can drill-down to see more details per-node.

![Allocated Resources](/blog/release-2-9-0/allocated-resources.png)

## Previous logs

Logs of previous pod execution can now be viewed easily on the logs tab, also auto-scroll has been added to to follow the logs as they come.

![Show previous logs flag](/blog/release-2-9-0/previous-logs.gif)

## Robustness

Last but not least, we’ve improved the robustness of Kubernetic by changing the way it interacts with the backend.

Before diving into the solution let me explain first the previous state. Until now Kubernetic opened a single websocket connection that connected with the cluster and monitored resources, the connection was session-wide and in case there were some connectivity interruption with the cluster during the session Kubernetic was left with a stale connection, not updating the resources and giving some bad UX.

Now the websocket connection is page-scoped so it monitors only the necessary resources and it’s lifecycle is a lot more ephemeral, in case of network interruption a page refresh will now recover and provide a much more robust UX. Also each page is requesting the resources using [react-query](https://github.com/tannerlinsley/react-query) hooks which provide fetching with automatic retries, caching with background refresh and a visual loading icon on the title bar.

It’s also worth noting that in order to improve the robustness we’ve added a [MirageJS](http://miragejs.com/) mock server on the frontend UI for that helps on development by simulating all backend APIs. On testing the frontend we’re using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) and covered 77% of our code.


## Coming up

We have a lot more in the roadmap coming which we can’t reveal just yet, but we can give you a heads up for the next features coming around the corner:

## Better Metrics

We have metrics for the allocated resources per-node, but we’re working on providing metrics visualisation of resource metrics per pod and a histogram if available, also we plan on providing easy-to-install addons for these type of purposes or connect with pre-existing solutions.

## OperatorHub support

Now that [Operator Framework moves to CNCF incubator](https://www.openshift.com/blog/operator-framework-moves-to-cncf-for-incubation), we’ll be adding support for the [OperatorHub.io](https://operatorhub.io/) in Kubernetic. OperatorHub is a location where one can find operators to install on a Kubernetes cluster, if you are familiar with Helm, you can think of it as a chart repo for operators.

## ArgoCD integration

[ArgoCD](https://argoproj.github.io/argo-cd/) is a declarative, GitOps continuous delivery tool for Kubernetes. We’ll be integrating Kubernetic with ArgoCD so that you can manage your applications continuous delivery directly from Kubernetic.

Hope you like what’s released and what’s coming, see you soon!
