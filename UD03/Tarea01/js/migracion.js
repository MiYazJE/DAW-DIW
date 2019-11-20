/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

async function startMigration() {

    let stepsContainer = document.querySelector('steps').children;

    for (let i = 0; i < stepsContainer.length; i += 3) {

        let steplabel = stepsContainer[i];
        let progress  = stepsContainer[i + 1];
        let finalmsg  = stepsContainer[i + 2];

        steplabel.classList.add('estabaEscondido');
        // Await to the animation ends, then do the rest
        await new Promise(resolve => steplabel.addEventListener('transitionend', resolve));

        progress.classList.add('estabaEscondido');

        // Set to the progress bar increments progressively
        await new Promise(resolve => progress.addEventListener('transitionend', resolve));

        for (let value = 0; value <= progress.max; value++) {
            progress.value = value;
            await sleep(20);
        }
        
        finalmsg.classList.add('estabaEscondido');
        await new Promise(resolve => finalmsg.addEventListener('transitionend', resolve));
        finalmsg.classList.add('animacionParpadeo');
    }

}

// Sleep the runtime
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function init() {
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click", startMigration);
}

// Init the environment when all is ready
window.onload = init;
