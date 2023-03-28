import { useImmer } from "use-immer"
import Rate from "../Rate"
import "./DetailPost.scss"
import { BiMessage } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
const Comments = () => {
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
                }
            }
        }
    }
    const [comments, setComments] = useImmer(dataComment)

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
                    <div className="contain_fcmt">
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
                        {Object.entries(cmt.reply).map(([idReply1, reply]) => {
                            return (
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
                                    { }
                                </div>
                            )
                        })}
                    </div>
                )
            })}

        </div>
    )
}

export default Comments