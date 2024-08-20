export const prerender = false;

export async function GET() {
	return Response.json(
		{
			success: true,
			payload: "Hi there! I'm healthy...Thanks for checking up on me!",
		},
		{ status: 200 },
	);
}
