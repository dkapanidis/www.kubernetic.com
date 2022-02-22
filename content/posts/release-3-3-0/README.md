---
title: 'Kubernetic v3.3.0 Released'
excerpt: 'Release v3.3.0 is out with some important changes.'
date: '2022-02-22'
---

Release v3.3.0 is out with some important changes. You can check the complete list of changes on the [changelog](https://docs.kubernetic.com/changelog.html).

## Issue with editing ingress and deployment on 1.15 and 1.21

Some API calls were using specific resource API versions by leveraging the typed API calls of [kubernetes/client-go](https://github.com/kubernetes/client-go) but this caused issues for clusters too old or too new where the static API versions have been deprecated. Kubernetic now has a fully featured REST-based client with dynamic API versions to avoid these versioning issues.

## Default PATH is now effective

On Linux and Mac machines it is common to see authentication 3rd party binaries such as `aws-iam-authenticator` be installed under the `/usr/local/bin` PATH. The PATH on the Preferences page had this value as default, but it was never effective.

![Default PATH value](/blog/path.png)

## Licensing changes and discount offer

Until recently the licensing of Kubernetic was perpetual with one-year free updates, but the one-year licensing limit was never enforced. Starting from `v3.3.0` Kubernetic is switching from perpetual to subscription-based licensing and validation of license expiration is enabled in-app.

For existing clients with older than one-year licenses they can continue using Kubernetic `v3.2.0` ([Mac](https://kubernetic.s3.amazonaws.com/Kubernetic-3.2.0.dmg), [Linux](https://kubernetic.s3.amazonaws.com/Kubernetic-3.2.0.AppImage), [Win](https://kubernetic.s3.amazonaws.com/Kubernetic+Setup+3.2.0.exe)) without any limitations.

For all existing clients there is a discount of **20%** for any number of licenses for the until end of March, to request simply send an email at [contact@harbur.io](mailto:contact@harbur.io?subject=Discount%20offer).