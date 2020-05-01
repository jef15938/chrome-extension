const customTaskMain = () => {
    console.log('in CustomTask');
    document.addEventListener('copy', console.log);
    document.addEventListener('paste', console.log);
    document.addEventListener('copy', (event) => {
        e.stopPropagation();
    }, true);
    document.addEventListener('copy', (event) => {
        e.stopPropagation();
    }, true);
}

export { customTaskMain }