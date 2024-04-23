let conbutton = document.getElementById('conbutton');
const authenticationDiv = document.getElementById('authentication');
const commentsection = document.getElementById('comment-section');
authenticationDiv.classList.remove('hidden');

conbutton.onclick = function() {
    authenticationDiv.classList.add('hidden');
    commentsection.classList.remove('hidden');
}