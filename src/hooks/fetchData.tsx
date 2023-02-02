
export async function fetchData(url: string) {
    return await fetch(url)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => {
            console.log(err.message);
        })
}