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
  const width = window.innerWidth / 100;
  const widthOneFifth = width * 5;
  const widthQuarter = width * 20;
  const widthHalf = width * 60;

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
  const [menuMargin, setMenuMargin] = useState<SetMargin>({
    marginLeft: "inherit",
  });

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
    setMenuMargin({ marginLeft: "-5px" });
  };
  const settingsBig = () => {
    setChatsWidth(widthQuarter);
    setVisibleWidth({
      display: "block",
    });
    setVisibleHeader({
      justifyContent: "start",
    });
    setMenuMargin({ marginLeft: "inherit" });
  };

  const resizeChatsList = (positionX: number) => {
    if (widthQuarter >= positionX) {
      settingsBig()
      if (widthOneFifth >= positionX) {
        settingsLittle()
        setChatsWidth(widthOneFifth);
      }
    } else if (positionX <= widthHalf) {
      settingsBig()
      setChatsWidth(positionX);
    } else setChatsWidth(widthHalf);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      resizeChatsList(event.clientX);
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (
        (event.target as HTMLElement).className === style.chatlist__body_drag
      ) {
        document.addEventListener("mousemove", handleMouseMove);
        document.body.classList.add(style.removeSelect);
        document.body.style.cursor = "ew-resize";
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.classList.remove(style.removeSelect);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className={style.chatlist}>
      <div
        style={{ width: `${chatsWidth}px` }}
        className={style.chatlist__body}
      >
        <div style={visibleHeader} className={style.chatlist__body__header}>
          <div style={menuMargin} className={style.body__header__menu}>
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
          <div style={visibleHeader} className={style.body__list__contact}>
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
            <p
              style={visibleWidth}
              className={style.list__contact__LongContent}
            >
              . . .
            </p>
            <p style={visibleWidth} className={style.list__contact__time}>
              2:49 PM
            </p>
          </div>

          <div style={visibleHeader} className={style.body__list__contact}>
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
            <p
              style={visibleWidth}
              className={style.list__contact__LongContent}
            >
              . . .
            </p>
            <p style={visibleWidth} className={style.list__contact__time}>
              2:49 PM
            </p>
          </div>
        </div>
        <div className={style.chatlist__body_drag}></div>
      </div>
    </section>
  );
};
