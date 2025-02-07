import './App.scss'
import boat from './images/boat.jpg'
import {useRef, useState, useEffect} from "react";
import _ from 'lodash'
import classNames from 'classnames'
import dayjs from 'dayjs'
import axios from "axios";

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
// const defaultList = [{
//     // 评论id
//     rpid: 3, // 用户信息
//     user: {
//         uid: '13258165', avatar: car, uname: '周杰伦',
//     }, // 评论内容
//     content: '哎哟，不错哦', // 评论时间
//     ctime: '2023-10-18 08:15', like: 88,
// }, {
//     rpid: 2, user: {
//         uid: '36080105', avatar: forest, uname: '许嵩',
//     }, content: '我寻你千百度 日出到迟暮', ctime: '2023-11-13 11:29', like: 88,
// }, {
//     rpid: 1, user: {
//         uid: '30009257', avatar, uname: '黑马前端',
//     }, content: '学前端就来黑马', ctime: '2023-10-19 09:00', like: 66,
// }, {
//     rpid: 4, user: {
//         uid: '30009007', avatar, uname: '元宇宙',
//     }, content: '我轻轻来，不带走一片云彩；我轻轻地走，不招惹一片尘埃！', ctime: '2024-02-19 09:00', like: 16,
// }, {
//     rpid: 5, user: {
//         uid: '30009005', avatar, uname: '青玉',
//     }, content: '玉如意，玉如意，我爱她如玉，却不如意！', ctime: '2024-02-10 11:37', like: 160,
// },
// ]

// 当前登录用户信息
const user = {
    // 用户id
    uid: '30009005', // 用户头像
    avatar: boat, // 用户昵称
    uname: '青玉',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [{type: 'hot', text: '最热'}, {type: 'time', text: '最新'},]

function Item({item, onDelete}) {
    return (
        <div className="reply-item">
            {/* 头像 */}
            <div className="root-reply-avatar">
                <div className="bili-avatar">
                    <img
                        className="bili-avatar-img"
                        alt=""
                        src={item.user.avatar}
                    />
                </div>
            </div>

            <div className="content-wrap">
                {/* 用户名 */}
                <div className="user-info">
                    <div className="user-name">{item.user.uname}</div>
                </div>
                {/* 评论内容 */} 
                <div className="root-reply">
                    <span className="reply-content">{item.content}</span>
                    <div className="reply-info">
                        {/* 评论时间 */}
                        <span className="reply-time">{item.ctime}</span>
                        {/* 评论数量 */}
                        <span className="reply-time">点赞数:{item.like}</span>
                        {user.uid === item.user.uid && <span className="delete-btn" key={item.rpid}
                                                             onClick={() => onDelete(item.rpid)}>删除</span>}
                        {/*<span className="delete-btn" key={item.rpid} onClick={() => onDelete(item.rpid)}>删除</span>*/}
                    </div>
                </div>
            </div>
        </div>)
}

function useGetData() {
    const [commentList, setCommentList] = useState([])
    useEffect(() => {
        async function getCommentList() {
            const res = await axios.get('http://localhost:3002/list')
            setCommentList(res.data)
        }

        getCommentList()
    }, [])

    return {commentList, setCommentList}
}

const App = () => {
    //const [commentList, setCommentList] = useState(_.orderBy(defaultList, 'like', 'desc'))

    // const [commentList, setCommentList] = useState([])
    // useEffect(() => {
    //     async function getCommentList() {
    //         const res = await axios.get('http://localhost:3002/list')
    //         setCommentList(res.data)
    //     }
    //
    //     getCommentList()
    // }, [])

    const {commentList, setCommentList} = useGetData()

    const deleteHandler = (id) => {
        setCommentList(commentList.filter(item => item.rpid !== id))
    }

    const [type, setType] = useState('hot')
    const changeType = (type) => {
        setType(type)
        if (type === 'hot') {
            setCommentList(_.orderBy(commentList, 'like', 'desc'));
            // setCommentList(commentList.sort((a, b) => b.like - a.like))
        } else {
            setCommentList(_.orderBy(commentList, 'ctime', 'desc'));
            // setCommentList(commentList.sort((a, b) => new Date(b.ctime) - new Date(a.ctime)))
        }
    }

    const [content, setContent] = useState('')
    const contentRef = useRef(null)

    const publish = () => {
        if (content.trim() === '') {
            alert('评论内容不能为空')
            return
        }
        const newComment = {
            rpid: _.orderBy(commentList, 'rpid', 'desc')[0].rpid + 1,
            user: user,
            content: content,
            ctime: dayjs(new Date()).format('YYYY-MM-DD hh:mm'),
            like: 0,
        }
        setCommentList([newComment, ...commentList])
        setContent('')
        contentRef.current.focus()
    }

    return (<div className="app">
        {/* 导航 Tab */}
        <div className="reply-navigation">
            <ul className="nav-bar">
                <li className="nav-title">
                    <span className="nav-title-text">评论</span>
                    {/* 评论数量 */}
                    <span className="total-reply">{10}</span>
                </li>
                <li className="nav-sort">
                    {/* 高亮类名： active */}
                    {tabs.map(item => <span
                        key={item.type}
                        onClick={() => changeType(item.type)}
                        className={classNames('nav-item', {active: type === item.type})}>
                        {item.text}
                    </span>)}
                </li>
            </ul>
        </div>

        <div className="reply-wrap">
            {/* 发表评论 */}
            <div className="box-normal">
                {/* 当前用户头像 */}
                <div className="reply-box-avatar">
                    <div className="bili-avatar">
                        <img className="bili-avatar-img" src={user.avatar} alt="用户头像"/>
                    </div>
                </div>
                <div className="reply-box-wrap">
                    {/* 评论框 */}
                    <textarea
                        className="reply-box-textarea"
                        placeholder="发一条友善的评论"
                        value={content}
                        ref={contentRef}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {/* 发布按钮 */}
                    <div className="reply-box-send" onClick={() => publish()}>
                        <div className="send-text">发布</div>
                    </div>
                </div>
            </div>

            <div className="reply-list">
                {commentList.map(item => <Item item={item} key={item.rpid} onDelete={deleteHandler}/>)}
            </div>
        </div>
    </div>)
}

export default App