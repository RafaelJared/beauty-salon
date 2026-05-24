import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { name, phone, service, date, time } = body;

    if (!name || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from("appointments")
      .select("id")
      .eq("date", date)
      .eq("time", time)
      .eq("status", "pending");

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "This time slot is already taken. Please choose another." },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("appointments")
      .insert([{ name, phone, service, date, time, status: "pending" }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, appointment: data });
  } catch (e: any) {
    console.error("Appointment error:", e);
    return NextResponse.json(
      { error: e.message ?? "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ appointments: [] });
  }

  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    let query = supabase
      .from("appointments")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (date) query = query.eq("date", date);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ appointments: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
