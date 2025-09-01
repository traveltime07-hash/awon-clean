export const config = { runtime: 'edge' };

export default async function handler(_req: Request): Promise<Response> {
  const env = (process.env.VERCEL_ENV || 'unknown') as string;
  const commit = (process.env.VERCEL_GIT_COMMIT_SHA || '') as string;
  const body = JSON.stringify({
    env,
    commit,
    commitShort: commit ? commit.substring(0, 7) : '',
    message: process.env.VERCEL_GIT_COMMIT_MESSAGE || '',
    author: process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN || process.env.VERCEL_GIT_COMMIT_AUTHOR_NAME || '',
    repoOwner: process.env.VERCEL_GIT_REPO_OWNER || '',
    repoSlug: process.env.VERCEL_GIT_REPO_SLUG || '',
    vercelUrl: process.env.VERCEL_URL || '',
    timestamp: new Date().toISOString()
  }, null, 2);

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*"
    }
  });
}
