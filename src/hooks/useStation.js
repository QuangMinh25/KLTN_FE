import * as axios from '../api'

export default  function useStation () {

    const getStation = async () => {
        const result = await axios.get('station')
        return result?.data?.data
    }

    return {
        getStation
    }
}