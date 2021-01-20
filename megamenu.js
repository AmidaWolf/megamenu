const urlJSON = new URL('https://jsonplaceholder.typicode.com/posts'); //past url

function createMenu (itemsList) {
    let categoriesView = new DocumentFragment();
    let subcategoriesView = new DocumentFragment();
    let subsubcategoriesView = new DocumentFragment();

    for(let i = 0; i<itemsList.length; i++) {

        if (itemsList[i].subcategories && itemsList[i].subcategories.length > 0) {

            for(let x = 0; x<itemsList[i].subcategories.length; x++) {

                if (itemsList[i].subcategories[x].subsubcategories
                    && itemsList[i].subcategories[x].subsubcategories.length > 0) {

                    for(let y = 0; y<itemsList[i].subcategories[x].subsubcategories.length; y++) {
                        let subsubcategories = document.createElement("li");
                        subsubcategories.className = "subcategories__item";

                        let link = itemsList[i].subcategories[x].subsubcategories[y].href;
                        let linkText = document.createTextNode(itemsList[i].subcategories[x].subsubcategories[y].name);
                        let a = document.createElement("a");
                        a.appendChild(linkText);
                        a.className = "subcategories__item-link";
                        a.href = link;

                        subsubcategories.appendChild(a);
                        subsubcategoriesView.appendChild(subsubcategories);
                    }

                }

                let subcategoriesWrapper = document.createElement("div");
                subcategoriesWrapper.className = "subcategories-wrapper";

                let subcategories = document.createElement("ul");
                subcategories.className = "subcategories";

                let link = itemsList[i].subcategories[x].href;
                let h2Text = document.createTextNode(itemsList[i].subcategories[x].name);
                let a = document.createElement("a");
                let h2 = document.createElement("h2");
                h2.className = "subcategories__title";
                h2.appendChild(h2Text);
                a.className = "subcategories__title-link";
                a.appendChild(h2);
                a.href = link;

                subcategories.appendChild(a);
                subcategories.appendChild(subsubcategoriesView);

                subcategoriesWrapper.appendChild(subcategories);

                subcategoriesView.appendChild(subcategoriesWrapper);
            }

        }

        let startIconLink = itemsList[i].startIcon;
        let endIconLink = itemsList[i].endIcon;
        let imageCategoryLink = itemsList[i].img;
        let link = itemsList[i].href;
        let linkText = document.createTextNode(itemsList[i].name);

        let startIcon = document.createElement("img");
        startIcon.className = "categories__icon";
        startIcon.src = startIconLink;
        startIcon.alt = "icon";
        startIcon.height = 24;
        startIcon.width = 24;

        let endIcon = document.createElement("img");
        endIcon.className = "categories__link-chevron";
        endIcon.src = endIconLink;
        endIcon.alt = "chevron";
        endIcon.height = 15;
        endIcon.width = 9;

        let imageCategory = document.createElement("img");
        imageCategory.className = "categories__img";
        imageCategory.src = imageCategoryLink;
        imageCategory.alt = itemsList[i].name;
        imageCategory.height = 100;
        imageCategory.width = 100;
        imageCategory.style.display = "none";


        let a = document.createElement("a");
        a.className = "categories__link";
        a.tabIndex = 1;
        a.appendChild(imageCategory);
        a.appendChild(startIcon);
        a.appendChild(linkText);
        a.appendChild(endIcon);
        a.href = link;

        let li = document.createElement('li');
        li.className = "categories__item";

        let subcategoryWrapper = document.createElement("div");
        subcategoryWrapper.className = "subcategory-wrapper";

        li.append(a);
        li.appendChild(subcategoryWrapper);

        subcategoryWrapper.appendChild(subcategoriesView);

        categoriesView.append(li);
        }

    let menuListItems = document.createElement('ul');
    menuListItems.className = "categories";
    menuListItems.append(categoriesView);

    return menuListItems;
}

function drawMenu (data) {
    const megamenu = document.getElementById("megamenu");
    megamenu.append(createMenu(data.categories));

    // calculate subcategory-wrapper width and height, del if width&height set in css
    const megamenuWidth = parseInt(window.getComputedStyle(megamenu).width);

    const pageWidth = document.documentElement.scrollWidth;

    const wrapper = document.getElementsByClassName("subcategory-wrapper");
    const categoriesItems = document.getElementsByClassName("categories__item");
    const categoriesItemsHeight = parseInt(window.getComputedStyle(categoriesItems[0]).height);
    const wrapperWidth = (pageWidth - megamenuWidth) + "px";
    const wrapperHeight = (categoriesItemsHeight * categoriesItems.length) +"px";

    for (let i = 0; i < wrapper.length; i++) {
        wrapper[i].style.width = wrapperWidth;
        wrapper[i].style.minHeight = wrapperHeight;
    }
}

function initializeMenu (url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function() {
        if (xhr.status !== 200 && xhr.readyState !== 4) {
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            console.log(`Готово, получили ${xhr.response.length} байт`);
            let data = xhr.response;
            drawMenu(data);
        }
    };

    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            console.log(`Получено ${event.loaded} из ${event.total} байт`);
        } else {
            console.log(`Получено ${event.loaded} байт`);
        }

    };

    xhr.onerror = function() {
        console.log("Запрос не удался");
    };
}

// drawMenu(dataJSON);

initializeMenu(urlJSON);













