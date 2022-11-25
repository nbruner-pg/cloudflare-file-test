export interface Env {
	ghmc_kvpoc: KVNamespace;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {

		// // THIS Section is for pulling the file from the CDN
		// const start = Date.now();
		// let file = await fetch('https://www.cloudflare.com/resources/images/slt3lc6tev37/6mpY5zjlPP3b2twznUQOki/b221bc7b49723deb2c09a4b30747f685/cloudflare-cdn-whitepaper-19Q4.pdf');		
		// const end = Date.now();
		// const diff = end - start;		
		// let { readable, writable } = new TransformStream();
		// file.body?.pipeTo(writable);
		// let response = new Response(readable);
		// //end cdn section

		// THIS section is for pulling the file from the kv store
		const start = Date.now();
		let file = await env.ghmc_kvpoc.get('pdf', 'stream');
		const end = Date.now();
		const diff = end - start;
		let response = new Response(file);
		response.headers.append('Fetch-Time', diff.toString());
		// end kv section 

		return response;
	},
};
