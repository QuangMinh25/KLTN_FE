import * as axios from '../api'

export default  function useReturnTicket () {

    const postReturnTicket = async (data) => {
        const result = await axios.post('return-ticket', data)
        return result
    }

    return {
        postReturnTicket
    }
}