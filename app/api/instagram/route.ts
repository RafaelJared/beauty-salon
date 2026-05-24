import { NextResponse } from "next/server";

const TOKEN   = process.env.INSTAGRAM_ACCESS_TOKEN;
const USER_ID = process.env.INSTAGRAM_USER_ID;

export const revalidate = 3600; // cache 1 hour (ISR)

export async function GET() {
  if (!TOKEN || !USER_ID) {
    return NextResponse.json(
      { error: "Instagram not configured", posts: [] },
      { status: 200 }
    );
  }

  try {
    const fields = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";
    const url = `https://graph.instagram.com/${USER_ID}/media?fields=${fields}&limit=12&access_token=${TOKEN}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      const err = await res.text();
      console.error("Instagram API error:", err);
      return NextResponse.json({ posts: [], error: "API error" });
    }

    const data = await res.json();

    // Filter out videos if you only want images (optional)
    const posts = (data.data ?? []).filter(
      (p: any) => p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM"
    );

    return NextResponse.json({ posts });
  } catch (e) {
    console.error("Instagram fetch failed:", e);
    return NextResponse.json({ posts: [], error: "fetch failed" });
  }
}
