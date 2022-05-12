
import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'

const TrainStation = createStore({
  initialState: {
    data: null,
    dataReturn: null,
    ticketSelected: [],
    objectKeyTrainStation: [],
    objectKeyTrainStationReturn: [],
    payment: 0 // 0 Paypal, 1 Tra Sau
  },
  actions: {
    setTrainStation: (data) => ({ setState }) => {
      setState({
        data: data
      })
    },
    setTrainStationReturn: (data) => ({ setState }) => {
      setState({
        dataReturn: data
      })
    },
    setTicketSelected: (data) => ({ setState }) => {
      setState({
        ticketSelected: [...data]
      })
    },
    setObjectKeyTrainStation: (data) => ({ setState }) => {
      setState({
        objectKeyTrainStation: [...data]
      })
    },
    setObjectKeyTrainStationReturn: (data) => ({ setState }) => {
      setState({
        objectKeyTrainStationReturn: [...data]
      })
    },
    setPayment: (data) => ({ setState }) => {
      setState({
        payment: data
      })
    }
  },
  name: 'TrainStation',
})

export const useHookTrainStation = createHook(TrainStation)
export const Container = createContainer(TrainStation, {
  onInit: () => ({ setState }, props) => {
    setState({ ...props })
  },
})

export const Subscriber = createSubscriber(TrainStation)
