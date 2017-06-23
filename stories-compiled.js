#!/usr/bin/env node


'use strict';

let getStories = (() => {
	var _ref = _asyncToGenerator(function* () {
		const query = x('https://www.allin.wtf/current-issue', {
			stories: ['p@html']
		});

		let stories = yield xToPromise(query);
		stories = parseStories(stories);

		return stories;
	});

	return function getStories() {
		return _ref.apply(this, arguments);
	};
})();

let run = (() => {
	var _ref2 = _asyncToGenerator(function* () {
		let stories = yield getStories();
		let titles = stories.map(function (choice) {
			return choice.title;
		});
		let choice;
		let markdownArticle;

		console.log('Alt All In CLI');
		inquirer.prompt([{
			type: 'list',
			name: 'articleChoice',
			message: 'What would you like to read?',
			choices: titles,
			filter: function (val) {
				let url;

				stories.forEach(function (story) {
					if (story.title == val) {
						url = story.url;
					}
				});

				return url;
			}
		}]).then(function (answers) {

			reader(answers.articleChoice, function (err, article, res) {
				// Main Article
				if (article.content) {
					markdownArticle = toMarkdown(article.content);

					tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
						if (err) throw err;

						fs.writeFile(path, markdownArticle, function (err) {
							if (err) {
								return console.log(err);
							}
							console.log(cliMd(path));
						});
					});
				} else {
					console.log("No article content");
				}
			});
		});
	});

	return function run() {
		return _ref2.apply(this, arguments);
	};
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');
const Xray = require('x-ray');
const x = Xray();
const inquirer = require('inquirer');
const urlRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/g;
const titleRegex = /.+?(?=, <a)/g;
const reader = require('node-read');
const toMarkdown = require('to-markdown');
const cliMd = require("mdy");
const tmp = require('tmp');
const fs = require('fs');

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

;

;

run();
