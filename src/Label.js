const Label = ({label, numbers}) => {
  if (label.deleted) return <></>
  const colors = {
    0: 'rgb(255, 148, 133)',
    1: 'rgb(100, 196, 255)',
    2: 'rgb(255, 212, 41)',
    3: 'rgb(223, 174, 240)',
    4: 'rgb(153, 182, 193)',
    5: 'rgb(85, 204, 179)',
    6: 'rgb(255, 157, 255)',
    7: 'rgb(255, 157, 255)',
    8: 'rgb(109, 124, 206)'
  }

  return (
    <div>
        <div style={{backgroundColor: colors[label.color]}}>{label.name}</div>
        <ul>
          {numbers?.length && (
            numbers.map((number) => (
              <li>
                <a href={`https://wa.me/${number.split('-')[0]}`} target="_blank" rel="noreferrer">{number.split('-')[0]}</a>
                -{number.split('-')[1]}
                </li>
            ))
          )}
        </ul>
    </div>
  )
}
export default Label