import { useEffect, useState } from "react"

const Stats = ({labels, numbers}) => {
  const [numbersTotal, setNumbersTotal] = useState(0)

  useEffect(() => {
    const numbersTotalArray = Object.values(numbers)
    setNumbersTotal(([...new Set([].concat(...numbersTotalArray))]).length)
  }, [numbers])
  
  return (
    <div>
      <ul>
        {
          labels.length && (
            labels?.map((label) => {
              const numbersInLabel = numbers[label.id]?.length
              const percent = (numbersInLabel * 100) / numbersTotal
              return (
                <li>{label?.name}: {percent}</li>
              )
            })
          )
        }
      </ul>
    </div>
  )
}
export default Stats