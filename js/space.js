console.log("App initiated");

const showSpinner = () => {
    document.getElementById('spinner-wrapper').style.display = 'block';
};
  
const hideSpinner = () => {
    document.getElementById('spinner-wrapper').style.display = 'none';
};

const getJSONData = (url) => {
    const result = {};
    showSpinner();
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then((response) => {
        result.status = 'ok';
        result.data = response;
        hideSpinner();
        return result;
      })
      .catch((error) => {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
      });
  };

async function search() {
    const val = document.getElementById("inputBuscar").value;
    console.log("To search", val);
    showSpinner();
    const result = await getJSONData(`https://images-api.nasa.gov/search?q=${val}`);
    let txt = '';
    if(result.status === 'ok') {
        const data = result.data;
        data.collection.items.forEach(item => {
            item.data.forEach(data=> {
                const { title, description, date_created } = data;
                const { href } = item.links ? item.links[0] : {href: 'https://dummyimage.com/600x400/000/fff'};
                txt += `<div class="col-4">
                    <div class="card">
                        <img src="${href}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text overflow-auto mb-0">
                                ${description}
                            </p>
                            <footer>
                                <small class="text-muted">${date_created}</small>
                            </footer>
                        </div>
                    </div>
                </div>`;
            })
        });   
    }
    document.querySelector('#contenedor .row').innerHTML = txt;
    hideSpinner();
}



const btn = document.getElementById('btnBuscar');
btn.addEventListener('click', search);