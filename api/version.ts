export const config = { runtime: 'edge' };

function env(name: string, fallback = ''): string {
  // w Edge nie ma "process" w TS – czytamy z globalThis, żeby TS się nie czepiał
  const p = (globalThis as any)?.process?.env;
  return (p && typeof p[name] === 'string') ? String(p[name]) : fallback;
}

export default async function handler(_req: Request): Promise<Response> {
  const data = {
    env: env('VERCEL_ENV', 'unknown'),
    commit: env('VERCEL_GIT_COMMIT_SHA'),
    commitShort: env('VERCEL_GIT_COMMIT_SHA').slice(0, 7),
    message: env('VERCEL_GIT_COMMIT_MESSAGE'),
    author: env('VERCEL_GIT_COMMIT_AUTHOR_LOGIN') || env('VERCEL_GIT_COMMIT_AUTHOR_NAME'),
    repoOwner: env('VERCEL_GIT_REPO_OWNER'),
    repoSlug: env('VERCEL_GIT_REPO_SLUG'),
    vercelUrl: env('VERCEL_URL'),
    timestamp: new Date().toISOString()
  };

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*"
    }
  });
}
