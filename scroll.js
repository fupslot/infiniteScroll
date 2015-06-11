(function(angular){
	'use strict';

	angular.module('myapp', [])
		.factory('$exceptionHandler', function(){
			return function(exception, cause){
				console.error(exception.message);
			}
		})
		.controller('MainCtrl', function($scope, $q) {
			var ctrl = this;
			ctrl.loading = false;
			ctrl.loadMoreText = function () {
				var defer = $q.defer();
				console.log('loading');
				ctrl.loading = true;
				setTimeout(function(){
					ctrl.content += 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit eius culpa saepe nemo molestias fugiat dolorem qui nesciunt accusamus iste quis, cumque eveniet, est! Dignissimos doloribus totam quisquam exercitationem assumenda et aut nulla amet voluptas, blanditiis sunt dicta suscipit rem incidunt, illo quibusdam possimus nisi quos accusantium ducimus quasi adipisci.';
					ctrl.loading = false;
					$scope.$digest();
					defer.resolve();
				}, 100);

				return defer.promise;
			};

			ctrl.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis nisi ut dolorem tenetur nam non ratione aperiam incidunt ipsa dolorum ex, inventore pariatur alias modi deserunt quidem perferendis soluta qui rem iusto numquam. Ad, soluta aut ipsum mollitia itaque numquam, beatae doloribus saepe natus tempora eaque dolore. Nulla cumque ex rerum veniam cupiditate repellendus, asperiores voluptatibus inventore error illum incidunt reprehenderit ducimus officiis quas id impedit voluptate officia ut modi eligendi nisi sit, optio accusantium, earum perspiciatis. Reprehenderit saepe facere ex, molestias nobis id odit veritatis natus accusamus tenetur laborum harum ad ab mollitia quas hic maiores blanditiis! Culpa ut nostrum facere vero, sunt minus eaque nisi debitis veritatis, ad magni. Quo ea minima nulla iure, autem quae magni, explicabo reiciendis repudiandae architecto dolores rem mollitia? Corporis nesciunt, illum blanditiis fuga debitis consectetur cupiditate, fugiat, tempore vero ad dolore optio consequatur possimus reprehenderit sit excepturi qui perspiciatis quasi voluptatibus. Ut distinctio, rem corporis, officiis doloribus harum libero ullam ducimus, nostrum nemo alias eius. Eius quasi provident autem, odio cumque atque assumenda aspernatur repellat, quo ad, eligendi praesentium labore quaerat modi molestias dolore rerum hic obcaecati tempora reprehenderit! Tenetur sit, quas soluta provident! Soluta omnis id illum, optio odit in sit.';
		})
		.directive('infiniteScrolling', function($q){
			return {
				strict: 'A',
				link: function(scope, el, attrs) {
					var percentLeft = parseInt(attrs.infiniteScrollingTriggerWhen) || 10;
					var triggerOn = (100 - percentLeft) / 100;
					var callback = scope.$eval(attrs.infiniteScrolling);
					var hasCallback = angular.isFunction(callback);
					var waitUntilPromise = false;

					if (!hasCallback) {
						throw new Error('Infinite Scroll: Callback function must be specified');
					}

					el.on('scroll', _.debounce(function(e){
						var target = e.target;
						var scrollValue = (target.scrollTop / (target.scrollHeight - target.clientHeight));
						if(!waitUntilPromise && hasCallback && scrollValue >= triggerOn) {
							var promise = callback();
							if (isPromise(promise)) {
								waitUntilPromise = true;
								promise.finally(function(){
									waitUntilPromise = false;
								});
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
				}
			};
		});
}(angular));