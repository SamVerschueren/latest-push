import test from 'ava';
import fn from './';

test('error', t => {
	t.throws(fn(), 'Expected a user');
});

test('result', async t => {
	const result = await fn('SamVerschueren');

	t.is(result.repo.name, 'SamVerschueren/latest-push');
});

test('exclude', async t => {
	const result = await fn('SamVerschueren');
	const excludedResult = await fn('SamVerschueren', {exclude: [result.id]});

	t.not(excludedResult.id, result.id);
});
