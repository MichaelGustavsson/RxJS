# RxJS
Genomgång och exempelkod för ReactiveX och RxJS
# Installation av demo koden
Klona koden `git clone https://github.com/MichaelGustavsson/RxJS.git`
till en mapp där ni vill ha koden.

Kör sedan kommandot `npm install` i kommandotolken eller i terminalen. Detta kommer att installera allt som behövs för att leka med demokoden.

För att starta demon kör `npm start` i kommandotolken eller i terminalen.

Öppna webbläsaren och gå till http://localhost:8080/ öppna sedan webbutvecklare verktygen och gå till konsolen. Där bör nu en lista med lite Star Wars karaktärer visas.

All kod är placerad i *main.ts* filen. I filen är koden grupperad i sektioner och bortkommenterad. För att leka med koden och testa bara ta bort kommentarerna spara och kolla i webbläsaren.

Jag använder webpack och webpack server som kompilerar om koden varje gång som koden sparas.

## Vad är RxJS?
RxJS är ett bibliotek för att hantera asynkrona applikationer.
RxJS ger oss ***ett*** API att hantera synkrona och asynkrona funktioner, genom att hantera data som en ström av information oavsett om det är synkrona eller asynkrona anrop.
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

Typen *Observable* har två metoder *lift()* och *subscribe()*
* *lift()* används internt av en *observable* för att förbereda returnerandet av en ny *observable* när en *operator* används för att manipulera data strömmen.
* *subscribe()* exekverar en *observable* och påbörjar arbetet med data strömmen

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
1. I första exemplet använder vi konstruktor metoden för att skapa en ny *Observable*.
```
import { Observable } from 'rxjs';
import { characters } from './data';
// Using the constructor method.
1. let characters$ = new Observable(observer => {
  if (something went wrong){
2.    observer.error('Something bad happened’);
  }
  for (let character of characters) {
3.    observer.next(character);
  }
4.  () => observer.complete('We are done!');
});
```
2. I det andra exemplet så använder vi metoden **create** för att skapa en ny *Observable*.
```
import { Observable } from 'rxjs';
import { characters } from './data';
// Using the create method.
1. let characters$ = Observable.create(observer => {
  if (something went wrong){
2.     observer.error('Something bad happened’);
  }
  for (let character of characters) {
3.     observer.next(character);
  }
4.  () => observer.complete('We are done!');
});
```
Rad 1. Skapar en ny instans av typen **Observable** som vi placerar i variabeln *characters$*. Vi använder **$** tecknet för att indikerar att vi får tillbaka en *Observable*. **$** tecknet har blivit vedertagen standard för att indikera en variabel av typen *Observable*.

Rad 2. Här använder vi metoden *error()* om något går fel.

Rad 3. Om ingenting gått fel kan vi här fylla på vår *Observable* med data.

Rad 4. Med hjälp av metoden *complete* talar vi här om att allt data är hanterat och inget mer finns att få.

### När exekveras en *Observable*?
Det vi har skapat ovan är endast en instans av en *Observable*. Den kommer inte att köras(exekveras) och därmed kommer vi inte att kunna läsa ut värdena ifrån den. Så frågan är, hur startar vi exekveringen av en *Observable*?

Svaret är: Vi måste prenumerera(*subscribe*) på en *Observable*.
Hur gör vi det då? Enkelt använd metoden *subscribe()* som finns på typen *Observable*

```
characters$.subscribe(value => console.log(value));
```

## Skapa *Observables* från befintligt data
Det finns flera metoder att använda för att skapa *observables* ifrån befintligt data, bland annat kan vi använda följande metoder:
* defer()
* emptyFrom()
* from()
* fromEvent()
* interval()
* of()
* range()
* throw()
* timer()

Låt oss titta på några av de vanligaste.

### of()
Metoden *of()* tar en kommaseparerad lista av egentligen vad som helst.

```
// RxJS v6+
import { of } from 'rxjs';

//emits any number of provided values in sequence
const source$ = of('Michael', 15, characters[0].name);
//output: 'Michael',15,'Luke Skywalker'
source$.subscribe(value => console.log(value));

```

