
import { useEffect, useState } from 'react'
import PostItem from './PostItem'
import { useContext } from 'react';
import { AuthContext } from '../../Context/Context';

const Posts = (props) => {
    const { posts } = props

    return (
        <>
            {posts && posts.length > 0 && posts.map((post, i) => {
                return (
                    <div key={i}>
                        <PostItem
                            post={post}
                            typeParent="list"
                            fetchPostsByUser={props.fetchPostsByUser}
                        />
                    </div>

                )
            })}
        </>
    )
}
export default Posts

