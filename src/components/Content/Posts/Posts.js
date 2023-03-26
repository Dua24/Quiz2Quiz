
import { useEffect, useState } from 'react'
import PostItem from './PostItem'

const Posts = (props) => {
    const { posts, setPosts } = props
    return (
        <>
            {posts && posts.length > 0 && posts.map((post, i) => {
                return (
                    <PostItem
                        key={i}
                        post={post}
                        setPosts={setPosts}
                        i={i}
                    />
                )
            })}
        </>
    )
}
export default Posts

