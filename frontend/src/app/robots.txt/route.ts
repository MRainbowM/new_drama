export function GET() {
    const robots = `
      User-agent: *
      ${process.env.ROBOT_TXT_ALLOW}

      Disallow: /admin/
    `;

    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
