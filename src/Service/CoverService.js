export const ContentType = {
    JSON : "application/json;charset=UTF-8",
    FORM : "application/x-www-form-urlencoded; charset=UTF-8"
};
export const HttpMethod = {
    GET : "GET",
    POST : "POST",
    PUT : "PUT",
    DELETE : "DELETE"
};
export const _get = (url,body = null) => {
    if(body !== null){
        url = new URL(url);
        Object.keys(body).forEach(key => url.searchParams.append(key, body[key]));
    }

    const promise = fetch(url,{
        method : HttpMethod.GET
    });
    return handleFetch(promise);
};
export const _post = (url,body) => {
    const promise = fetch(url,{
        method : HttpMethod.POST,
        headers: ContentType.JSON,
        body : JSON.stringify(body)
    });
    return handleFetch(promise);
};
export const _delete = (url,body=null) => {
    const promise = fetch(url,{
        method : HttpMethod.DELETE,
    });
    return handleFetch(promise);
};

export const checkStatus = response => {
    if(response.status === 200){
        return response.json();
    }
    else {
        throw new Error();
    }
};
const handleFetch = promise => {
    return promise
        .then(response => checkStatus(response))
        //.catch(() => dispatch(error(FAIL_RESULT.message)))
};


