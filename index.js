#!/usr/bin/env node
'use strict';

require('babel-polyfill');
const Xray = require('x-ray');
const x = Xray();

// https://github.com/matthewmueller/x-ray/issues/62
function xToPromise(xQuery) {
  return new Promise((resolve, reject) => {
    xQuery((err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

function parseStories(stories){
	return stories.stories.map(function(story){
		return {
			title: 'title',
			url: 'url'
		};
	});
}

(async () => {
	const query = x('https://www.allin.wtf/current-issue', {
		stories: ['p@html']
	});

	let stories = await xToPromise(query);
	stories = parseStories(stories);
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
