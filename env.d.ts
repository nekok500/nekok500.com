interface CloudflareEnv {
  // Add here the Cloudflare Bindings you want to have available in your application
  // (for more details on Bindings see: https://developers.cloudflare.com/pages/functions/bindings/)
  //
  // KV Example:
  // MY_KV: KVNamespace
  MICROCMS_API_KEY: string;
  MICROCMS_WEBHOOK_SIGNATURE_SECRET: string;
  __NEXT_ON_PAGES__KV_SUSPENSE_CACHE: KVNamespace;
}
