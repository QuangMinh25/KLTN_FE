import axios from 'axios'

export const get = async (url) => {
    const result = await axios({
        method: "GET",
        url: process.env.REACT_APP_URL_API + url
    })

    return result
}

export const post = async (url, data) => {
    const result = await axios({
        method: "POST",
        url: process.env.REACT_APP_URL_API + url,
        data: {
            ...data
        },
        headers: {
            "Accept": "*",
            'Content-Type': 'application/json'
        }
    })

    return result
}