// module.exports = function() {
//     let hello = document.createElement('div');
//     hello.innerHTML = 'welcome to China';
//     return hello;
// }
function Hello() {
    let hello = document.createElement('div');
    hello.innerHTML = 'welcome to China!';
    return hello;
}
export { Hello }