---
title: 'Announcing Kubernetic 2.7.0 — Control Plane for your clusters'
excerpt: 'Today we released a new version of Kubernetic with some very interesting new features sucha as Support for CRDs, Deployment Rollout commands, open Terminal inside containers, aggregated Logs, port forwarding, support for RBAC management and package management with Helm. The release also contains a list of bug fixes.'
date: '2020-05-19'
---

Today we released a new version of Kubernetic with some very interesting new features:

* Support for CRDs
* Deployment Rollout commands
* Open Terminal inside containers
* Aggregated Logs
* Port forwarding
* Support for RBAC management
* Package management with Helm

The release also contains a list of bug fixes, for an extensive list you can check our [Changelog](https://docs.kubernetic.com/changelog).

Let’s take a quick look of the new features that were introduced:

## Support for CRDs

![Displaying list of Custom Resources](/blog/release-2-7-0/crds.png)

Custom Resource Definitions have now a dedicated section where you can view, edit or delete them directly from the UI.

## Deployment Rollout commands

![Perform rollout commands](/blog/release-2-7-0/rollout.gif)

Deployments now support various rollout commands that help with the day to day operations:

* **Restart**: In case you need to force a restart of a specific deployment, now instead of deleting the Pod and waiting for a new Pod to replace it, thus loosing service availability in the meantime, you have the ability to restart the deployment, which will trigger a rollout with the same Spec and will avoid downtimes.
* **Undo**: In case of an issue on your new deployment, you now have a Rollout tab where you can see the previous revisions of your deployment and undo your latest changes.


## Open Terminal inside containers

![Open Terminal inside containers](/blog/release-2-7-0/terminal.gif)

You can open a terminal session inside a container of a Pod within the Terminal Tab. In case there are more than one container you can choose in the dropdown option which container you want to open the session to. In the future we’ ll also be supporting opening terminal to an [ephemeral container](https://kubernetes.io/docs/concepts/workloads/pods/ephemeral-containers/) of your choosing, in order to be able to bring you favourite debugging tools with you on any Pod.

## Aggregated Logs

![Aggregated logs of pods and containers on a deployment](/blog/release-2-7-0/logs.gif)

Logs section now supports displaying aggregated logs of all pods and containers of a deployment with the ability to filter them.

## Port forwarding

![Easy local Port forwarding](/blog/release-2-7-0/port-forwarding.gif)

Pods now have a Ports section where you can port-forward locally a port of your choosing in order to test it without the need to expose it to the world. It chooses a randomly-selected free local port to avoid conflicts and provides a link that is opened on the default browser of your OS. A “Port Forwards” section is also available on the top-right menu to centrally manage all active port forwards.

## Support for RBAC management

![Easy RBAC management](/blog/release-2-7-0/rbac.gif)

A new section has been added for User management. You can now manage your Roles, RoleBindings, ClusterRoles & ClusterRoleBindings from Kubernetic. The UI will provide you with the available options on each step, in order to have less error-prone configurations.

## Package management with Helm

![Deploying a WordPress Helm Chart with custom values](/blog/release-2-7-0/deploy-chart.gif)

Kubernetic integrates with helm to deploy chart releases from the UI, you can choose your chart, provide the release name and the defined values, and the helm release will be created on the selected cluster namespace. In the above example we deploy a WordPress instance on “demo” namespace with the default values and setting the blog name through values.

---

Kubernetic is available on Mac, Windows and Linux. [Try it now](https://kubernetic.com/) for free during 30 days. There are more features coming, you can see our current roadmap [here](https://github.com/harbur/kubernetic/milestone/15). You can also vote existing features [here](https://github.com/harbur/kubernetic/issues) by giving them the thumbs-up :+1: or add your own feature requests.
