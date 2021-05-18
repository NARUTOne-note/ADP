/**
 * Subject（主题）和 Observer（观察者）
 */

interface Observer {
  notify: Function;
}

class ConcreteObserver implements Observer{
  constructor(private name: string) {}
  notify() {
    console.log(`${this.name} has been notified.`);
  }
}

class Subject { 
  private observers: Observer[] = [];

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public notifyObservers(): void {
    console.log("notify all the observers");
    this.observers.forEach(observer => observer.notify());
  }
}

// ① 创建主题对象
const subject: Subject = new Subject();

// ② 添加观察者
const observerA = new ConcreteObserver("ObserverA");
const observerC = new ConcreteObserver("ObserverC");
subject.addObserver(observerA); 
subject.addObserver(observerC);

// ③ 通知所有观察者
subject.notifyObservers();
