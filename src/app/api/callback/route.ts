import { type NextRequest } from 'next/server';


export async function POST(req: NextRequest) {
  return new Response(JSON.stringify({ req }));
}

export async function GET(req: NextRequest) {
  return new Response(JSON.stringify({ req }));
}


// https://dnmxbnxqqudcnnxusadg.supabase.co/auth/v1/callback