let cache = new Map()
cache.set('randomCodes', {
    data: '',
    time: '',
})
cache.set('searchUser', {
    data: '',
    time: '',
    username: '',
})

function checkRandomCodesCacheExpiry(){
    return cache.has('randomCodes') &&
        cache.get('randomCodes').time >
            Date.now() - process.env.CACHE_STORAGE_SECONDS * 1000
}

function getRandomCodesFromCache(){
    return cache.get('randomCodes').data;
}

function setRandomCodesInCache(object){
    cache.set('randomCodes', object);
}

function checkSearchUserCacheExpiry(username, sendContent){
    return cache.has('searchUser') &&
    cache.get('searchUser').time >
        Date.now() - process.env.CACHE_STORAGE_SECONDS * 1000 &&
    cache.get('searchUser').username === username &&
    cache.get('searchUser').sendContent === sendContent
}

function getSearchUserFromCache(){
    return cache.get('searchUser').data;
}

function setSearchUserInCache(object){
    cache.set('searchUser', object);
}

module.exports = {
    checkRandomCodesCacheExpiry,
    getRandomCodesFromCache,
    setRandomCodesInCache,
    checkSearchUserCacheExpiry,
    getSearchUserFromCache,
    setSearchUserInCache
}
