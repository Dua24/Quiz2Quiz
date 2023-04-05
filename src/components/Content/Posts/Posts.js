
import { useEffect, useState } from 'react'
import PostItem from './PostItem'
import { useContext } from 'react';
import { AuthContext } from '../../Context/Context';

const Posts = (props) => {
    const { posts, setPosts } = useContext(AuthContext);


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