### from()
Metoden *from()* kan ta en *array* och omvandla den till en ström av data. Metoden kan även omvandla ett *promise* till en *observable* och även omvandla en sträng till en sekvens av enskilda tecken.

```
// RxJS v6+
import { from } from 'rxjs';
import { characters } from './data';

// characters is an array
from(characters).subscribe(value => console.log(value.name));
```
### fromEvent()
Metoden *fromEvent* tar en DOM händelse och omvandlar den till en observerbar sekvens.

```
// RxJS v6+
import { fromEvent } from 'rxjs';

// Grab the displaybutton
let button = document.getElementById('display');

fromEvent(button, 'click').subscribe(value => console.log(event));
```
### ajax()
Metoden *ajax()* ger oss möjligheten att göra ett *Ajax* anrop och få tillbaka en *observable*

```
import { Observable, fromEvent} from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

//Grab the displaybutton
let button = document.getElementById('display');

//Connect the observable to the button, then create a new observable by calling the ajax() method inside the subscribe() method.
fromEvent(button, 'click').subscribe(event => {
  ajax('http://localhost:3000/characters').subscribe(ajaxResponse => {
    console.log(ajaxResponse);
  }
});
```
## Operators
*Operators* är vad ger oss möjligheter att utföra avancerade och komplexa bearbetningar av *observables*.

En *operator* returnerar alltid en ny *observable* vilket innebär att original strömmen inte påverkas. Vi kan också länka(*chain*) ihop flera *operators* i en och samma funktion.

Det finns idag mer 100 *operators* att välja mellan, men som tur är de kategoriserade.

* [Creation](https://www.learnrxjs.io/operators/creation/)
* [Transformation](https://www.learnrxjs.io/operators/transformation/)
* [Filtering](https://www.learnrxjs.io/operators/filtering/)
* [Combination](https://www.learnrxjs.io/operators/combination/)
* [Utility](https://www.learnrxjs.io/operators/utility/)
* [Conditional](https://www.learnrxjs.io/operators/conditional/)
* [Error Handling](https://www.learnrxjs.io/operators/error_handling/)
* [Multicasting](https://www.learnrxjs.io/operators/multicasting/)

### Hur använder man *operators*
För att använda *operators* från och med version 6 av RxJS, så används funktionen *pipe()*.

Låt oss ta några mycket enkla exempel.

#### map()
Första exemplet tar en sekvens ifrån data strömmen och multiplicerar varje tal med 2.

```
import { Observable, of } from 'rxjs';
import { map } from ’rxjs/operators';

let observable$ = of(1, 2, 3, 4).pipe(map(value => value * 2));

// output 2, 4, 6, 8

```
#### filter()
Andra exemplet använder *filter()* funktionen för att endast returnera tal som är större än 4.
```
import { Observable, of } from 'rxjs';
import { filter } from ’rxjs/operators';

let observable$ = of(1, 2, 3, 4).pipe(filter(value => value > 4));

// output 6, 8
```
### Subject
För att förstå vad *Subjects* är och nyttan av dem, måste vi först förstå hur en *Observable* hanterar flera prenumeranter(*subscribes*). Vid varje anrop med *subscribe()* metoden sker en ny exekvering av en *Observable*. Detta betyder att varje *subscribe()* tvingar data strömmen att starta om på nytt. Vilket med andra ord betyder att en *Observable* inte kan skicka data till mer än en *subscriber* åt gång, så kallat ***unicast***

Så för att kunna hantera flera *subscribers* åt gången, så kallat ***multicast*** måste vi ha tillgång till en typ som kan hålla reda på vilka som vill *prenumerera* på data strömmen.

Det är här som *Subject* kommer in. *Subject* typen är både en *Observable* med en *subscribe()* metod och en *Observer* med metoderna *next(), error()* och *complete()*. Dessutom hanterar *Subject* en lista på vilka som vill prenumerera på dataströmmen.

Det finns fyra olika varianter på typen *Subject*
* Subject
  * Bastypen
* AsyncSubject
  * Returnera det sista värdet i strömmen
* BehaviorSubject
  * Kräver ett startvärde och returnerar aktuellt värde i dataströmmen till nya prenumeranter
* ReplaySubject
  * Kan lagra flera värden och returnera dem till alla prenumeranter
