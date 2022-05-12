import * as axios from '../api'

export default  function useSubject () {

    const getSubjects = async () => {
        const result = await axios.get('subject')
        return result?.data?.data
    }

    return {
        getSubjects
    }
}