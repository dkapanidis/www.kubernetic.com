---
title: 'Kubernetic v3.4.0 Released'
excerpt: 'Release v3.4.0 is out'
date: '2022-03-29'
---

Release v3.4.0 is out handling some situations regarding the [removal of APIs](https://kubernetes.io/blog/2021/07/14/upcoming-changes-in-kubernetes-1-22/#api-changes) since Kubernetes 1.22.

You can check the complete list of changes on the [changelog](https://docs.kubernetic.com/changelog.html).

### Migrate Ingress creation to use networking/v1 API

On Ingress creation UI the API used was `extensions/v1beta1` but since kubernetes 1.22 the [deprecated API is removed](https://kubernetes.io/blog/2021/07/14/upcoming-changes-in-kubernetes-1-22/#api-changes).

The UI now uses the new API `networking.k8s.io/v1` available since 1.19 to create Ingresses.

On the new API version each path in an Ingress is required to have a corresponding [path type](https://kubernetes.io/docs/concepts/services-networking/ingress/#path-types) (Path type can be one of the following values `ImplementationSpecific`, `Exact`, or `Prefix`). By default `Prefix` value is used, on later releases the path type will be configurable from the UI itself.

### CRDs are now displayed in k8s 1.22+

CRDs were previously listed using API `apiextensions.k8s.io/v1beta1`, which is removed since 1.22.

Since Kubernetic v3.4.0 the CRD list is using the dynamic API client which doesn't depend on specific API versioning.
