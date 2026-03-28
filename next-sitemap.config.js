/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://booksociety-sb.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/admin/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/admin" },
    ],
  },
};
