# AngularJs Infinite Scroll Directive

Provides a directive for easy handling an infinite scroll in AngularJs applications.

##Install

Run a following command in terminal:

	bower install angularjs-infinite-scrolling --save-dev



##How to use

First: Add to your html page.

```html
<script src="./bower_components/angularjs-infinite-scrolling/dist/infiniteScroll.js"></script>
```

Second: Apply directive to a block which has css rule **overflow: hidden;**

```html
<div class="box-outter" ng-contoller="MainCtrl as mv>
	<div class="box" infinite-scroll="mv.loadMoreText" infinite-scroll-trigger-when="20">
		<div class="content" ng-bind="mv.content"></div>
	</div>
	<div class="loading" ng-show="mv.loading">Loading...</div>
</div>
```

Third: Define an infinite scroll handling function in your controller

```js
angular.module('myapp', ['InfiniteScroll'])
    .controller('MainCtrl', function($scope, $q) {
	    var ctrl = this;
    
	    ctrl.loading = false;
    
	    ctrl.loadMoreText = function () {
		    var defer = $q.defer();
		    
		    ctrl.loading = true
    
		    // Loading content...
		    
		    return defer.promise;
	    };
	    ctrl.content = 'Lorem ...';
    });
```

## Params
**infinite-scroll-trigger-when** - Contains a number which is a percent of a content that the scroll reaches to trigger a callback