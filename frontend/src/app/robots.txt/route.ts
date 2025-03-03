export function GET() {
    const robots = `
      User-agent: *
      ${process.env.ROBOT_TXT_ALLOW}
      Disallow: /api/admin/

      User-agent: facebookexternalhit
      ${process.env.ROBOT_TXT_ALLOW}
      Disallow: /api/admin/
    `;

    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
