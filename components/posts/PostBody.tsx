import Post from "types/post"
import Title from "./Title"

type Props = { 
  post: Post,
}

const PostBody = ({ post }: Props) => {
  return (
    <div className="max-w-2xl prose mx-auto">
      <Title post={post}/>
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}

export default PostBody
