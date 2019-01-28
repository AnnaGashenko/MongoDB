class TimersManager {
    constructor(name) {
        this.timers = [];
        this.logs = [];
        this.log = this._log.bind(this);
    }

    get error() {}

    set error(value) {
        if (typeof value.name !== 'string') {
            throw new Error('name не строка');
        } else if(value.name === '') {
            throw new Error('name содержит пустую строку');
        } else if(value.name === 'undefined') {
            throw new Error('name отсутствует');
        }  else if(value.delay === 'undefined') {
            throw new Error('delay отсутствует');
        } else if(typeof value.delay !== 'number') {
            throw new Error('delay не число');
        } else if(value.delay > 5000 || value.delay < 0) {
            throw new Error('delay меньше 0 или больше 500');
        } else if(typeof value.interval !== 'boolean') {
            throw new Error('interval неверный тип');
        } else if(value.interval === 'undefined') {
            throw new Error('interval отсутствует');
        } else if(value.job === 'undefined') {
            throw new Error('interval отсутствует');
        } else if(typeof value.job !== 'function') {
            throw new Error('interval отсутствует');
        } else if(this.timers.findIndex(obj => obj.name === value.name) === 1) {
            throw new Error('Таймер с таким именем уже был добавлен');
        }
    }

    add(timer, ...params) {
        this.error = timer;
        this.timers.push({...timer, in: params});
    }

    start() {
        const log = this.log;
        this.timers.forEach(function(timer) {
            timer.interval
                ? timer.timerId = setInterval(timer.job, timer.delay, ...timer.in, log(timer))
                : timer.timerId = setTimeout(timer.job, timer.delay, ...timer.in, log(timer));
        });
        console.log('Таймеры запущены');
    }

    stop() {
        this.timers.forEach(function(timer) {
            timer.interval
                ? clearInterval(timer.timerId)
                : clearTimeout(timer.timerId);
        });
        console.log('Таймеры остановлены');
    }

    pause(timer) {
        const timerRemove = this.timers.filter((item) => item.name === timer);
        const timerRem = timerRemove[0];
        timerRem.interval
            ? clearInterval(timerRem.timerId)
            : clearTimeout(timerRem.timerId);
    }

    resume(name) {
        const log = this.log;
        const timerRemove = this.timers.filter((item) => item.name === name);
        if (timerRemove.length) {
            const timerRem = timerRemove[0];
            timerRem.interval
                ? timerRem.timerId = setInterval(timerRem.job, timerRem.delay, ...timerRem.in, log(name))
                : timerRem.timerId = setTimeout(timerRem.job, timerRem.delay, ...timerRem.in, log(name));
        }

    }

    remove(name) {
        const timerRemove = this.timers.filter((item) => item.name === name);
        if (timerRemove.length) {
            const timerRem = timerRemove[0];
            timerRem.interval
                ? clearInterval(timerRem.timerId)
                : clearTimeout(timerRem.timerId);

            const indexToRemove = this.timers.findIndex(obj => obj.name === name);
            this.timers.splice(indexToRemove , 1);
        }
    }

    _log(timer) {
        this.logs.push(
            {
                name : timer.name,
                in: timer.in,
                created: new Date(),
                out: timer.job // нужно получить результат ф-и
            }
        );
    }

    print() {
        console.log(this.logs);
    }

}

const manager = new TimersManager();

const t1 = {
    name:     't1',
    delay:    1000,
    interval: true,
    job:      () => { console.log('t1') }
};

const t2 = {
    name:    't2',
    delay:    1000,
    interval: true,
    job:      (a, b) => { console.log( a + b) }
};

const t3 = {
    name:    't3',
    delay:    1000,
    interval: true,
    job:      () => { console.log('t3') }
};
const t4 = {
    name:    't1',
    delay:    1000,
    interval: true,
    job:      () => { console.log('t3') }
};