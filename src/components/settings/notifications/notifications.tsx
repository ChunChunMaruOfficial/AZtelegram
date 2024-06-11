import { useState } from 'react'

import style from './notifications.module.scss'

import channels from '../../../assets/svg/notifications/channels.svg'
import groups from '../../../assets/svg/notifications/groups.svg'
import private_chats from '../../../assets/svg/notifications/private_chats.svg'
import array_right from '../../../assets/svg/notifications/array_right.svg'


export default function Notifications() {
    const notifications_list = [{ title: 'Private Chats', icon: private_chats }, { title: 'Groups', icon: groups }, { title: 'Channels', icon: channels }]
    const menu_items = [
        {
            title: 'In-app notifications',
            fisrt_position: 'In-app Sound',
            second_position: 'In-app Preview'
        },

        {
            title: 'Events',
            fisrt_position: 'Contant joined Telegram',
            second_position: 'Pinned Messages'
        },

        {
            title: 'Badge Counter',
            fisrt_position: 'Include Muted Chats',
            second_position: 'Count Unread Messages'
        }
    ]
    return (
        <div className={style.parent}>
            <p>Notifications</p> {/*можно потом попытатся брать текст из роута */}
            {notifications_list.map((v, i) =>     
                {const [array_style, setarray_style] = useState('')
                    return (<div key={i} className={style.notifications_list}>
                        <div>
                            <img src={v.icon} alt={i.toString()} />
                            <span>
                                <p>{v.title}</p>
                                <p>nothing</p>
                            </span>
                        </div>
                        <img src={array_right} alt='open' className={array_style} onClick={() => array_style == style.rotate ? setarray_style(style.rerotate) : setarray_style(style.rotate)} />
                    </div>)
                })} 
            {menu_items.map((v, i) => (
                <div key={i} className={style.menu_items}>
                    <p>{v.title}</p>
                    <div>
                        <span><input type="checkbox" placeholder='1' /><p>{v.fisrt_position}</p> </span>
                        <span><input type="checkbox" placeholder='1' /><p>{v.second_position}</p> </span>
                    </div>
                </div>
            ))}
            <div>
                <p>Reset All Notifications</p>
                <p>Undo all notifications settings for all your contacts, groups and channels</p>
            </div>
        </div>
    )
}