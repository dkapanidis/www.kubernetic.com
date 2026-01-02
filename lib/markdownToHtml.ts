import rehypePrettyCode from 'rehype-pretty-code'
import html from 'rehype-stringify'
import emoji from 'remark-emoji'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import slug from 'remark-slug'
import { unified } from 'unified'
var extractToc = require("remark-extract-toc");

export default async function markdownToHtml(text: string) {
  const result = await unified()
    .use(markdown)
    .use(slug)
    .use(emoji)
    .use(remark2rehype as any)
    .use(rehypePrettyCode, {
      theme: 'github-dark',
      keepBackground: true,
    })
    .use(html)
    .process(text);

  return result.toString()
}

export async function markdownToToc(text: string): Promise<string[]> {
  var processor = await unified().use(markdown).use(extractToc);
   
  var node = processor.parse(text);
  var tree:any = processor.runSync(node);
  
  const toc = tree.map((f:any) => f.value)
  
  return toc;
}
