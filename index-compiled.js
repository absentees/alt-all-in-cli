#!/usr/bin/env node

'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');
const Xray = require('x-ray');
const x = Xray();

// https://github.com/matthewmueller/x-ray/issues/62
function xToPromise(xQuery) {
		return new Promise((resolve, reject) => {
				xQuery((err, results) => {
						if (err) {
								reject(err);
						} else {
								resolve(results);
						}
				});
		});
}

_asyncToGenerator(function* () {
		const query = x('https://www.allin.wtf/current-issue', {
				stories: ['p@html']
		});

		let stories = yield xToPromise(query);
		console.log(stories);

		// xToPromise(query).then(
		// 	data => {
		// 		console.log(data);
		// 	},
		// 	err => {
		// 		console.log(err);
		// 	}
		// );


		// let stories;
		//
		// x('https://www.allin.wtf/current-issue', {
		// 	stories: ['p@html']
		// })(function(err, obj) {
		// 	console.log(obj);
		// });
})();

// x('http://www.imdb.com/', {
//   title: ['title'],
//   links: x('.rhs-body .rhs-row', [{
//     text: 'a',
//     href: 'a@href',
//     next_page: x('a@href', {
//       title: 'title',
//       heading: 'h1'
//     })
//   }])
// })(function (err, obj) {
//   console.log(err, obj)
// })
