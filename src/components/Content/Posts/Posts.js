
import { useEffect, useState } from 'react'
import PostItem from './PostItem'

const Posts = (props) => {
    const { posts, setPosts } = props
    return (
        <>
            {posts && posts.length > 0 && posts.map((post, i) => {
                return (
                    <div key={i}>
                        <PostItem
                            post={post}
                            setPosts={setPosts}
                            typeParent="list"
                        />
                    </div>

                )
            })}
        </>
    )
}
export default Posts

