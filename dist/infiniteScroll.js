(function(angular){
	'use strict';

	angular.module('InfiniteScroll', [])
		.directive('infiniteScroll', function($q){
			return {
				strict: 'A',
				link: function(scope, el, attrs) {
					var percentLeft = parseInt(attrs.infiniteScrollTriggerWhen) || 10;
					var triggerOn = (100 - percentLeft) / 100;
					var callback = scope.$eval(attrs.infiniteScroll);
					var hasCallback = angular.isFunction(callback);
					var waitUntilPromise = false;

					if (!hasCallback) {
						throw new Error('Infinite Scroll: Callback function must be specified');
					}

					el.on('scroll', _.debounce(function(e){
						var target = e.target;
						var scrollValue = (target.scrollTop / (target.scrollHeight - target.clientHeight));
						if(!waitUntilPromise && hasCallback && scrollValue >= triggerOn) {
							// disable scroll
							disableScroll();
							var promise = callback();
							if (isPromise(promise)) {
								waitUntilPromise = true;
								promise.finally(function(){
									enableScroll();
									waitUntilPromise = false;
								});
							}
							else {
								enableScroll();
							}
							scope.$digest();
						}
					},100));

					scope.$on('$destroy', function () {
						el.off('scroll');
					});

					function isPromise (promise) {
						return promise && typeof promise.finally === 'function';
					}

					function disableScroll(){
						el.css({
						 	'overflow': 'hidden'
						});
					}

					function enableScroll () {
						el.css({
						 	'overflow': null
						});
					}
				}
			};
		});
}(angular));