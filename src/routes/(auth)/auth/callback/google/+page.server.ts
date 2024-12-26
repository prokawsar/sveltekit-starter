import { json, type ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = () => {
	console.log('callback')
	return json({})
}
