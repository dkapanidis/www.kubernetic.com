
import Link from 'next/link'
import React from 'react'
import Post from 'types/post'

interface Props { post: Post }
function Title({ post }: Props) {
    return (
        <div className="flex items-center">
            <div className="text-2xl font-bold tracking-tight text-black">{post.title}</div>
        </div>
    )
}

export default Title
