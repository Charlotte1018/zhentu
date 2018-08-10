export function http(msg) {
    return new Promise((resolve, reject) => {
        fetch(msg.url,
            {
                method: 'POST',
                body: JSON.stringify(msg.data),
                mode: 'cors',
                cache: 'default'
            }).then(res => res.json()).then(res => {
                if (res.error === 0) {
                    resolve(res.data);
                } else {
                    reject(res);
                }

            })
    })
}
