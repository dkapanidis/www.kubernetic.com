---
title: 'Kubernetic v4.2.0 Released'
excerpt: 'Release v4.2.0 is out'
date: '2022-06-28'
---

Release v4.1.0 is out with performance improvements and some fixes.

### Resources sorted by age

![sort-by-age](/blog/release-4-2-0/sort-by-age.png)

Resources table can be sorted by any column. Sorting is done alphabetically, but there are some columns that should be treated specially, more specifically the ones that represent relative time. Until now those are sorted as the rest, but given the above example `15s, 23s, 1h2m` alphabetically will not make sense.

In order to resolve this the relative time is converted to seconds and then compared. This is done for all known columns with relative time such as `age`, `first seen`, `last seen`, `duration`, `last schedule` but also dynamically for any CRD that contain `type: date` fields such as [Tekton](https://tekton.dev/)'s `start time`, `completion time` in TaskRuns & PipelineRuns.

See [#285](https://github.com/harbur/kubernetic/issues/285) [#265](https://github.com/harbur/kubernetic/issues/265) [#22](https://github.com/harbur/kubernetic/issues/22) [#360](https://github.com/harbur/kubernetic/issues/360)

### Improved Logs

![context-menu-logs](/blog/release-4-2-0/context-menu-logs.png)

On any worload resources there is an option to see the logs of the running Pods, for example on a `backend` Deployment with 3 replicas you can see the logs of the 3 running Pods on the deployment Logs tab. You can now access directly the logs from the context menu by right clicking on the Deployment and selecting `View Logs` or simply pressing `L` using the keyboard shortcuts.

The Logs UI has also been improved to be able to show ANSI logs, and the performance of the logs has been dramatically improved. Logs can now be streamed from the beginning or since a relative time period (e.g. `48h`).

![ansi-logs](/blog/release-4-2-0/ansi-logs.png)

[#297](https://github.com/harbur/kubernetic/issues/297) [#80](https://github.com/harbur/kubernetic/issues/80)