import style from './index.module.scss'


function Index() {

  return (
    <>
      <div className={style.trex}>
        <p className={style.leftTop}></p>
        <p className={style.rightTop}></p>
        <p className={style.rightBottom}></p>
        <p className={style.leftBottom}></p>
      </div>
    </>
  )
}

export default Index
