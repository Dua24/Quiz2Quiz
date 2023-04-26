import { RxThickArrowDown, RxThickArrowUp } from 'react-icons/rx'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/Context';
import { useSelector } from 'react-redux';
import { getRatingsByUser, rate } from '../../services/apiServices';
import _ from 'lodash';
const Rate = (props) => {
    const { data, fetchListPosts, fetchDetailPost } = props
    const { setShowModalSignInUp } = useContext(AuthContext);
    const { isAuthenticated, account } = useSelector(state => state.user)
    const [typeRate, setTypeRate] = useState('')
    const [rattingsByUser, setRattingsByUser] = useState([])



    useEffect(() => {
        fetchRatingsByUser()
    }, [isAuthenticated])

    const fetchRatingsByUser = async () => {
        if (isAuthenticated) {
            const res = await getRatingsByUser(account.id)
            if (res && res.EC == 0) {
                setRattingsByUser(res.DT)
            }
        } else {
            setTypeRate('')
            setRattingsByUser([])
        }

    }

    useEffect(() => {
        if (isAuthenticated) {
            if (rattingsByUser && !_.isEmpty(rattingsByUser)) {
                rattingsByUser.forEach((e) => {
                    if (e.post === data._id) {
                        setTypeRate(e.type)
                    }
                })
            }
        }
    }, [rattingsByUser])


    const handleLikeCount = async (type, postId) => {
        if (!isAuthenticated) {
            setShowModalSignInUp(true)
            return;
        }
        const res = await rate(type, account.id, postId)
        if (res && res.EC === 0) {
            setTypeRate(type)
            fetchListPosts()
            fetchDetailPost()
        }
    }
    return (
        <div className="rate">
            <span
                onClick={() => handleLikeCount('like', data._id)}
                className={`like ${typeRate === 'like' && 'active'}`}
            >
                <RxThickArrowUp />
            </span>
            <span className="num_Evaluate">{data.num_Evaluate}</span>
            <span
                onClick={() => handleLikeCount('dislike', data._id)}
                className={`dislike ${typeRate === 'dislike' && 'active'}`}

            >
                <RxThickArrowDown />
            </span>
        </div>
    )
}

export default Rate