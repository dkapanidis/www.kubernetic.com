---
title: 'Kubernetic v4.1.0 Released'
excerpt: 'Release v4.1.0 is out'
date: '2022-05-16'
---

Release v4.1.0 is out with UI improvements and some fixes.

You can check the complete list of changes on the [changelog](https://docs.kubernetic.com/changelog.html).

### Translucent side menu on mac desktop

Now on Mac, the desktop app is frameless optimizing screen space. As eye-candy the side menu is now translucent. The width of the side menu can be adjusted either by dragging the edge of the side menu or using the shortcut `[` to collapse / expand the width.

![Translucent Side Menu](/blog/release-4-1-0/translucent-side-menu.png)

> This feature is only available for Mac OS.

### Back / Forward Navigation

Navigation buttons have been added on the top menu to add the ability to go back / forward on screens, usefull when for example drilling down to a specific pod of a deployment through the deployment page and want to go back up.

Navigation is also available with shortcuts:

* `mod+[` or `mod+left` to go back.
* `mod+]` or `mod+right` to go forward.

![Top Menu Navigation](/blog/release-4-1-0/navigation.png)

### Context menu (right-click menu) on resources table

On the resources table there is now the option to right-click on a row and it will display a context menu with all the possible actions on the specific resource.

The context menu depends on the type of resource, for workloads for example it will display the option to scale up/down the replicas.

![Context menu](/blog/release-4-1-0/context-menu.gif)

### Improve Context and Namespace navigation

When selecting the kubernetes context and namespace you now have the option to quickly open the menu for each using shortcuts:

* press `k` to switch contexts.
* press `n` to switch namespaces.

![Context and Namespace Navigation](/blog/release-4-1-0/context-namespace-menu.gif)


### Add more keyboard shortcuts for navigation


Now the following keyboard shortcuts are available for improved navigation along with tooltips that explain the shortcuts:

* On hover of checkbox show tooltip "Select `x`"
* On hover of checkbox show tooltip "Select all `mod+a`"
* On hover of Create button show tooltip "Create resource `c`"
* On hover of Delete button show tooltip "Delete selected resources `Shift+#`"
* On `Enter` select resource and go to view
* On `Esc` go from resource view back to list
* On hover of Edit button show tooltip "Edit resource `e`"
* On hover of Cancel button show tooltip "Go back `Esc`"
