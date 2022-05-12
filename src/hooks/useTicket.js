import * as axios from '../api'

export default  function useTicket () {

    const postTicket = async (data) => {
        // console.log('<><><><>aaa', data)
        const result = await axios.post('ticket', data)
        // console.log('<><><><>result', result)
        return result
    }

    const getTicket = async (query) => {
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
        const result = await axios.get(`ticket` + qr)
        return result?.data?.data
    }

    return {
        postTicket,
        getTicket
    }
}