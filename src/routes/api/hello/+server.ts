import { json } from '@sveltejs/kit'
export function GET() {
    return json({ message: 'hello from server'})
};

export async function POST({ request }) {

    const body = await request.json();
    console.log('hewoooo gang gang gan got we got', body);

    return json({ recieved: body.name})
}