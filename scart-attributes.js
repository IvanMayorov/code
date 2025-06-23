let scartgoods = document.querySelectorAll('[data-scart=card]');
let cartBox = document.querySelector('[data-scart=cartbox]');
let counter = document.querySelector('[data-scart=counter]');
let miniSum = document.querySelector('[data-scart=minisum] > span');

if(miniSum){
    miniSum.textContent = 0;
}


let byeButton = document.querySelectorAll('[data-scart=button]');
document.querySelector('[data-scart=row] [data-scart=img]').removeAttribute("srcset"); //Картинка внутри шаблона строки товара в корзине
let rowCart = document.querySelector('[data-scart=row]').cloneNode(true);

let productsWrp = document.querySelector('[data-scart=row]').parentElement
let formResultInput = document.createElement("textarea");
formResultInput.name = "Заказ";
formResultInput.style.display = "none";

document.querySelector('[data-scart=sum]').after(formResultInput);
let sCart;
if (localStorage.getItem('sCart')) {
    sCart = JSON.parse(localStorage.getItem('sCart'));
} else {
    sCart = {};
    localStorage.setItem('sCart', JSON.stringify(sCart));
}



deleteCart();
refreshCart();

function deleteCart() {
    document.querySelectorAll('[data-scart=row]').forEach((element) => {
        element.remove();
    });
}

function ProdObj(title, img, price, descr) {
    this.title = title;
    this.img = img;
    this.price = price;
    this.description = descr;
}

function addToCard(element) {

    let title = element.querySelector('[data-scart=title]').innerText;
    let img = element.querySelector('[data-scart=img]').src;
    let price = parseInt(element.querySelector('[data-scart=price]').innerText.replace(/[^0-9.]/gim, ""));
    console.log(price);
    let product = new ProdObj(title, img, price, );
    let jProd = JSON.stringify(product);
    
 
    if (jProd in sCart) {
        let count = +sCart[jProd] + 1;
        sCart[jProd] = count;
        localStorage.setItem('sCart', JSON.stringify(sCart));
        refreshCart();

    } else {
        sCart[jProd] = 1;
        localStorage.setItem('sCart', JSON.stringify(sCart));
        refreshCart();
    }
}

function createIdObject(curRow) {
    let titleRow = curRow.querySelector('[data-scart=title]').innerText;
    let description = curRow.querySelector('[data-scart=description]')?.innerText || '';
    let imgRow = curRow.querySelector('[data-scart=img]').src;
    let priceRow = parseInt(curRow.querySelector('[data-scart=price]').innerText.replace(/[^0-9.]/gim, ""));
    let productRow = new ProdObj(titleRow, imgRow, priceRow);
    let strCartRow = JSON.stringify(productRow);
    return strCartRow;

}

document.onclick = (e) => {
    if (e.target.getAttribute('data-scart') == 'remove') {
        console.log('remove')
        let curRow = e.target.closest('[data-scart=row]');
        console.log(sCart[createIdObject(curRow)])
        delete sCart[createIdObject(curRow)];
        localStorage.setItem('sCart', JSON.stringify(sCart));
        refreshCart();

    } else if (e.target.getAttribute('data-scart') == 'minus') {
        let key = createIdObject(e.target.closest('[data-scart=row]'));
        if (sCart[key] > 1) {
            console.log('minus')
            sCart[key] -= 1;
            localStorage.setItem('sCart', JSON.stringify(sCart));
            refreshCart();
        }

    } else if (e.target.getAttribute('data-scart') == 'plus') {
        let key = createIdObject(e.target.closest('[data-scart=row]'));
        sCart[key] += 1;
        localStorage.setItem('sCart', JSON.stringify(sCart));
        refreshCart();
    }

};

