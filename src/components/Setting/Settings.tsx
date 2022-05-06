import React from "react"
// @ts-ignore
import s from "./Settings.module.css"

const SettingsPage = () => {
  const [counts, setCounts] = React.useState({
    count1: 10,
    count2: 10,
  })

  const decrement = () => {
    setCounts((actual) => {
      return {
        ...actual,
        count1: actual.count1 - 1,
        count2: actual.count2 - 1
      }
    })
  }

  return (
    <>
      <h2 className={s.title}>Settings</h2>
      <div>
        <div className={s.box}>
          <div className={s.user}>
            <h4>User1</h4>
            <h1>{counts.count1}</h1>
            <button onClick={() => setCounts((actual) => {
              return {
                ...actual, count1: actual.count1 + 1
              }
            })}
              className={s.userBtn}>+</button>
          </div>
          <div className={s.user}>
            <h4>User2</h4>
            <h1>{counts.count2}</h1>
            <button onClick={() => setCounts((actual) => {
              return {
                ...actual, count2: actual.count2 + 1
              }
            })}
              className={s.userBtn}>+</button>
          </div>
        </div>
        <button onClick={decrement} className={s.decrBtn}>-</button>
        <button onClick={() => setCounts((actual) => {
          return {
            ...actual,
            count1: actual.count1 = 0,
            count2: actual.count2 = 0
          }
        })}
          className={s.decrBtn}>reset
        </button>
      </div>
    </>
  )
}

export default SettingsPage