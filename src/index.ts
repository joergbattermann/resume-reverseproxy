const standardResumeUrl = 'https://standardresume.co/r/joergbattermann'

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext): Promise<Response> {
			
			const { pathname }  = new URL(request.url)
			const { searchParams } = new URL(request.url)
			
			const requestUrl = new URL(standardResumeUrl + pathname)
			
			if(!!searchParams){
				for (let searchParam of searchParams) {
					requestUrl.searchParams.set(searchParam[0], searchParam[1])
				}
			}

			console.log("Fetching and return data from '" + requestUrl.toString() + "'");

			return await fetch(requestUrl.toString())
	},
};
