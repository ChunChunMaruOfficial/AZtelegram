import { useEffect, useState } from "react";
import style from "./ChatList.module.scss";

export const ChatList = () => {
  const widthOneFifth = (window.innerWidth / 100) * 5;
  const widthQuarter = (window.innerWidth / 100) * 15;
  const widthHalf = (window.innerWidth / 100) * 60;
  //(window.innerWidth / 100) * 20
  //ширина экрана на 100, получаем 1vw - и ширину ставим на 20vw
  const [chatsWidth, setChatsWidth] = useState<number>(widthQuarter);
  const resizeChatsList = (positionX: number) => {
    //Получаем X, делаем проверки на выход из границ и просто меняем ширину дива
    //игнорирование сжатия
    if (widthQuarter >= positionX) {
      //сжатие на 5vw и игнорирование ширины
      if (widthOneFifth >= positionX) {
        setChatsWidth(widthOneFifth);
      }
      //сжатие до
    } else if (positionX <= widthHalf) {
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
    document.addEventListener("mousedown", (event) => {
      if (event.target.className === style.chatlist__body_drag) {
        interval = setInterval(() => {
          resizeChatsList(x);
        }, 1);
        document.body.style.cursor = "ew-resize";
      }
    });

    //удаляем кд изменение ширины
    document.addEventListener("mouseup", () => {
      clearInterval(interval);
      document.body.style.cursor = "default";
    });
  }, []);

  return (
    <section className={style.chatlist}>
      <div
        style={{ width: `${chatsWidth}px` }}
        className={style.chatlist__body}
      >
        <div
          onResize={() => console.log("resize")}
          className={style.chatlist__body_drag}
        ></div>
      </div>
    </section>
  );
};
