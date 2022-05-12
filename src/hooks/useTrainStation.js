import * as axios from '../api'

export default  function useTrainStation () {

    const getTrainStation = async (query) => {
        let qr = ''
        if (query.length !== 0) {
            qr = '?'
            query.map((item, index) => {
                if (index !== 0) {
                    qr = qr + '&'
                }
                qr = qr + item.name + '=' + item.value
            })
        }
        const result = await axios.get(`train-code` + qr)
        return result?.data?.data
    }

    return {
        getTrainStation
    }
}