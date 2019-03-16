# RxJS
Genomgång och exempelkod för ReactiveX och RxJS
## Vad är RxJS?
RxJS är ett bibliotek för att hantera asynkrona applikationer.
RxJS ger oss ***ett*** API att hantera synkrona och asynkrona funktioner, genom att hantera data som en ström av information oavsett om det är synkront eller asynkront anrop.
## Vad försöker RxJS lösa åt oss?
Om vi tittar på några olika exempel på dagliga uppgifter som vi som utvecklare måste hantera.

1.
```
// synchronous call

let character = findCharacter(1);
console.log(`Found character: ${character.name}`);
```
2.
```
// asynchronous call

let character = findCharacterAsync(1);
character.then(c => console.log(`Found character: ${c.name}`);
```
3.
```
// Stream of data using arrays, a finitestream

const characters = [
{name: 'Luke Skywalker', homeworld: 'Tatooine'},
{name: 'Darth Vader', homeworld: 'Tatooine'},
{name: 'Leia Organa', homeworld: 'Alderaan'},
{name: 'Obi-Wan Kenobi', homeworld: 'Stewjon'},
{name: 'Chewbacca', homeworld: 'Kashyyyk'},
{name: 'Han Solo', homeworld: 'Corellia’}

for (let character of characters) {
  console.log(`Character: ${character.name}`)
}
```

4.
```
// Stream of infinite data

function buttonClick(event) {
  console.log('Clicked the button’);
  console.log(event);
}
let button = document.querySelector('#myButton');
button.addEventListener('click', buttonClick);
```