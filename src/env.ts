import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	DATABASE_URL: { description: 'The database connection string.' },
	DATABASE_AUTH_TOKEN: {
		description: 'Auth token for the [Turso](https://turso.tech) database.'
	},
	HCA_CLIENT_ID: {
		description: 'Hack Club Auth app client ID (auth.hackclub.com/developer/apps)'
	},
	HCA_CLIENT_SECRET: {
		description: 'Hack Club Auth app client secret. Server only, never sent to the browser.'
	}
});
