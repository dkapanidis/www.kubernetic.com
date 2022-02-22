---
title: 'Kubernetic v3.2.0 Released'
excerpt: 'Release v3.2.0 is out with bug fixes and maintaince tasks.'
date: '2022-02-01'
---

Release v3.2.0 is out with bug fixes and maintaince tasks. You can check the complete list of changes on the [changelog](https://docs.kubernetic.com/changelog.html).

## Fix breaking changes introduced on Control Plane 1.20+

Kubernetes control plane deprecated use of `metadata.selfLink` field [here](https://github.com/kubernetes/kubernetes/pull/80978) in individual and list objects. The selfLink field was used in Kubernetic as a reference to track changes on UI, which had the effect of disappearing resources when listed.

This is now fixed by using the `metadata.uid` field instead to track changes.

## Change Font Size

Depending on your display resolution the default font size may not be the optimal for your setup. Now there is an option to zoom in/out to better customize your app.

![zoom app](/blog/release-3-2-0/zoom.png)

## Linux version Self Updates

Mac version always had the option to self update the version, but in Linux there was an issue that made a popup display the following error `Error Updating: There seems to be some connectivity issue.`.

This is now fixed by updating the electron builder responsible for the packaging of Linux app. The app is now been distributed using `AppImage` format instead of `tar.gz` which is more widely used.
