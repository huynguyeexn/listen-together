import { Tables } from "@/database.types";
import client from "@/utils/mongodb/database";
import { MongoServerError, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET ALL VIDEO ON PLAYLIST
export async function GET(request: Request) {
  try {
    const db = client.db("listen-together");
    const playlist = await db
      .collection("playlist")
      .find({})
      .limit(10)
      .toArray();
    return Response.json(playlist);
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}

// ADD VIDEO TO PLAYLIST
export async function POST(request: Request) {
  try {
    const body = request.body;

    if (!body) {
      return Response.error();
    }
    const db = client.db("listen-together");
    const columns: string[] = [];

    const objects: { [key: string]: string } = await request.json();

    const isExists = await db.collection("playlist").findOne({
      _id: objects._id as unknown as ObjectId,
    });

    if (isExists) {
      return Response.json(
        {
          message: "Duplicate video",
        },
        {
          status: 401,
        }
      );
    }

    const playlist = await db.collection("playlist").insertOne(objects);
    return Response.json(playlist);
  } catch (error) {
    return Response.error();
  }

  // const response = await supabase.from("playlist").insert(body);

  // return Response.json({ response });
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");

    if (!_id) return Response.error();

    const db = client.db("listen-together");

    const isExists = await db.collection("playlist").findOne({
      _id: _id as unknown as ObjectId,
    });

    if (!isExists) {
      return Response.json(
        {
          message: "OK",
        },
        {
          status: 201,
        }
      );
    }

    const playlist = await db.collection("playlist").deleteOne({
      _id: _id as unknown as ObjectId,
    });

    // const response = await sql`
    // DELETE FROM playlist WHERE ytb_id=${ytb_id}`;

    return Response.json(playlist);
  } catch (error) {
    console.log(error);

    return Response.error();
  }

  // const response = await supabase.from("playlist").insert(body);

  // return Response.json({ response });
}
