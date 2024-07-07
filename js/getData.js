async function getMovie(url,opt) {
    try{
        const resp = await fetch(url , opt)
        const data = await resp.json()
        return data?.results
    }
    catch(err){
        return []
    }
}

export default getMovie