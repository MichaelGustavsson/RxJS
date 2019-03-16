# RxJS
Genomgång och exempelkod ReactiveX och RxJS
## Vad är RxJS?
RxJS är ett bibliotek för att hantera asynkrona applikationer.
RxJS ger oss ***ett*** API att hantera synkrona och asynkrona funktioner, genom att hantera data som en ström av information oavsett om det är synkront eller asynkront anrop.
## Vad försöker RxJS lösa åt oss?
Om vi tittar på några olika exempel på dagliga uppgifter som vi som utvecklare måste hantera.

```
// synchronous call

let character = findCharacter(1);
console.log(`Found character: ${character.name}`);
```