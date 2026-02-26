const btnToggle = document.getElementById('sidebar-toggle')
const sidebar = document.querySelector('.sidebar')

let isOpen = true

function toggle() {
    console.log(isOpen)
    sidebar.classList.toggle('sidebar-toggle')
    isOpen = !isOpen
}

function checkMobile() {
    const mql = window.matchMedia('(max-width: 750px)');
    
    const handler = (e) => {
        if (e.matches && isOpen) {
            toggle();
        }
    };
    
    mql.addEventListener('change', handler);
    
    if (mql.matches && isOpen) {
        toggle();
    }
}

checkMobile()

btnToggle.addEventListener('click', toggle)