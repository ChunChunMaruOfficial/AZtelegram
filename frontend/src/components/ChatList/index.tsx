import { useEffect, useState } from "react";
import {
  ChatListVanish,
  BurgerPosition,
  SetHandleChats,
  SetMargin,
} from "../../types/ChatListTypes";
import style from "./ChatList.module.scss";
import avatar from "../../../public/avatar.jpg";

export const ChatList = () => {
  //Статичные размеры, относительно экрана
  const width = window.innerWidth / 100;
  const widthOneFifth = width * 5;
  const widthQuarter = width * 20;
  const widthHalf = width * 60;

  //Стейты для работы с стилями
  const [chatsWidth, setChatsWidth] = useState<number>(widthQuarter);
  const [visibleWidth, setVisibleWidth] = useState<ChatListVanish>({
    display: "block",
  });
  const [visibleHeader, setVisibleHeader] = useState<BurgerPosition>({
    justifyContent: "inherit",
  });
  const [handleChats, setHandleChats] = useState<SetHandleChats>({
    height: "calc(97% - 40px)",
  });

  //Заготовка настройки для какого то положения
  const settingsLittle = () => {
    setVisibleWidth({
      display: "none",
    });
    setVisibleHeader({
      justifyContent: "center",
    });
    setHandleChats({
      height: "97%",
    });
  };
  const settingsBig = () => {
    setChatsWidth(widthQuarter);
    setVisibleWidth({
      display: "block",
    });
    setVisibleHeader({
      justifyContent: "start",
    });
  };

  //Функция для изменения ширины, с условиями
  const resizeChatsList = (positionX: number) => {
    if (widthQuarter >= positionX) {
      settingsBig();
      if (widthOneFifth >= positionX) {
        settingsLittle();
        setChatsWidth(widthOneFifth);
      }
    } else if (positionX <= widthHalf) {
      settingsBig();
      setChatsWidth(positionX);
    } else setChatsWidth(widthHalf);
  };

  //Отслеживание, перетаскивание и т.д.
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      //меняем ширину списка чатов, при активации
      resizeChatsList(event.clientX);
    };

    const handleMouseDown = (event: MouseEvent) => {
      //При клике, проверяем обьект на нужный, и в случае, если это конец списка чатов
      //то меняемкурсор, отслеживаем жвижение и добавляем клаcc, которые запрещает выделять
      if (
        (event.target as HTMLElement).className === style.chatlist__body_drag
      ) {
        document.addEventListener("mousemove", handleMouseMove);
        document.body.style.cursor = "ew-resize";
      }
    };

    const handleMouseUp = () => {
      //после поднятия кнопки, удаляем отслеживание мышки и делаем нормальный курсор
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "default";
    };

    //По умолчанию отслеживаем только клик и поднятие клика, чтобы лишний раз не нагружать mousemove
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      //удаляем отслеживание, чтобы не копилось
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  //для спама чатов
  const list = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ];

  return (
    <section className={style.chatlist}>
      <div
        style={{ width: `${chatsWidth}px` }}
        className={style.chatlist__body}
      >
        <div style={visibleHeader} className={style.chatlist__body__header}>
          <div className={style.body__header__menu}>
            <p className={style.header__menu__button}></p>
            <p className={style.header__menu__button}></p>
            <p className={style.header__menu__button}></p>
          </div>
          <p style={visibleWidth} className={style.body__header__title}>
            Chats
          </p>
        </div>
        <input
          style={visibleWidth}
          placeholder="Search"
          className={style.chatlist__body__search}
          type="text"
        />
        <div style={handleChats} className={style.chatlist__body__list}>
          {list.map((el, id) => (
            <div
              key={id}
              style={visibleHeader}
              className={style.body__list__contact}
            >
              <div className={style.list__contact__img}>
                <img src={avatar} alt="avatar" />
              </div>
              <p style={visibleWidth} className={style.list__contact__userName}>
                KANTNOLI
              </p>

              <p style={visibleWidth} className={style.list__contact__content}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Provident inventore sed deleniti dolorem accusamus id ipsa
                tempore, illo, assumenda dicta praesentium aliquam quis nisi
                expedita unde neque alias pariatur adipisci!
              </p>
              <p style={visibleWidth} className={style.list__contact__time}>
                2:49 PM
              </p>
            </div>
          ))}
        </div>
        <div className={style.chatlist__body_drag}></div>
      </div>
    </section>
  );
};
