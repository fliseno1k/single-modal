import { isDev } from './globals';

const STYLE = isDev
	? `
	background: #564CE0;
	color: white;
	padding: 2px 3px;
	border-radius: 2px;
	font-size: 0.8em;
`
	: '';

export function createAndLogError(message: string) {
	const err = new Error(message);
	const messageStr = err.stack || err.message;

	console.error('%cSingleModal error', STYLE, messageStr);

	return err;
}
