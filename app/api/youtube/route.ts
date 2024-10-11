// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");

//   const key = process.env.YOUTUBE_API_KEY;

//   console.log(
//     `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${key}&id=${id}`
//   );

//   const { data } = await fetch(
//     `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${key}&id=${id}`
//   ).then((res) => {
//     // console.log(res.json());
//     return res.json();
//   });

//   return Response.json({ data });
// }

// // export async function POST() {
// //   const { data } = await supabase.from("playlist").insert();

// //   return Response.json({ data });
// // }
