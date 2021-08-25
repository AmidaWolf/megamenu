const urlJSON = new URL('http://localhost:3000/categories'); //past url
const testUrl = './data.json';


let megamenuProperties = {
    testWithLocalData: true, //true - only for testing without url responses, use data.json
    button: false, //true - add button-menu into id="megamenu_button_wrapper", dont work correctly
    buttonText: "Categories",
    parentPaddingWidth: 16, //padding-left 15px at col-3 + 1px border at card
    imgForCategory: true, //true - add image into categories item (left side)
    startIcon: false, //true - add icon into categories item (left side)
    chevronIcon: "img", //"FA" - FontAwesome icons(<i>); "img" - <img> icons; none - without chevron icons (right side)
    chevronIconUrl: "fas fa-angle-right" //past url or FontAwesome class name
}

let createMenu = (itemsList) => {
    let categoriesView = new DocumentFragment();
    let subcategoriesView = new DocumentFragment();
    let subsubcategoriesView = new DocumentFragment();

    for (let i = 0; i < itemsList.length; i++) {

        if (itemsList[i].subcategories && itemsList[i].subcategories.length > 0) {

            for (let x = 0; x < itemsList[i].subcategories.length; x++) {

                if (itemsList[i].subcategories[x].subsubcategories
                    && itemsList[i].subcategories[x].subsubcategories.length > 0) {

                    for (let y = 0; y < itemsList[i].subcategories[x].subsubcategories.length; y++) {
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

        let startIcon;

        if (megamenuProperties.startIcon) {
            let startIconLink = itemsList[i].startIcon;

            startIcon = document.createElement("img");
            startIcon.className = "categories__icon";
            startIcon.src = startIconLink;
            startIcon.alt = "icon";
            startIcon.height = 24;
            startIcon.width = 24;
        }

        let endIcon;

        if (megamenuProperties.chevronIcon === "img") {
            let endIconLink = itemsList[i].endIcon;
            if (endIconLink === undefined) {
                endIconLink = megamenuProperties.chevronIconUrl;
                if (endIconLink.length === 0) {
                    endIconLink = "https://via.placeholder.com/15x9";
                }
            }

            endIcon = document.createElement("img");
            endIcon.className = "categories__link-chevron";
            endIcon.src = endIconLink;
            endIcon.alt = "chevron";
            endIcon.height = 15;
            endIcon.width = 9;
        }

        if (megamenuProperties.chevronIcon === "FA") {
            let endIconLink = megamenuProperties.chevronIconUrl;

            endIcon = document.createElement("i");
            endIcon.className = endIconLink;
            endIcon.alt = "chevron";
            endIcon.style.fontSize = "12px"
            endIcon.style.marginLeft = "5px";  //maybe replace style into megamenu.css, inline so bad
        }

        let link = itemsList[i].href;
        let linkText = document.createTextNode(itemsList[i].name);

        let imageCategory;
        if (megamenuProperties.imgForCategory) {
            let imageCategoryLink = itemsList[i].img;
            if (!imageCategoryLink || imageCategoryLink.length === 0) {
                imageCategoryLink = "https://via.placeholder.com/100";
            }
            imageCategory = document.createElement("img");
            imageCategory.className = "categories__img";
            imageCategory.src = imageCategoryLink;
            imageCategory.alt = itemsList[i].name;
            imageCategory.height = 100;
            imageCategory.width = 100;
        }

        let a = document.createElement("a");
        a.className = "categories__link";
        a.tabIndex = 1;
        a.href = link;
        if (megamenuProperties.imgForCategory) {
            a.appendChild(imageCategory);
        }
        if (megamenuProperties.startIcon) {
            a.appendChild(startIcon);
        }
        a.appendChild(linkText);
        if (megamenuProperties.chevronIcon === "img") {
            a.appendChild(endIcon);
        }
        if (megamenuProperties.chevronIcon === "FA") {
            a.appendChild(endIcon);
        }

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

    menuListItems.childNodes[0].childNodes[1].id = "sub_wrapper_first";

    return menuListItems;
}

let drawButton = () => {
    const buttonWrapper = document.getElementById("megamenu_button_wrapper");
    const subcategoryWrapperFirst = document.getElementById("sub_wrapper_first");
    let button = document.createElement("button");
    button.id = "megamenu_button";
    button.className = "megamenu-button";
    button.append(megamenuProperties.buttonText);

    buttonWrapper.append(button);

    button.addEventListener("click", function (e) {
        if (e.target === button && getComputedStyle(subcategoryWrapperFirst).display !== "block") {
            subcategoryWrapperFirst.classList.add("active");
        } else if (e.target === button && getComputedStyle(subcategoryWrapperFirst).display === "block") {
            subcategoryWrapperFirst.classList.remove("active");
        }
    });

    subcategoryWrapperFirst.addEventListener("mouseleave", function (e) {
        if (e.target === subcategoryWrapperFirst && getComputedStyle(subcategoryWrapperFirst).display === "block") {
            subcategoryWrapperFirst.classList.remove("active");
        }
    });

}

let drawMenu = (data) => {
    const megamenu = document.getElementById("megamenu");
    megamenu.append(createMenu(data));

    if (megamenuProperties.button === true) {
        drawButton();
    }

    // calculate subcategory-wrapper width and height, del if width&height set in css
    const megamenuWidth = parseInt(window.getComputedStyle(megamenu).width);

    const pageWidth = document.documentElement.scrollWidth;

    const wrapper = document.getElementsByClassName("subcategory-wrapper");
    const categoriesItems = document.getElementsByClassName("categories__item");
    const categoriesItemsHeight = parseInt(window.getComputedStyle(categoriesItems[0]).height);
    const wrapperWidth = (pageWidth - megamenuWidth) + "px";
    const wrapperHeight = (categoriesItemsHeight * categoriesItems.length) + 5 + "px";

    for (let i = 0; i < wrapper.length; i++) {
        wrapper[i].style.width = wrapperWidth;
        wrapper[i].style.minHeight = wrapperHeight;
    }
}

const initializeMenu = (url) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
        if (xhr.status !== 200 && xhr.readyState !== 4) {
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            console.log(`Готово, получили ${xhr.response.length} байт`);
            let data = JSON.parse(xhr.response);
            drawMenu(data.categories);  //change this, if ur json have another enter point

        }
    };

    xhr.onprogress = (event) => {
        if (event.lengthComputable) {
            console.log(`Получено ${event.loaded} из ${event.total} байт`);
        } else {
            console.log(`Получено ${event.loaded} байт`);
        }

    };

    xhr.onerror = () => {
        console.log("Запрос не удался");
    };
}

let activeUrl = megamenuProperties.testWithLocalData ? testUrl : urlJSON;
initializeMenu(activeUrl);













