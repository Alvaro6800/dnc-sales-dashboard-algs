import { highlightTextConverter } from '@/utils'

describe('highlightTextConverter', () => {
  it('should return de correct text for "alert"', () => {
    expect(highlightTextConverter('alert')).toBe('* Meta longe de ser batida!')
  })

  it('should return de correct text for "success"', () => {
    expect(highlightTextConverter('success')).toBe(
      '* A meta do mês foi batida! Parabéns!'
    )
  })

  it('should return de correct text for "warning"', () => {
    expect(highlightTextConverter('warning')).toBe('* Falta pouco, vamos lá!')
  })

  it('should return de correct text for unknown input', () => {
    expect(highlightTextConverter('un')).toBe('* Sem dados no momento')
  })
})
