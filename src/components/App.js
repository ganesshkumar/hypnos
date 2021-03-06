import React, { Component } from 'react'
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';

import '../stylesheet/App.css'

class App extends Component {

  constructor() {
    super()

    const now = new Date()
    this.state = {
      timeSet: [],
      sleepTimes: [],
      hours: now.getHours(),
      minutes: now.getMinutes(),
      dontClose: false
    }

    this.clicked = this.clicked.bind(this)
    this.computeSleepTime = this.computeSleepTime.bind(this)
  }

  clicked() {
    const current = new Date().getTime()

    const timeSet = [
      //current,
      //current + (15 * 60 * 1000); // +15 minutes  - Sleep time
      current + (105 * 60 * 1000), // +90 minutes - 1 REM
      current + (195 * 60 * 1000), // +90 minutes - 2 REMs
      current + (285 * 60 * 1000), // +90 minutes - 3 REMs
      current + (375 * 60 * 1000), // +90 minutes - 4 REMs
      current + (465 * 60 * 1000), // +90 minutes - 5 REMs
      current + (555 * 60 * 1000) // +90 minutes - 6 REMs
    ]

    this.setState({timeSet: timeSet})
  }

  computeSleepTime() {
    const currentTime = new Date()
    var wakeTime = new Date().setHours(this.state.hours)
    wakeTime = new Date(wakeTime).setMinutes(this.state.minutes)


    if (wakeTime < currentTime.getTime()) {
      wakeTime = new Date(wakeTime + 1 * 24 * 60 * 60 * 1000)
    }

    const sleepTimes = [
      //wakeTime
      //wakeTime - (15 * 60 * 1000); // -15 minutes  - Sleep time
      wakeTime - (105 * 60 * 1000), // -90 minutes - 1 REM
      wakeTime - (195 * 60 * 1000), // -90 minutes - 2 REMs
      wakeTime - (285 * 60 * 1000), // -90 minutes - 3 REMs
      wakeTime - (375 * 60 * 1000), // -90 minutes - 4 REMs
      wakeTime - (465 * 60 * 1000), // -90 minutes - 5 REMs
      wakeTime - (555 * 60 * 1000)  // -90 minutes - 6 REMs
    ]

    const current = new Date().getTime()
    return sleepTimes.filter(time => time > current)
  }

  onHourChange(hours) {
    this.setState({
      hours: hours,
      sleepTimes: this.computeSleepTime(),
      dontClose: true
    })
  }

  onMinuteChange(minutes) {
    this.setState({
      minutes: minutes,
      sleepTimes: this.computeSleepTime(),
      dontClose: false
    })
  }

  render() {
    const fmtOptions = {hour: '2-digit', hour12: true, minute: '2-digit'}

    const times = this.state.timeSet
        .map(time => new Date(time).toLocaleString('en-GB', fmtOptions))
    const sleepTimes = this.state.sleepTimes
        .map(time => new Date(time).toLocaleString('en-GB', fmtOptions))

    var timer = new Date().setHours(this.state.hours)
    timer = new Date(timer).setMinutes(this.state.minutes)
    timer = new Date(timer).toLocaleString('en-US', fmtOptions)

    return (
      <div className='App'>

        <div className='sleep-now'>
          <div className='question'>
            <div className='line'>
              <div> When can I get up if I </div>
              <div className='sleep-now-button' onClick={this.clicked}>
                sleep now?
              </div>
          </div>

          </div>

          { this.state.timeSet.length > 0 &&
            <div className='times'>
              <div className='time rem1'>{times[0]}</div>
              <div className='time rem2'>{times[1]}</div>
              <div className='time rem3'>{times[2]}</div>
              <div className='time rem4'>{times[3]}</div>
              <div className='time rem5'>{times[4]}</div>
              <div className='time rem6'>{times[5]}</div>
            </div>
          }
        </div>

        <div className='getup-at'>
          <div className='question'>
            <div className='line'>
              <div>
                To get up at
              </div>

              <TimePicker
                focused={this.state.dontClose}
                time={timer}
                onHourChange={this.onHourChange.bind(this)}
                onMinuteChange={this.onMinuteChange.bind(this)}
              />
            </div>

            <div className='line'>
              when can I go to sleep?
            </div>
          </div>

          {sleepTimes.length > 0 &&
            <div className='times'>
              {sleepTimes[0] && <div className='time rem1'>{sleepTimes[0]}</div>}
              {sleepTimes[1] && <div className='time rem2'>{sleepTimes[1]}</div>}
              {sleepTimes[2] && <div className='time rem3'>{sleepTimes[2]}</div>}
              {sleepTimes[3] && <div className='time rem4'>{sleepTimes[3]}</div>}
              {sleepTimes[4] && <div className='time rem5'>{sleepTimes[4]}</div>}
              {sleepTimes[5] && <div className='time rem6'>{sleepTimes[5]}</div>}
            </div>
          }
        </div>

      </div>
    );
  }
}

export default App;
