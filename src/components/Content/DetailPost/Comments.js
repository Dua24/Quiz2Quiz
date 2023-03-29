import { useImmer } from "use-immer"
import Rate from "../Rate"
import "./DetailPost.scss"
import { BiMessage } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { useState } from "react"
import "../Posts/PostItem.scss"
import _ from 'lodash'
const Comments = () => {
    const [clickMoreCmts, setCLickMoreCmts] = useState(false)
    const [currentRepClicked, setCurrentRepClicked] = useState({})
    const dataComment = {
        1: {
            id: 1,
            num_Evaluate: 76,
            imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
            name: 'r/AskReddit1',
            cmt_time: '7 seconds',
            cmt_detail: 'What video game have you played a most?',
            reply: {
                11: {
                    id: 11,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?1',
                },
                12: {
                    id: 12,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?2',
                },
                13: {
                    id: 13,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?3',
                },
                14: {
                    id: 14,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?4',
                },
                15: {
                    id: 15,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?5',
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
                21: {
                    id: 21,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?',

                },
                22: {
                    id: 22,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?',

                },
                33: {
                    id: 33,
                    num_Evaluate: 76,
                    imgUser: 'https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_tijjpyw1qe201.png',
                    name: 'r/AskReddit1',
                    cmt_time: '7 seconds',
                    cmt_detail: 'What video game have you played the most?',
                },
                44: {
                    id: 44,
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

    const limitCmtObj = (objComments, idCmt) => {
        const limtiCmts = 2
        if (!clickMoreCmts) {
            if (_.isObject(objComments) && !_.isEmpty(objComments)) {
                if (_.size(objComments) <= limtiCmts) {
                    return objComments
                } else {
                    return getFirstNObj(objComments, limtiCmts)
                }
            }
        } else {
            if (idCmt === currentRepClicked.idCmt) {
                return Object.keys(comments[+idCmt].reply).slice(0).reduce((result, key) => {
                    result[key] = objComments[key];
                    return result;
                }, {})
            } else {
                return getFirstNObj(objComments, limtiCmts)
            }
        }
    }

    const handleClickShowHideCmts = (type, idCmt) => {
        setCurrentRepClicked({
            idCmt
        })
        if (type === "show") {
            setCLickMoreCmts(true)

        } else {
            setCLickMoreCmts(false)
        }
    }

    const handleShowMoreCmt = (obj, id, idCmt) => {
        if (!clickMoreCmts) {
            return Object.keys(obj).length > 2 && +id === obj[Object.keys(obj)[1]].id
                ?
                <span
                    className="moreCmts"
                    onClick={() => handleClickShowHideCmts("show", idCmt)}
                >
                    {Object.keys(obj).length - 2}
                    more replies
                </span>
                :
                <></>
        } else {
            if (idCmt !== currentRepClicked.idCmt) {
                return Object.keys(obj).length > 2 && +id === obj[Object.keys(obj)[1]].id
                    ?
                    <span
                        className="moreCmts"
                        onClick={() => handleClickShowHideCmts("show", idCmt)}
                    >
                        {Object.keys(obj).length - 2}
                        more replies
                    </span>
                    :
                    <></>
            } else {
                return + id === Object.values(obj).pop().id
                    ?
                    <span
                        className="moreCmts"
                        onClick={() => handleClickShowHideCmts("hide", idCmt)}
                    >
                        Hide replies
                    </span>
                    :
                    <></>
            }

        }
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
        <div className="comments-container" >
            {
                Object.entries(comments).map(([idCmt, cmt]) => {
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
                                        <Rate post={cmt} setPosts={setComments} type="comment" idReply={cmt.id} />
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
                                {Object.entries(limitCmtObj(cmt.reply, idCmt)).map(([idReply1, reply]) => {
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

                                            </div>
                                            {handleShowMoreCmt(cmt.reply, idReply1, idCmt)}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
            }

        </div >
    )
}

export default Comments