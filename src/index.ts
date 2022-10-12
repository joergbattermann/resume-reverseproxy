const standardResumeBaseUrl = 'https://standardresume.co'
const standardResumePathname = '/r/joergbattermann'
const standardResumeUrl = standardResumeBaseUrl + standardResumePathname

const faviconUrl = 'https://joergbattermann.com/img/favicon.ico'

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
			
			console.log("Received request for '" + request.url + "' with an extracted 'pathname' value of '" + pathname + "' and a 'searchParams' value of '" + searchParams.toString() +"'");

			let reverseProxiedRequestUrlString = ''

			if(!(!!pathname) || pathname === '/') {
				reverseProxiedRequestUrlString = standardResumeUrl
			}
			else if (pathname === '/icons/favicon.ico'){
				reverseProxiedRequestUrlString = faviconUrl
			}
			else {
				reverseProxiedRequestUrlString = standardResumeBaseUrl + pathname
			}

			const reverseProxiedRequestUrl = new URL(reverseProxiedRequestUrlString)
			
			if(!!searchParams){
				for (let searchParam of searchParams) {
					reverseProxiedRequestUrl.searchParams.set(searchParam[0], searchParam[1])
				}
			}

			console.log("Fetching and returning data from '" + reverseProxiedRequestUrl.toString() + "'");

			return await fetch(reverseProxiedRequestUrl.toString())
	},
};
