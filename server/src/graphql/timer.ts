export const NS_PER_SEC = 1e9
export const NS_PER_MSEC = 1e6

export class Timer {
  private started: boolean
  private startTime: [number, number]

  constructor(private name: string) {
    this.started = false
    this.start()
  }

  /**
   * Marks start time
   *
   */
  public start(): Timer {
    const msg = `⌚ > TIME started for ${this.name}`
    console.log(msg)
    this.startTime = process.hrtime()
    this.started = true
    return this
  }

  /**
   * Returns elapsed time from start() in msec
   *
   * @returns {number}
   */
  public stop(): number {
    if (!this.started) {
      throw new Error("Can't stop a timer that isn't started yet")
    }
    const diff = process.hrtime(this.startTime)
    const elapsedTime = (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_MSEC
    const msg = `⌚ < TIME elapsed for ${this.name}: ${elapsedTime.toFixed(2)} msec`
    console.log(msg)
    this.started = false
    return elapsedTime
  }
}
