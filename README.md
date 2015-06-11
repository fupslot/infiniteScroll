###How to use


####HTML

```html
<div class="box-outter" ng-contoller="MainCtrl as mv>
	<div class="box" infinite-scrolling="mv.loadMoreText" infinite-scrolling-trigger-when="20">
		<div class="content" ng-bind="mv.content"></div>
	</div>
	<div class="loading" ng-show="mv.loading">Loading...</div>
</div>
```

####JS
```js
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

### Params
**infinite-scrolling-trigger-when** - Contains a number which is a percent of a content that the scroll reaches to trigger a callback