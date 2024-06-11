import { useState, useRef, useEffect } from 'react';
import style from './settings.module.scss'
import Notifications from './notifications/notifications'
import Search_input from '../search__input/search__input'

import array_back from '../../assets/svg/system/array_back.svg'

import notifications from '../../assets/svg/settings/notifications.svg';
import privacy_and_security from '../../assets/svg/settings/privacy_and_security.svg';
import chat_settings from '../../assets/svg/settings/chat_settings.svg';
import stickers from '../../assets/svg/settings/stickers.svg';
import folders from '../../assets/svg/settings/folders.svg';
import advanced_settings from '../../assets/svg/settings/advanced_settings.svg';
import language from '../../assets/svg/settings/language.svg';
import telegram_faq from '../../assets/svg/settings/telegram_faq.svg';
import ask_a_question from '../../assets/svg/settings/ask_a_question.svg';

export default function Settings() {
    const setting_sarray = [
        {
            title: 'Notifications',
            img: notifications
        },
        {
            title: 'Privacy and Security',
            img: privacy_and_security
        },
        {
            title: 'Chat Settings',
            img: chat_settings
        },
        {
            title: 'Stickers',
            img: stickers
        },
        {
            title: 'Folders',
            img: folders
        },
        {
            title: 'Advanced Settings',
            img: advanced_settings
        },
        {
            title: 'Language',
            img: language
        },
        {
            title: 'Telegram FAQ',
            img: telegram_faq
        },
        {
            title: 'Ask a Question',
            img: ask_a_question
        },
    ]

    //
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const startX = useRef<number>(0);
    const startWidth = useRef<number>(0);
    const rectangleRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (rectangleRef.current) {
            setIsResizing(true);
            startX.current = e.pageX;
            startWidth.current = rectangleRef.current.clientWidth;
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isResizing && rectangleRef.current) {
            const newWidth = startWidth.current + (e.pageX - startX.current);
            rectangleRef.current.style.width = newWidth + 'px';
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);
    //
    return (
        <div className={style.parent}>
            <div className={style.rectangle} ref={rectangleRef}>
                <div><div><img src={array_back} alt="back" /></div><p>Settings</p></div>  {/*можно потом попытатся брать текст из роута */}
                <Search_input />
                {setting_sarray.map((v, i) => (<div className={style.setting_item}><img src={v.img} alt={i.toString()} /><p>{v.title}</p></div>))}
                <div className={style.resize_handle} onMouseDown={handleMouseDown}></div>
            </div>
            <Notifications />
        </div>
    )

}