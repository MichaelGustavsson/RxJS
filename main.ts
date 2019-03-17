import {
  Observable, fromEvent, from, of, Subject,
  interval, ConnectableObservable
} from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import {
  map, take, multicast, refCount, publish, share,
  publishBehavior, publishReplay, publishLast
} from 'rxjs/operators';

import { characters } from './data';

//#region working with raw observables...
let characters$ = Observable.create(observer => {
  for (let character of characters) {
    observer.next(character);
  }

  setTimeout(() => {
    observer.complete();
  }, 2000);
});

characters$.subscribe(c => console.log(c.name));

// let button = document.getElementById('display');
// console.log('Using Of...')
// of(1, 2, 4, 'hej').subscribe(value => console.log(value));

// console.log('Using from...')
// from(characters).subscribe(c => console.log(c));

// fromEvent(button, 'click')
//   .subscribe(event => {
//     console.log(event);

//     let output = document.getElementById('output');
//     output.innerHTML += '<p/>fromEvent with array...<p/>';

//     for (let character of characters) {
//       output.innerHTML += character.name + '<br/>';
//     }
//   });

// fromEvent(button, 'click').subscribe(event => {
//   ajax('http://localhost:3000/characters').subscribe(ajaxResponse => {
//     console.log(ajaxResponse);
//     let result = ajaxResponse.response;

//     let output = document.getElementById('output');
//     output.innerHTML += '<p/>fromEvent with ajax call...<p/>';

//     for (let character of result) {
//       output.innerHTML += character.name + '<br/>';
//     }
//   });
// });

//#endregion

//#region using observers...
// let characters$ = from(characters);

// This is one way
// let observer = {
//   next: character => console.log(`Character: ${character.name}`),
//   error: err => console.log(`Error ${err}`),
//   complete: () => console.log('All is fine and we are done!')
// };
// characters$.subscribe(observer);

// This is another way of doing exactly the same as above...
// This is usually the most common way of subscribing to an observable.
// characters$.subscribe(
//   character => console.log(`Character: ${character.name}`),
//   err => console.log(`Error ${err}`),
//   () => console.log('All is fine and we are done!')
// );
//#endregion

//#region Multiple subscribers to a single Observable...

// let currentTime$ = new Observable(observer => {
//   const timeString = new Date().toLocaleTimeString();
//   observer.next(timeString);
//   observer.complete();
// });

// currentTime$.subscribe(currenTime => console.log(`First: ${currenTime}`));

// setTimeout(() => {
//   currentTime$.subscribe(currenTime => console.log(`Second: ${currenTime}`));
// }, 1000);

// setTimeout(() => {
//   currentTime$.subscribe(currenTime => console.log(`Third: ${currenTime}`));
// }, 2000);
//#endregion

//#region Unsubscribing
// let button = document.getElementById('display');
// let output = document.getElementById('output');

// let observable$ = new Observable(subscriber => {
//   let i = 0;
//   let intervalId = setInterval(() => {
//     subscriber.next(i++);
//   }, 1000);

//   return () => {
//     console.log('Teardown code');
//     clearInterval(intervalId);
//   }
// });

// let subscription = observable$.subscribe(
//   value => output.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br/>`,
//   null,
//   () => console.log('All is done and nice')
// );

// fromEvent(button, 'click').subscribe(event => subscription.unsubscribe());

//#endregion

//#region Using Operators


//#endregion

//#region Using Subjects

//#region Creating simple subject

// let subject$ = new Subject();

// subject$.subscribe(
//   value => console.log(`Observer 1: ${value}`)
// );

// subject$.subscribe(
//   value => console.log(`Observer 2: ${value}`)
// );

// subject$.next('This is a value that will be broadcasted to all observers');

//#endregion

//#region Create a proxy subject...

// let s$ = new Observable(subscriber => {
//   subscriber.next('This comes through a proxy subject');
// });

// s$.subscribe(subject$);

//#endregion

//#region Convert an cold observable to an hot observable

//Create an cold observable...
// let cold$ = interval(1000)
//   .pipe(take(5));

// cold$.subscribe(
//   value => console.log(`Observer1: ${value}`)
// );

