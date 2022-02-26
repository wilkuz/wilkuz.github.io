/* configure remove button from success message */

const messageRemoveBtn = document.querySelector('.success-message-Xspan');
const messageSuccessBar = document.querySelector('.success-bar');

messageRemoveBtn.addEventListener('click', e => {
    messageSuccessBar.remove();
})
console.log(messageRemoveBtn);