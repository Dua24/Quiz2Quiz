import { useImmer } from "use-immer"
import Rate from "../Rate"
import "./DetailPost.scss"
import { BiMessage } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { useState } from "react"
import _ from 'lodash'
const Comments = () => {
    const [clickMoreCmts, setCLickMoreCmts] = useState(false)
    const dataComment = {
        1: {
            id: 1,
            num_Evaluate: 76,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit1',
            cmt_time: '7 seconds',
            cmt_detail: 'What video game have you played the most?',
            reply: {
                1: {
                    id: 1,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?',
                },
                2: {
                    id: 2,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?',
                },
                3: {
                    id: 3,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?',
                },
                4: {
                    id: 4,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?',
                },
                5: {
                    id: 5,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?',
                }
            }
        },
        2: {
            id: 2,
            num_Evaluate: 76,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit1',
            cmt_time: '7 seconds',
            cmt_detail: 'What video game have you played the most?',
            reply: {
                1: {
                    id: 1,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?',
                    reply2: {
                        1: {
                            id: 1,
                            num_Evaluate: 76,
                            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                            name: 'r/AskReddit1',
                            cmt_time: '7 seconds',
                            cmt_detail: 'REPLY 333',
                        },
                        2: {
                            id: 2,
                            num_Evaluate: 76,
                            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                            name: 'r/AskReddit1',
                            cmt_time: '7 seconds',
                            cmt_detail: 'REPLY 333',
                        },
                        3: {
                            id: 3,
                            num_Evaluate: 76,
                            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                            name: 'r/AskReddit1',
                            cmt_time: '7 seconds',
                            cmt_detail: 'REPLY 333',
                        }

                    }
                },
                2: {
                    id: 2,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?',
                }
            }
        }
    }
    const [comments, setComments] = useImmer(dataComment)

    const limitCmtObj = (objComments) => {
        if (!clickMoreCmts) {
            const limtiCmts = 2
            if (_.isObject(objComments) && !_.isEmpty(objComments)) {
                if (_.size(objComments) <= limtiCmts) {
                    return objComments
                } else {
                    return getFirstNObj(objComments, limtiCmts)
                }
            }
        } else {
            setCLickMoreCmts(false)
            return showAllCmt(objComments)
        }
    }

    const showAllCmt = (objCommentsobj) => {
        console.log(">>>>", objCommentsobj)
        console.log(Object.keys(objCommentsobj).slice(2).reduce((result, key) => {
            result[key] = objCommentsobj[key];
            return result;
        }, {}))
        return Object.keys(objCommentsobj).slice(2).reduce((result, key) => {
            result[key] = objCommentsobj[key];
            return result;
        }, {})
    }
    const handleCLickShowAllCmt = (objCommentsobj) => {
        setCLickMoreCmts(true)


    }
    const handleShowMoreCmt = (obj, id) => {
        return Object.keys(obj).length > 2 && +id === obj[Object.keys(obj)[1]].id
            ?
            <span
                className="moreCmts"
                onClick={() => handleCLickShowAllCmt(obj)}
            >
                {Object.keys(obj).length - 2}
                more replies
            </span>
            :
            <></>
    }

    const getFirstNObj = (obj, n) => {
        return Object.keys(obj) //get the keys out
            .sort() //this will ensure consistent ordering of what you will get back. If you want something in non-aphabetical order, you will need to supply a custom sorting function
            .slice(0, n) //get the first N
            .reduce(function (memo, current) { //generate a new object out of them
                memo[current] = obj[current]
                return memo;
            }, {})
    }

    // const comment = {
    //     1: {
    //         id_cmt: 1,
    //         user_avt: ,
    //         user_name: ,
    //         user_postTime: ,
    //         content: ,
    //         content_evaluate: ,
    //         reply: {
    //             1: {
    //                 id_reply: 1,
    //                 user_avt: ,
    //                 user_name: ,
    //                 user_postTime: ,
    //                 content: ,
    //                 content_evaluate: ,
    //                 reply_child: {
    //                     1: {}
    //                 }
    //             }
    //         }
    //     }
    // }
    return (
        <div className="comments-container">
            {Object.entries(comments).map(([idCmt, cmt]) => {
                return (
                    <div className="contain_fcmt" key={idCmt}>
                        <div className="line_level"></div>
                        <div className="f_cmt" key={idCmt}>
                            <div className="f_cmter">
                                <img src={cmt.imgUser} />
                            </div>
                            <div className="f-cmt_content">
                                <div className="info">
                                    <div className="header_post">
                                        <div className="g2">
                                            <span className="name">{cmt.name}</span>
                                            <span className='dot'>•</span>
                                            <span className="post_time">{cmt.cmt_time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="detail">
                                    {cmt.cmt_detail}
                                </div>
                                <div className="actions">
                                    <Rate post={cmt} setPosts={setComments} type="comment" />
                                    <span>
                                        <BiMessage />
                                        Message
                                    </span>
                                    <span>
                                        Share
                                    </span>
                                    <span>
                                        <BsThreeDots />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="contain_fcmt_lv2">
                            {Object.entries(limitCmtObj(cmt.reply)).map(([idReply1, reply]) => {
                                return (
                                    <div key={idReply1}>
                                        <div className="contain_fcmt lv2">
                                            <div className="line_level"></div>
                                            <div className="f_cmt" key={idReply1}>
                                                <div className="f_cmter">
                                                    <img src={reply.imgUser} />
                                                </div>
                                                <div className="f-cmt_content">
                                                    <div className="info">
                                                        <div className="header_post">
                                                            <div className="g2">
                                                                <span className="name">{reply.name}</span>
                                                                <span className='dot'>•</span>
                                                                <span className="post_time">{reply.cmt_time}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="detail">
                                                        {reply.cmt_detail}
                                                    </div>
                                                    <div className="actions">
                                                        <Rate post={cmt} setPosts={setComments} type="comment" idCmt={idCmt} idReply={idReply1} />
                                                        <span>
                                                            <BiMessage />
                                                            Message
                                                        </span>
                                                        <span>
                                                            Share
                                                        </span>
                                                        <span>
                                                            <BsThreeDots />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="contain_fcmt_lv3">
                                                {reply.reply2 && Object.entries(reply.reply2).map(([idReply2, reply2]) => {
                                                    return (
                                                        <div key={idReply2}>
                                                            <div className="contain_fcmt lv3">
                                                                <div className="line_level"></div>
                                                                <div className="f_cmt" key={idReply2}>
                                                                    <div className="f_cmter">
                                                                        <img src={reply2.imgUser} />
                                                                    </div>
                                                                    <div className="f-cmt_content">
                                                                        <div className="info">
                                                                            <div className="header_post">
                                                                                <div className="g2">
                                                                                    <span className="name">{reply2.name}</span>
                                                                                    <span className='dot'>•</span>
                                                                                    <span className="post_time">{reply2.cmt_time}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="detail">
                                                                            {reply2.cmt_detail}
                                                                        </div>
                                                                        <div className="actions">
                                                                            <Rate post={cmt} setPosts={setComments} type="comment" idCmt={idCmt} idReply={idReply2} />
                                                                            <span>
                                                                                <BiMessage />
                                                                                Message
                                                                            </span>
                                                                            <span>
                                                                                Share
                                                                            </span>
                                                                            <span>
                                                                                <BsThreeDots />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {handleShowMoreCmt(reply.reply2, idReply2)}

                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        {handleShowMoreCmt(comments[idCmt].reply, idReply1)}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Comments