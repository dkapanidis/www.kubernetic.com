---
title: 'Kubernetic v4.0.0 Released'
excerpt: 'Release v4.0.0 is out'
date: '2022-04-11'
---

Release v4.0.0 is out with UI improvements and some fixes.

You can check the complete list of changes on the [changelog](https://docs.kubernetic.com/changelog.html).

### Add keyboard navigation

Some pages now support keyboard shortcuts to navigate to them faster:

***Page Navigation***

When hovering on top of the menu items if there is a keyboard shortcut it will appear on the tooltip. For example to navigate to the deployments press g then d. The shortcuts are available when the cursor is outside of input fields.

![page navigation](/blog/release-4-0-0/page-navigation.png)

***Rows Selection***

On resources the list items can now be selected using keyboard navigation:

* **↑** / **↓** arrows navigate through the resources.
* **x** selects the current resource.
* **cmd+a** selects/deselects all resources.

![rows selection](/blog/release-4-0-0/rows-selection.gif)

***Hide Menu***

To optimize screen usage you can now resize the menu:

* you can drag the edge of the menu to increase/decrease the size.
* **[** keyboard shortcut will collapse/expand the menu.

![hide menu](/blog/release-4-0-0/hide-menu.gif)

On next releases a help screen will be added to display all keyboard shortcuts for better discovery.

### Enable copy/paste inside terminal

On previous versions it was not possible to copy/paste text from the terminal on linux and windows. Keyboard shortcuts already existed to the app for copy/paste (`ctrl+c` and `ctrl+v`) and you could use them in other areas (e.g. copy from view or edit screens) but they didn't work properly on Terminal.

This was due to `ctrl+c` being shadowed by the terminal shortcut for SIGINT signal.

To differentiate the two, the UI now checks if there is selected text on screen then `ctrl+c` is treated as copy, otherwise it is forwarded to terminal to be treated as SIGINT signal.

### Enable search bar inside editor

On previous versions on the editor when searching text (using `Cmd+F`) The search bar appeared and was functional but the search text was not visible. This is now fixed and text is now visible.

![search bar](/blog/release-4-0-0/search-bar.png)
