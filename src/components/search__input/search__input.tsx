import style from './search_input.module.scss'
import search from '../../assets/svg/search.svg'

export default function Search_input() {

  return (
    <div className={style.parent}>
      <input type="text" placeholder="Search"/> <img src={search} alt='search'/>
    </div>
  )
}
