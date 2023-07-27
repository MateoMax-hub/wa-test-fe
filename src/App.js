import { useEffect, useState } from 'react';
import { useRef } from 'react';
import io from 'socket.io-client';
import Label from './Label';
import Stats from './Stats';
const socketIo = io('http://localhost:4000', {
  path: '/socket/'
});

const App = () => {
  const [labels, setLabels] = useState([{
		id: '2',
		name: 'Nuevo pedido',
		predefinedId: '0',
		color: 2,
		deleted: false
	},
	{
		id: '10',
		name: 'Nuevo cliente',
		predefinedId: '1',
		color: 7,
		deleted: false
	},
	{
		id: '4',
		name: 'Pago pendiente',
		predefinedId: '2',
		color: 3,
		deleted: false
	},
	{
		id: '9',
		name: 'Pagado',
		predefinedId: '3',
		color: 6,
		deleted: false
	},
	{
		id: '5',
		name: 'Pedido finalizado',
		predefinedId: '4',
		color: 5,
		deleted: false
	}])
  const [labelAssociations, setLabelAssociations] = useState({})
  const socket = useRef();

  useEffect(() => {
    socket.current = socketIo;
    socket.current.on('label-association', (data) => {
      handleAssiociations(data)
    })
    socket.current.on('label-edit', (data) => {
      handleLabels(data)
    })
  }, [])

  const handleAssiociations = (event) => {
    console.log(event)
    setLabelAssociations((previous) => {
      const numberToAssociate = event['labels.association'].association.chatId.split('@')[0]
      const date = new Date().toLocaleString()
      const completeNumber = numberToAssociate + '-' + date
      const labelToAssociate = event['labels.association'].association.labelId
      const type = event['labels.association'].type
      const labelStored = Object.keys(previous).some((label) => label === labelToAssociate)
      let newPropValue
      if (type === 'add') {
        if (!labelStored) {
          newPropValue = [completeNumber]
        } else {
          const numberAlreadyAssociated = previous[labelToAssociate]?.some((number) => number.split('-')[0] === numberToAssociate)
          if (numberAlreadyAssociated) return previous
          newPropValue = [...(previous[labelToAssociate] || []), completeNumber]
        }
      } else {
        if (!labelStored) return previous
        const restOfNumbers = previous[labelToAssociate]?.filter((number) => number.split('-')[0] !== numberToAssociate)
        newPropValue = restOfNumbers
      }
      return {
        ...previous,
        [labelToAssociate]: newPropValue
      }
    })
  } 

  const handleLabels = (event) => {
    // console.log(event)
    setLabels((previous) => {
      const isANewLabel = !(previous.some((label) => label.id === event['labels.edit'].id))
      if (isANewLabel) return [...previous, event['labels.edit']]
      const labelEdited = previous.map((label) => {
        if (label.id !== event['labels.edit']?.id) return label
        return event['labels.edit']
      })
      return labelEdited
    })
  }

  useEffect(() => {
    console.log(labelAssociations)
  }, [labelAssociations])
  
  return (
    <div>
      {
        labels.length && (
          labels.map((label) => (
            <Label label={label} numbers={labelAssociations[label.id]}/>
          ))
        )
      }
      <Stats labels={labels} numbers={labelAssociations}/>
    </div>
  )
}
export default App
