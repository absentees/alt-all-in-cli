#!/usr/bin/env node

'use strict';

require('babel-polyfill');
const Xray = require('x-ray');
const x = Xray();
const urlRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/g;
const titleRegex = /.+?(?=, <a)/g;

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

function parseStories(stories) {
	return stories.stories.map(function (story) {
		if (urlRegex.test(story) && titleRegex.test(story)) {
			return {
				title: story.match(titleRegex)[0],
				url: story.match(urlRegex)[0]
			};
		}
	});
}

(async() => {
	const query = x('https://www.allin.wtf/current-issue', {
		stories: ['p@html']
	});

	let stories = await xToPromise(query);
	stories = parseStories(stories);
	console.log(stories);
})();
