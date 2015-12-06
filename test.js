import test from 'ava';
import fn from './';

test('error', async t => {
	await t.throws(fn(), 'Expected a user');
});

test('result', async t => {
	const result = await fn('SamVerschueren');
	
	t.is(result.repo.name, 'SamVerschueren/latest-push');
});
