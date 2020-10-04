import { GoogleUser } from 'expo-google-sign-in';
import * as firebase from 'firebase';
import 'firebase/firestore';

import { ID, User } from '../types'

export class Todo {
  id: ID;
  title: string;
  done: boolean;
  priority: number;
  date: Date;

  constructor(id: ID = undefined, title: string, done: boolean = false, priority: number = 0, date: Date = new Date()) {
    this.id = id;
    this.title = title;
    this.done = done;
    this.priority = priority;
    this.date = date;
  }

  setDone(newValue: boolean, user: User): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if(!this.id || !user) reject()
      
      const db = firebase.firestore()
      var doc = db.collection('users').doc(user?.uid).collection('todos').doc(this.id);
      doc.update({done: newValue})
      .then(() => {
        this.done = newValue;
        resolve();
      })
      .catch(reject);
    })
  }

  save(user: User): Promise<void>  {
    return new Promise<void>((resolve, reject) => {
      if(!user) reject()
      
      const db = firebase.firestore()
      db.collection('users').doc(user?.uid).collection('todos').add({
        title: this.title, 
        done: this.done, 
        priority: this.priority, 
        date: this.date
      })
      .then((doc) => {
        this.id = doc.id;
        resolve();
      })
      .catch(reject);
    })
  }

  update(user: User): Promise<void>  {
    return new Promise<void>((resolve, reject) => {
      if(!user) reject()

      const db = firebase.firestore()
      db.collection('users').doc(user?.uid).collection('todos').doc(this.id)
      .update({
        title: this.title, 
        done: this.done, 
        priority: this.priority, 
        date: this.date
      })
      .then(resolve)
      .catch(reject);
    })
  }

  delete(user: User) {
    return new Promise<void>((resolve, reject) => {
      if(!user) reject()

      const db = firebase.firestore()
      db.collection('users').doc(user?.uid).collection('todos').doc(this.id)
      .delete()
      .then(resolve)
      .catch(reject);
    })
  }

  static getTodos(date: Date, user?: User): Promise<Todo[]> {
    return new Promise<Todo[]>(async (resolve, reject) => {
      if (!user) reject()

      var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);
      
      var db = firebase.firestore()
      var snapshot = await db.collection('users').doc(user?.uid).collection('todos')
        .where('date', '>=', startDate).where('date', '<', endDate)
        .orderBy('date', 'asc').orderBy('priority', 'desc').get()
      if(snapshot.empty) reject();

      var todos = [] as Todo[];
      snapshot.forEach(doc => {
        var data = doc.data()
        todos.push(new Todo(doc.id, data.title, data.done, data.priority, data.date.toDate()))
      })

      resolve(todos);
    });
  }
}