// setTimeout(() => {
//   cold$.subscribe(
//     value => console.log(`Observer2: ${value}`)
//   );
// }, 1000);

// setTimeout(() => {
//   cold$.subscribe(
//     value => console.log(`Observer3: ${value}`)
//   );
// }, 2000);

//Now convert it to an hot observable...

// let hot$ = new Subject();
// cold$.subscribe(hot$);

// hot$.subscribe(
//   value => console.log(`Observer1: ${value}`)
// );

// setTimeout(() => {
//   hot$.subscribe(
//     value => console.log(`Observer2: ${value}`)
//   );
// }, 1000);

// setTimeout(() => {
//   hot$.subscribe(
//     value => console.log(`Observer3: ${value}`)
//   );
// }, 2000);

//#endregion

//#region Using multicast operator
// let observable$ = interval(1000)
//   .pipe(take(5),
//     multicast(new Subject())) as ConnectableObservable<number>;

// observable$.subscribe(
//   value => console.log(`Observer1: ${value}`)
// );

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer2: ${value}`)
//   );
// }, 1000);

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer3: ${value}`)
//   );
// }, 2000);

// observable$.connect();
//#endregion

//#region Using refCount...
// let observable$ = interval(1000)
//   .pipe(take(5),
//     multicast(new Subject()),
//     refCount());

// observable$.subscribe(
//   value => console.log(`Observer1: ${value}`)
// );

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer2: ${value}`)
//   );
// }, 1000);

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer3: ${value}`)
//   );
// }, 2000);

//#endregion

//#region Using publish and refCount...
// let observable$ = interval(1000)
//   .pipe(take(5),
//     publish(),
//     refCount());

// observable$.subscribe(
//   value => console.log(`Observer1: ${value}`)
// );

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer2: ${value}`)
//   );
// }, 1000);

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer3: ${value}`)
//   );
// }, 2000);

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer4: ${value}`),
//     null,
//     () => { console.log('Observer4 complete!')}
//   );
// }, 5500);
//#endregion

//#region Using share instead of publish and refCount...
// let observable$ = interval(1000)
//   .pipe(take(5),
//     share());

// observable$.subscribe(
//   value => console.log(`Observer1: ${value}`)
// );

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer2: ${value}`)
//   );
// }, 1000);

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer3: ${value}`)
//   );
// }, 2000);

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer4: ${value}`),
//     null,
//     () => { console.log('Observer4 complete!')}
//   );
// }, 5500);
//#endregion

//#region Using asyncSubject with the publishLast() operator...

// let observable$ = interval(1000)
//   .pipe(take(5),
//     publishLast(),
//     refCount());

// observable$.subscribe(
//   value => console.log(`Observer1: ${value}`)
// );

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer2: ${value}`)
//   );
// }, 1000);

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer3: ${value}`)
//   );
// }, 2000);

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer4: ${value}`),
//     null,
//     () => { console.log('Observer4 complete!')}
//   );
// }, 5500);

//#endregion

//#region Using BehaviourSubject with the publisBehavior() operator...

// let observable$ = interval(1000)
//   .pipe(take(5),
//     publishBehavior(25),
//     refCount());

// observable$.subscribe(
//   value => console.log(`Observer1: ${value}`)
// );

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer2: ${value}`)
//   );
// }, 1000);

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer3: ${value}`)
//   );
// }, 2000);

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer4: ${value}`),
//     null,
//     () => { console.log('Observer4 complete!')}
//   );
// }, 5500);

//#endregion

//#region Using ReplaySubject with the publishReplay() operator...

// let observable$ = interval(1000)
//   .pipe(take(5),
//     // publishReplay(), //Empty call means store every value in the Subject.
//     publishReplay(1), //means only two values are stored in the Subject.
//     refCount());

// observable$.subscribe(
//   value => console.log(`Observer1: ${value}`)
// );

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer2: ${value}`)
//   );
// }, 1000);

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer3: ${value}`)
//   );
// }, 2000);

// setTimeout(() => {
//   observable$.subscribe(
//     value => console.log(`Observer4: ${value}`),
//     null,
//     () => { console.log('Observer4 complete!')}
//   );
// }, 5500);

//#endregion

//#endregion
