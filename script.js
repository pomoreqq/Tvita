const returnRandomZasada = () => {
    const zasady = ['A', 'T','C','G'];
    return zasady[Math.floor(Math.random() * zasady.length)];

}

const envariomentCountries = {
        Polska: { preferowaneZasady: ['C', 'G'], threshold: 55 },
        Czechy: { preferowaneZasady: ['A', 'T'], threshold: 60 },
        Niemcy: { preferowaneZasady: ['C', 'A'], threshold: 55 }
}

const dnaMaker = () => {
    const dnaArr = [];
    for (let i = 0; i< 10; i++) {
        dnaArr.push(returnRandomZasada())
    }
    return dnaArr
}

const tVitaFactory = (specNumber, dna,envariomentCountries) => { 
    return {
        specNumber: specNumber,
        dna: dna,
        enviroment: envariomentCountries,
        mutate() {
            const randomIndex = Math.floor(Math.random() * this.dna.length);
            const obecnaZasada = this.dna[randomIndex];
            const zasady = ['A', 'T','C','G'];
            const mozliweZasady = zasady.filter(zasada => zasada !== obecnaZasada);
            const randomNowaZasadaIndex = Math.floor(Math.random() * mozliweZasady.length)
            const nowaZasada = mozliweZasady[randomNowaZasadaIndex];
            this.dna[randomIndex] = nowaZasada;
            return this.dna
        },
        compareDNA(otherTvita) {
            let count = 0;
            for(let i = 0; i < 10; i++) {
                if (this.dna[i] === otherTvita.dna[i]) {
                    count++;
                }
            }
            let procent = (count / this.dna.length) * 100;
            return `podobienstwo wynosi ${procent} %!`
        },
        willLikelySurvive() {
            let aCount = 0;
            let tCount = 0;
            for (let i = 0; i < this.dna.length;i++) {
                if(this.dna[i] === 'A') {
                    aCount++;
                }
                if(this.dna[i] === 'T') {
                    tCount++;
                }
            }
            const precentage = ((aCount+tCount) / this.dna.length) * 100;
            return precentage > 50 ? true : false
        },
        completeStrand() {
            const complement = { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' };
            const complementaryStrand = this.dna.map(base => complement[base])
            return complementaryStrand
        },
        crossOver(otherTvita) {
            const crossoverPoint = Math.floor(Math.random() * (this.dna.length - 1)) + 1;
            const firstHalf = this.dna.slice(0,crossoverPoint);
            const otherSecondHalf = otherTvita.dna.slice(crossoverPoint)
            const newDna = firstHalf.concat(otherSecondHalf)
            return newDna;
        },
        specialMutate(numOfMutations) {
            if (typeof numOfMutations !== 'number' || numOfMutations < 1 || numOfMutations > this.dna.length) {
                throw new Error('Invalid number of mutations');
              }
              for (let i =0; i< numOfMutations;i++) {
                const randomIndex = Math.floor(Math.random() * this.dna.length);
                const obecnaZasada = this.dna[randomIndex];
                const zasady = ['A', 'T','C','G'];
                const mozliweZasady = zasady.filter(zasada => zasada !== obecnaZasada);
                const randomNowaZasadaIndex = Math.floor(Math.random() * mozliweZasady.length)
                const nowaZasada = mozliweZasady[randomNowaZasadaIndex];
                this.dna[randomIndex] = nowaZasada;
                
              }
              return this.dna
        },
        isAdaptedToEnviroment() {
            const env = this.enviroment;
            const count = this.dna.filter(base => env.preferowaneZasady.includes(base)).length
            const percentage = (count/this.dna.length) * 100;
            return percentage >= env.threshold;
        }
    }
}



document.getElementById('generate').addEventListener('click', generateOrganism);

function generateOrganism() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dna = dnaMaker();
    const specimen = tVitaFactory(1, dna, 'forest');
    drawOrganism(ctx, specimen);
}

function drawOrganism(ctx, organism) {
    const dna = organism.dna;
    const colors = {
        'A': 'green',
        'T': 'red',
        'C': 'blue',
        'G': 'yellow'
    };
    for (let i = 0; i < dna.length; i++) {
        ctx.fillStyle = colors[dna[i]];
        ctx.fillRect(i * 40, 0, 40, 100);
    }
}

// let survingArr = []
// let specNum = 1
// while(survingArr.length < 20) {
    
//     const organizm = tVitaFactory(specNum,dnaMaker());
//     if (organizm.willLikelySurvive() === true) {
//         survingArr.push(organizm)
//     }
//     specNum++;
// }



