function getPage() {
    const url = window.location.href;
    const url_list = url.split('/');
    const page = url_list[url_list.length - 1];
    return page
}

// set the state to the current URL
const page = getPage();
if (page === '') {
    history.pushState({page: 'form'}, "", 'form');
} else {
    history.pushState({page: page}, "", `${page}`);
}

function colorMenu(id) {
    // turn off color for all menu buttons
    document.querySelectorAll('.menu').forEach(button => {
        button.style.background = 'gainsboro';
    });
    // turn on color for clicked menu button
    document.querySelector(`#${id}`).style.background = 'turquoise';
}

function hidePages() {
    const pages = document.querySelectorAll('.pages');
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
}

function showPage(page) {
    hidePages();
    // show requested page
    document.querySelector(`#${page}`).style.display = 'block';
}

window.onpopstate = (event) => {
    console.log(event.state.page);
    showPage(event.state.page);
    // update menu buttons color
    colorMenu(`menu_${event.state.page}`);
}

// document.addEventListener('unload', () => {
//     history.replaceState(null, '', '');
// })

document.addEventListener('DOMContentLoaded', () => {
    // hide entries
    hidePages();

    // show page in state
    showPage(history.state.page);

    // color the menu_form button
    colorMenu(`menu_${history.state.page}`);

    // add event listeners on menu buttons
    document.querySelectorAll('.menu').forEach(button => {
        button.onclick = function () {
            // set state.page according to button
            const page = this.dataset.page
            history.pushState({page: page}, "", `${page}`);

            showPage(page);
            colorMenu(this.id);
        }
    });
});