import { useEffect, useMemo, useState } from "react";
import { ChatListVanish, BurgerPosition } from "../../types/ChatListTypes";
import style from "./ChatList.module.scss";
//import avatar from "../../../public/avatar.jpg";

export const ChatList = () => {
  const width = window.innerWidth / 100;
  const widthOneFifth = useMemo(() => width * 5, [width]);
  const widthQuarter = useMemo(() => width * 15, [width]);
  const widthHalf = useMemo(() => width * 60, [width]);
  //(window.innerWidth / 100) * 20
  //ширина экрана на 100, получаем 1vw - и ширину ставим на 20vw
  const [chatsWidth, setChatsWidth] = useState<number>(widthQuarter);
  const [visibleWidth, setVisibleWidth] = useState<ChatListVanish>({
    display: "block",
  });
  const [visibleHeader, setVisibleHeader] = useState<BurgerPosition>({
    justifyContent: "inherit",
  });
  const resizeChatsList = (positionX: number) => {
    //Получаем X, делаем проверки на выход из границ и просто меняем ширину дива
    //игнорирование сжатия
    if (widthQuarter >= positionX) {
      //сжатие на 5vw и игнорирование ширины
      if (widthOneFifth >= positionX) {
        //Настраиваем визуальное отображение верх части
        setVisibleWidth({
          display: "none",
        });
        setVisibleHeader({
          justifyContent: "center",
        });
        setChatsWidth(widthOneFifth);
      }
      //сжатие до
    } else if (positionX <= widthHalf) {
      //Настраиваем визуальное отображение верх части
      setVisibleWidth({
        display: "block",
      });
      setVisibleHeader({
        justifyContent: "start",
      });
      setChatsWidth(positionX);
    }
  };

  useEffect(() => {
    //Создаем переменную для контроливания интервала
    let interval = setInterval(() => console.log("await"), 99999);
    //координата, для изменения ширины
    let x = 0;

    //меняем координату при изменение позиции
    document.addEventListener("mousemove", (event) => {
      x = event.clientX;
    });

    //проверяем клик, в случае если по границе, то делаем действие
    //конкретно изменение ширины по кд
    document.addEventListener("mousedown", (event: Event) => {
      if (
        (event.target as HTMLStyleElement).className ===
        style.chatlist__body_drag
      ) {
        interval = setInterval(() => {
          resizeChatsList(x);
        }, 1);
        //запрет выделения текста - фикс баг
        document.body.classList.add(style.removeSelect);
        document.body.style.cursor = "ew-resize";
      }
    });

    //удаляем кд изменение ширины
    document.addEventListener("mouseup", () => {
      clearInterval(interval);
      //разрешение выделения текста - фикс баг
      document.body.classList.remove(style.removeSelect);
      document.body.style.cursor = "default";
    });
  });

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

        <div
          onResize={() => console.log("resize")}
          className={style.chatlist__body_drag}
        ></div>
      </div>
    </section>
  );
};
