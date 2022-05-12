
import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
const time = new Date()

const dataTicket = createStore({
  initialState: {
    data: {
      roundTrip: false,
      startDate: new Date(`${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} 00:00:00`).getTime(),
      endDate: new Date(`${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} 00:00:00`).getTime()
    }
  },
  actions: {
    setDataTicket: (data) => ({ setState }) => {
      setState({
        data: data
      })
    }
  },
  name: 'dataTicket',
})

export const useHookDataTicket = createHook(dataTicket)
export const Container = createContainer(dataTicket, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props })
  },
})

export const Subscriber = createSubscriber(dataTicket)
