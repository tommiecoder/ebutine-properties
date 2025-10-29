export default async function handler(req, res) {
      return new Response(JSON.stringify({ message: "Hello from Railway!" }), {
          status: 200,
              headers: { "Content-Type": "application/json" },
                });
                }
}