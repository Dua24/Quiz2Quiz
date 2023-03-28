import { RxThickArrowDown, RxThickArrowUp } from 'react-icons/rx'
import { useState } from 'react'
const Rate = (props) => {
    const { setPosts, post } = props
    const [isLike, setIsLike] = useState(false)
    const [isDislike, setIsDislike] = useState(false)
    const handleLikeCount = (type, id) => {
        setPosts(draft => {
            const p = draft.find((p) => { return p.id === id })
            if (!p['EvaluateType']) {
                if (type === 'like') {
                    console.log(1)
                    p.num_Evaluate += 1
                    p['EvaluateType'] = 'like'
                    setIsLike(true)
                    setIsDislike(false)
                } else {
                    p.num_Evaluate -= 1
                    p['EvaluateType'] = 'dislike'
                    setIsDislike(true)
                    setIsLike(false)

                }
            } else {
                if (type === 'like') {
                    if (!isLike) {
                        p.num_Evaluate += 2
                        p['EvaluateType'] = 'like'
                        setIsLike(true)
                        setIsDislike(false)
                    }
                } else if (type === "dislike") {
                    if (!isDislike) {
                        p.num_Evaluate -= 2
                        p['EvaluateType'] = 'dislike'
                        setIsDislike(true)
                        setIsLike(false)
                    }
                }
            }

        })

    }
    const handleActiveClassEvaluate = (type, evaluated) => {
        if (evaluated === type) {
            return 'active'
        } else {
            return ''
        }
    }
    return (
        <div className="rate">
            <span
                onClick={() => handleLikeCount('like', post.id)}
                className={`like ${handleActiveClassEvaluate('like', post.EvaluateType)}`}
            >
                <RxThickArrowUp />
            </span>
            <span className="num_Evaluate">{post.num_Evaluate}</span>
            <span
                className={`dislike ${handleActiveClassEvaluate('dislike', post.EvaluateType)}`}
                onClick={() => handleLikeCount('dislike', post.id)}

            >
                <RxThickArrowDown />
            </span>
        </div>
    )
}

export default Rate