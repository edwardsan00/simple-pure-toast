import '@testing-library/jest-dom/extend-expect'

import toast from '../src'

describe('blah', () => {
  it('works', () => {
    const containerNotify = document.getElementById('toastContainer')
    toast.success('Click Success', { time: 5000 })

    expect(containerNotify).toBeInTheDocument()
  })
})
