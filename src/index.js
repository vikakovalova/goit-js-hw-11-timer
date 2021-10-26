import "./common.css";

const refs = {
    timer: document.querySelector('#timer-1'),
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
}


class CountdownTimer {
    constructor({ onTick, selector, targetDate }) {
        this.intervalId = null;
        this.onTick = onTick;
        this.selector = selector;
        this.targetDate = targetDate;

        this.start()
    }

    start() {
        let timeDiff = undefined;
        if (timeDiff <= 0) {
            refs.timer.textContent = 'Happy Birthday, Kot!';
            return;
        }
        this.intervalId = setInterval(() => {
            const nowDate = Date.now();
            timeDiff = this.targetDate - nowDate;
            const time = this.getTimeComponents(timeDiff);
            
            this.onTick(time);

        }, 1000)
    }

    getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
};

pad(value) {
    return String(value).padStart(2, '0');
};
};

const timer = new CountdownTimer({
    onTick: updateClockface,
    selector: '#timer-1',
    targetDate: new Date('Jan 16, 2022').getTime(),
})

function updateClockface({ days, hours, mins, secs }) {
    // refs.days.textContent = `${days}`;
    // refs.hours.textContent = `${hours}`;
    // refs.mins.textContent = `${mins}`;
    // refs.secs.textContent = `${secs}`;

    refs.timer.innerHTML = "<div class=\"days\"> \
  <div class=\"numbers\">" + days + "</div>days</div> \
<div class=\"hours\"> \
  <div class=\"numbers\">" + hours + "</div>hours</div> \
<div class=\"minutes\"> \
  <div class=\"numbers\">" + mins + "</div>minutes</div> \
<div class=\"seconds\"> \
  <div class=\"numbers\">" + secs + "</div>seconds</div> \
</div>";

}
