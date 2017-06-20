#!/usr/bin/env node
'use strict';

require('babel-polyfill');
var Xray = require('x-ray');
var x = Xray();

(() => {

	x('https://www.allin.wtf/current-issue', {
		title: 'p',
		url: x('p', ['a@href'])
	})(function(err, obj){
		console.log(obj);
	});

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
