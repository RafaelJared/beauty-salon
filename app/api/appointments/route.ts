import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, service, date, time } = body;

    if (!name || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for existing appointment at same slot
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
  // Used by admin panel — requires service role
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