function refreshCart() {
    deleteCart();
    let result = 0;
    let count = 0;
    if (localStorage.getItem('sCart')) {
        let keys = Object.keys(JSON.parse(localStorage.getItem('sCart')));
        let resultForTextarea = "";
        for (let key of keys) {
            
            let good = JSON.parse(key);
        
            if (sCart[key] == null ) {
                localStorage.removeItem('sCart');
            }
            rowCart.querySelector('[data-scart=title]').innerText = good.title;
            // if (good.description) {
            //     rowCart.querySelector('[data-scart=description]').innerText = good.description;
            // }
            rowCart.querySelector('[data-scart=img]').src = good.img;
            result += good.price * sCart[key];
            rowCart.querySelector('[data-scart=price]').innerHTML = String(good.price).replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;");
            rowCart.querySelector('[data-scart=count]').innerText = sCart[key];
            count += +rowCart.querySelector('[data-scart=count]').innerHTML;
            productsWrp.append(rowCart);
            rowCart = document.querySelector('[data-scart=row]').cloneNode(true);
            resultForTextarea += `${good.title} — ${sCart[key]} шт. — цена: ${good.price}\n${good.description}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\r`;
        }
        let resultWithSpase = String(result).replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;");
        if (miniSum) {
            miniSum.innerHTML = resultWithSpase;
            if (count == 0) {
                counter.classList.remove('scart-show');
                cartBox.classList.remove('scart-show');
            } else {
                counter.classList.add('scart-show');
                cartBox.classList.add('scart-show');
            }
            counter.textContent = count;
        }
        
        
        document.querySelector('[data-scart=sum] > span').innerHTML = resultWithSpase;
        
        resultForTextarea += `Сумма: ${resultWithSpase}`;
        formResultInput.innerHTML = resultForTextarea;
    }
}


byeButton.forEach(element => {
    element.onclick = function () {
        let card = this.closest('[data-scart=card]');
        addToCard(card);
    };
});

let observer = new MutationObserver(() => {
    if (productsWrp.childElementCount == 0 && $('[data-remodal-id = "cart"]').length > 0) {
        let inst = $('[data-remodal-id = "cart"]').remodal();
        inst.close();
    }
});


observer.observe(productsWrp, {
    childList: true,
    subtree: true
});
// =====================================================================================




document.querySelectorAll('[data-scart=options-box] > div').forEach(element => {
    element.addEventListener('click', (event) => {
        let descr = element.getAttribute('data-scart-description')
        let allOptions = element.closest('[data-scart=options-box]').children
        // console.log(allOptions)
        for (let option of allOptions) {
            option.classList.remove('opt-active')
        }
        // allOptions.forEach(e=>e.classList.remove('opt-active'))
        element.classList.add('opt-active')
        updatePrice(element.closest('[data-scart=card]'))

    });
});



scartgoods.forEach(card => {
    card.setAttribute('data-initial-price', card.querySelector('[data-scart=price]').textContent.replace(/\s/g, ''))
    // updatePrice(card)
    
});

function updatePrice(card) {
    let sum = +card.getAttribute('data-initial-price')
    let descr = ''
    let discount = 1

    card.querySelectorAll('.opt-active').forEach(elem => {
        sum += +elem.getAttribute('data-scart-cost')
        descr += elem.closest('[data-scart=options-box]').getAttribute("data-scart-description") + ' : ' + elem.querySelector('div').textContent + '\n';

        //Если есть атрибут с диcконтом
        if (elem.hasAttribute('data-scart-discount')) {
            
            discount = elem.getAttribute('data-scart-discount')
            
        }

    })
    card.querySelector('[data-scart=price]').innerHTML = String(Math.round(sum*discount)).replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;")
    const oldPrice = card.querySelector('[data-scart=old-price]')
    // console.log('oldPrice', oldPrice)
  
    if (discount < 1) {
        card.querySelector('[data-scart=old-price]').innerHTML = String(sum).replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;")
        card.querySelector('[data-scart=old-price]').parentElement.style.visibility = "visible"
    }
    else {
        card.querySelector('[data-scart=old-price]').parentElement.style.visibility = "hidden"
    }

  
    return descr
}
 