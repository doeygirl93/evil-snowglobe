import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Logged-in only. Send everyone else to Hack Club Auth.
export const load: PageServerLoad = ({ locals }) => {
	if (!locals.user) redirect(302, '/auth/login');
	return { user: locals.user };
};
