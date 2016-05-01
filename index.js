'use strict';
const ghGot = require('gh-got');
const parse = require('github-parse-link');

const fetch = (user, opts, url, page) => {
	page = page || 0;

	return ghGot(url || `users/${user}/events`, {token: opts.token})
		.then(res => {
			if (res.body.length === 0) {
				throw new Error('no contributions found for this user');
			}

			const pushEvents = res.body.filter(x => x.type === 'PushEvent' && opts.exclude.indexOf(x.id) === -1);

			if (pushEvents.length === 0) {
				const links = parse(res.headers.link);

				if (page >= opts.pages || !links.next) {
					throw new Error('No contributions found for this user');
				}

				return fetch(user, opts, links.next, page + 1);
			}

			return pushEvents[0];
		})
		.catch(err => {
			if (err.statusCode === 404) {
				throw new Error('No contributions found for this user');
			}

			if (err.statusCode === 403 && err.response.headers['x-ratelimit-remaining'] === '0') {
				throw new Error('Rate limit exceeded');
			}

			throw err;
		});
};

module.exports = (user, opts) => {
	if (typeof user !== 'string') {
		return Promise.reject(new TypeError('Expected a user'));
	}

	return fetch(user, Object.assign({pages: 5, exclude: []}, opts));
};
