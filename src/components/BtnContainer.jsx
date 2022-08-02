

export const BtnContainer = ({ current,total, onClick }) => {
  return (  <div>
    <button type='button'  disabled={current===total} onClick={()=>onClick(1)}>
вперед
    </button>
    <button type='button' disabled={current===1}  onClick={()=>onClick(-1)} >
      назад 
        </button>
    </div>)
}