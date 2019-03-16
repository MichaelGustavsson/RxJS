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

Tittar vi på de fyra olika exemplena så ser vi att vi har fyra olika sätt att hantera dem på. Vore det inte trevligt att endast ha ett sätt att hantera data på oavsett om det är synkront, asynkront, enkla anrop, listor eller DOM händelser. Det är här som RxJS kommer in.

Genom att använda RxJS får vi ett enda **API** för att just hantera olika typer av dataströmmar. **API**:et lyssnar (***Observe***) på värden som produceras av en ***Observable***

En Observable kan returnera värden/data från
* Enkla anrop som returnera **ett** värde
* Listor
* XMLHttpRequest - AJAX
* Promises
* DOM händelser

### RxJS byggstenar
RxJS består av:
* Observables
* Observers
* Subscribers
* Operators
* Subject
* Schedulers

## Observables
Vad är en *Observable*?
Dokumentationens https://rxjs-dev.firebaseapp.com/api/index/class/Observable definition:

**A representation of any set of values over any amount of time**

Observables är den viktigaste komponenten i RxJS. En Observable ser allt data som en ström av information oavsett om det är synkron eller asynkron information som kommer via enkla funktioner, listor, DOM eller promises.

### Skapa Observables
Det finns tre huvudsakliga sätt att skapa en *Observable* på.
* Skapa en ny *Observable* genom att instantiera en ny instans av typen **Observable** via dess konstruktor
* Använda någon av funktionerna i RxJS
* Anropa en funktion som returnerar typen *Observable*

Låt oss titta på hur man skapar en *Observable* ifrån grunden.
Vi kan använda konstruktorn för att instantiera en ny instans eller så kan vi användare hjälpmetoden **create**. Oavsett vilket sätt vi använder så använder vi samma argument:
En funktion som tar som argument ett *Observer* objekt.

Ett *Observer* object har tre valfria metoder:
* next(), för att ange ett ny värde i strömmen
* error(), som kan användas för att rapportera problem eller fel som inträffat
* complete(), som kan användas för att tala om när allt data i strömmen är hanterat och klart

Låt oss se på ett par enkla exempel.
```
import { Observable } from 'rxjs';
import { characters } from './data';
// Using the constructor method.
let characters$ = new Observable(observer => {
  if (something went wrong){
    observer.error('Something bad happened’);
  }
  for (let character of characters) {
    observer.next(character);
  }
  () => observer.complete('We are done!');
});
```



