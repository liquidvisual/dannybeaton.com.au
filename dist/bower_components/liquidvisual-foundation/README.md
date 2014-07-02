Liquid Visual Foundation (pre-alpha)
----

LVF is a personal codebase of mine, with a trusted collection of libraries used across many professional projects.

Zurb's Foundation 5 is at the core of LVF, having used it extensively I've come to build upon parts, customise certain pieces and make it my own.

Version
----

0.0.0.1

##Tech

LVF uses a number of open source projects to work properly. In the latest version, IE8 is **no longer supported**.

* Zurb Foundation 5 - excellent framework to hit the ground running
* Zurb Foundation Icons - handy set of icon fonts
* jQuery - javascript library
* Modernizr - feature detector
* Animate - CSS animation library
* Prism - syntax highlighting
* BXSlider - reliable and responsive carousel / content slider
* NProgress - (faux) preloading of content
* ScrollTo - for scrolling the viewport
* Magnific Popup - a simply brilliant responsive lightbox
* WOW - for timing and delaying CSS animations
* LV Topbar - a completely custom and standalone topbar

## Installation

First you'll want to install Node & Bower and grab all dependancies.

```sh
git clone [git-repo-url] liquidvisual-foundation
cd liquidvisual-foundation
npm install
bower install
grunt serve
```

Then navigate to /examples to see what's available. (Major WIP)

##### Configure the SCSS files:

* Copy the contents of /scss into your project folder's scss directory
* Ensure the paths are correct in those files. Some will be referencing Bower components so make sure they're where they should be.
* Modify the settings files to your liking.

More to come shortly. Currently refactoring.










