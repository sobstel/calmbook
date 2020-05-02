import dayjs from "dayjs";

export default function generateFeed(page: Page) {
  const updated = page.posts[0].timestamp;

  const entries = page.posts
    .map((post) => {
      const link = `https://calmbook.sobstel.now.sh/${page.url}#${post.timestamp}`;

      const images = post.images
        .map((image) => `<img src=${image} alt="" />`)
        .join("");

      return `
        <entry>
          <id>${post.timestamp}</id>
          <title>${post.title}</title>
          <updated>${dayjs(post.timestamp).format(
            "YYYY-MM-DDTHH:mm:ssZ"
          )}</updated>
          <content><![CDATA[
            <div>${post.message}</div>
            <div>${images}</div>
          ]]></content>
          <link href="${link}">${link}</link>
        </entry>
      `;
    })
    .join("");

  return `
    <?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <id>https://calmbook.now.sh/${page.url}.xml</id>
      <title>${page.name}</title>
      <updated>${dayjs(updated).format("YYYY-MM-DDTHH:mm:ssZ")}</updated>
      <icon><![CDATA[${page.avatar}]]></icon>
      <logo><![CDATA[${page.avatar}]]></logo>
      ${entries}
      <generator>calmbook.now.sh</generator>
    </feed>
  `.trim();
}
