import { jwtExpirationDateConverter } from '@/utils'

describe('jwtExpirationDateConverter', () => {
  const realDateNow = Date.now.bind(global.Date)

  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2025-06-06T00:00:00Z').getTime())
  })

  afterAll(() => {
    global.Date.now = realDateNow
  })

  it('should return 0 when te exp is at the same time', () => {
    const exp = Math.floor(Date.now() / 1000)
    const result = jwtExpirationDateConverter(exp)
    expect(result).toBe(0)
  })

  it('should correclty convert future expiration date to days. 5 days in future.', () => {
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5
    const result = jwtExpirationDateConverter(exp)
    expect(result).toBe(5)
  })

  it('should correclty convert expiration date in a fraction of day. 12 hours in the future.', () => {
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 12
    const result = jwtExpirationDateConverter(exp)
    expect(result).toBe(0.5)
  })
})
